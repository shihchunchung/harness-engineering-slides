# Harness Engineering 演進實錄

## 介紹：harness engineering 是什麼

Harness engineering 是建立和持續演進 agent 系統外部控制層的工程實務，指模型之外那些讓 agent 在任務裡可靠工作、可被治理的結構。

它和 prompt engineering、orchestration 容易混淆：prompt engineering 處理指令的措辭，orchestration 處理步驟的流程，harness 處理讓指令和流程可靠運行的控制面：檢查機制、工具邊界、持久化產物怎麼接起來。

Agent 典型的失敗模式不是完全做錯，而是停在看起來像完成的地方。需求有模糊處就自己補完，長任務中段累積的 context 開始污染後段判斷，產出一份不完整的結果卻認為已經完成。這類問題修幾句 prompt 難以穩定解決，多數時候要從外部結構著手——工具邊界、驗證機制、跨 session 的狀態交接。harness engineering 最近被反覆提起的原因大致在此。

### 各家的共識

各家對 harness 的切法不同，但底下在講同一件事：工程投入放在模型外的結構上，例如工具邊界、驗證機制與持久化 artifact。這個方向有具體的經驗支撐：

- LangChain 固定 gpt-5.2-codex 只改 harness，在 Terminal Bench 2.0（程式代理 benchmark）從 52.8% 跳到 66.5%（+13.7 分，Top 30 → Top 5）
- Matsuoka 的 blind review：四個用同款 Claude Sonnet 4.6 的 agent，品質從 3.93 到 4.75（五分制），完成時間 45 分 vs 313 分（7x 差距）
- HumanLayer 實驗：同款 Claude Opus 4.6 在某 coding agent benchmark 上，原生 harness 排名 33，換一套 harness 跳到第 5 名

這不是說模型不重要，而是在固定模型下，harness 設計仍能顯著影響結果。

### 各家的討論與重點

Harness engineering 沒有統一框架，不同作者採不同軸線切分。但橫跨各家的討論裡，有幾組主題反覆出現，以下是六個。

#### Context 管理

Context 是有限且會劣化的資源，如何管理它，比塞更多內容更能決定 agent 的產出：

- **Context firewall**：sub-agent 的本質是讓 parent 只收到最終結果，而非角色扮演
- **Progressive disclosure / instruction budget**：AGENTS.md、Skills、MCP 都會消耗 agent 有限的 context 額度，規則不是越多越好，超過閾值 agent 反而進入「dumb zone」

更大的 context window 沒有讓這組問題消失，只是把爆發點往後推。跨 session 的狀態交接、長任務中段累積的污染、多來源規則之間的干擾，這些都不會因為 window 變大就解決。reset、compaction、sub-agent、artifact handoff 不是取代長 context，而是補上長 context 處理不了的那部分。

#### Guides × Sensors 的控制迴路

**Guides / sensors × computational / inferential 四象限**是目前最被引用的分類（Böckeler）：guides 是前饋（AGENTS.md、Skills、specs），sensors 是回饋（tests、linters、review agents）。單靠 guide 無法確認規則是否被遵守，單靠 sensor 又容易在錯誤擴散後才觸發，兩者共同構成控制迴路。**Linter-as-teacher**（OpenAI）是 computational sensor 的高效實例，error message 同時是違規標記和修復指引；inferential sensor 則由 review / challenger agent 擔任，沒有確定性規則可跑時，靠 LLM 對照 oracle（spec、convention 文件）做判斷。

sensor 能穩定機械化的多半是可維護性、結構、風格類問題；行為正確性——需求對不對、整體功能有沒有符合預期——仍較難機械化。spec 對照、browser-driven evaluation、inferential reviewer 這些較重的做法因此仍有必要，綠燈測試之外還需要獨立的行為檢查。

#### 規劃 / 執行 / 驗證分離

同一個 agent 不該同時決定「做什麼」「怎麼做」「做對沒」。這裡有兩層問題常被混在一起。一層是誰有資格宣告「做完了」——是 agent 自述，還是外部訊號。另一層是規劃、實作、審查的推理過程會不會沿同一條鏈把盲點往下傳。

兩者常一起出現，也可以各自成立。單 agent 加上嚴格的 test + lint 能攔到前者，但解決不了後者；多 agent 若共用同一個 oracle 和判準，形式上分工卻沒真正隔離推理鏈。

具體做法：

- **兩階段 workflow**（Red Hat）：先分析 repo 產出規劃 artifact，再執行，人類在 artifact 層級 review 而非事後看 diff
- **Planner / Generator / Evaluator 三 agent 架構**（Anthropic）：從結構上隔離驗證，Evaluator 用 Playwright 黑箱操作、不讀 Generator 的程式碼

分離的 ROI 會隨模型能力衰減。Anthropic 在 Opus 4.6 之後發現 Evaluator 在簡單任務變多餘——Generator 本身已經能接住那些原本要靠獨立驗證才能抓到的錯誤。分離的設計是為了回應 agent 的具體弱點（自我驗證不嚴、盲點沿推理鏈傳遞），弱點弱化後，分離本身也要被重新評估。

#### Artifact 外部化與跨 session 交接

跨 context window 的持續工作必須靠模型外的持久檔案。若不把瞬時推理外部化，下個 session 就無法從 clean state 接手。具體做法：

- Anthropic 的 **feature list JSON + progress file + git 三件套**是比較 canonical 的組合——JSON 限制 agent 只能改 `passes` 欄位，防止亂改結構
- LangChain 的 **Ralph Loop + filesystem-backed continuation** 走得更激進，每次迭代清空 context、靠檔案系統重建連續性
- Red Hat 的 **Repository Impact Map** 從分析側切入，從 codebase 實際產出 single source of truth，讓規劃和實作階段共用同一份事實基礎

#### Steering Loop / harness 作為演進系統

Harness 是持續演進的控制系統，會隨觀察到的失敗逐步調整。這個迴路常被稱為 **steering loop**（Böckeler）；更激進的做法是把它自動化：doc-gardening agent、constraint violation scanner、garbage collection agent 定期掃偏差開 refactor PR（OpenAI）。

加法與減法是這組工程選擇的兩個方向。Böckeler 傾向加法（犯錯就加規則）；Schmid 則呼應 Rich Sutton 的 Bitter Lesson——通用模型能力最終會勝過任務特定的工程累積，任務特定的部件能拆則拆。Anthropic 的 **sprint contracts**（規劃／執行交接處設定一組硬門檻檢查，通過才能進實作）在 Opus 4.6 後被主動移除，是減法的實際案例。兩個方向都屬於 steering loop 的範圍；只做加法，harness 的部件會逐漸累積成維護成本。

#### 機械化品味 / 硬化 convention

品味和 convention 不能靠 prompt 和人腦記憶，必須機械化成確定性規則（linter、structural tests、hooks、CI gates）。把「好程式碼長什麼樣」編碼成 linter + structural tests，人類品味只需捕捉一次，之後每次提交都會持續執行（OpenAI）。約束解題空間反而讓 agent 更快收斂，這和「更多自由 = 更好產出」的直覺相反。

### harness 在實作中演進

Harness 很難一次設計對。每個部件都內含一個「agent 在這件事上做不好」的假設，這個假設只有在實際操作中才顯現是真是假。太早下判斷容易做錯方向，太晚又讓錯誤擴散。實際的演進流程大致是：觀察什麼在使用中反覆出問題，把問題工程化成結構，問題退場；下一層新問題浮現，再做一輪。

---

## Part 1：基礎管線

### Step 1：baseline

```
task → plan mode → plan
```

大多數人用 coding agent 的起點：開 plan mode，輸入 task，agent 產出 plan，人工審查，通過後進入實作。搭配一份 CLAUDE.md 提供 repo 層級規則。單一 agent 從頭做到尾，需求理解、規劃、實作、驗證共用同一條 context；沒有中間 artifact，狀態只存在於對話裡；品質控制完全靠人工，CLAUDE.md 是唯一的 guide 卻沒機制驗證是否被遵守。

這樣的狀態下，幾類固定問題會反覆出現：

- Task 表達不精確時，agent 用自己的假設補齊，方向歪掉但看起來合理
- Plan 的結構與粒度每次不同，難以比較與審查
- 規劃、實作、驗證共享推理鏈，前段盲點後段繼承且無法被抓到
- Context 後期膨脹失焦，甚至開始 hallucinate

後續 step 是為了回應這些問題。

### Step 2：加入 plan agent + plan review agent

```
task → plan agent → plan review → plan
```

Plan 的結構粒度每次不同，難以被穩定審查；而審查又只剩人工一條路。把「產出 plan」獨立成 plan agent，固定 prompt 讓輸出格式穩定；再加 plan review agent 做第一輪機械審查。人工審查仍在，但不再是唯一關卡。

**Agents**

| Agent | 職責 |
|---|---|
| plan agent | 固定 prompt 產出 plan 格式 |
| plan review | 第一輪機械審查 plan |

### Step 3：引入 SDD + TDD

```
task → spec agent → spec → plan agent → plan review → plan
```

讓 agent 寫對的前提有兩個：agent 真的理解要做什麼，以及 agent 的實作真的通過驗證。SDD 和 TDD 分別處理這兩件事。它們不是新概念（在傳統軟體工程裡已經存在幾十年），但套在 coding agent 上時，性質變了。

SDD 處理前者。Task 是自然語言，天生不精確。人類工程師會帶著領域知識把模糊處補完；agent 沒有這層過濾，會把歧義用自己的假設悄悄補齊，產出看起來結構完整、卻悄悄偏離行為契約的程式碼。把需求理解外部化成 spec 並由人工審查，agent 的理解和實作設計走兩條獨立推理鏈。上游錯誤在源頭就能被抓，不會被放大到下游。Spec 同時能跨 session 存活，對抗長期任務下的 intent drift。

TDD 處理後者。Agent 聲稱完成卻未必真通過測試：不是惰性，而是沒有機械式的「完成」判準。更糟的是，若 agent 可以同時改實作和改測試，它會傾向把測試寫成能通過（事後合理化），測試反而失去驗證力。把測試放在實作之前，測試結果就成為判斷實作完成的 computational sensor，不再靠 agent 自己說「做完了」。

**Agents**

| Agent | 職責 |
|---|---|
| spec agent | 把 task 寫成 spec |

---

## Part 2：spec → plan 側的深化

### Step 1：plan agent 拆分 + reviewer 拆分

```
spec → plan-explorer → plan agent → [plan-reviewer + spec-compliance-reviewer] → plan
```

plan agent 同時做兩件事：探索 codebase、設計實作。探索會帶回大量原始搜尋結果，把 context 塞到失焦，反而傷害設計品質。

把探索獨立成 plan-explorer，限制唯讀工具（Read、Grep、Glob），不做設計判斷，只回傳帶 `filepath:line` 引用的精簡摘要。原始探索內容留在它自己的 context，不污染 parent。這是 sub-agent 的本質用途：作為 context firewall，parent 只看到必要的結論，而不是過程中所有的嘗試與雜訊。

Plan review agent 有類似問題：要同時檢查慣例合規、spec 覆蓋、結構合理性。什麼都看的結果是什麼都看不深。拆成兩個並行的 reviewer：plan-reviewer 對照 convention 與 repo 既有 pattern 檢查慣例，spec-compliance-reviewer 對照 spec 檢查覆蓋率。兩個 reviewer 視角獨立、互不重疊，並行執行不增加等待時間。

**Agents**

| Agent | 職責 | 備註 |
|---|---|---|
| plan-explorer | 探索 codebase 並回傳摘要 | 限唯讀工具，不做設計判斷 |
| plan agent | 純設計實作 | 透過 plan-explorer 摘要看 codebase |
| plan-reviewer | 檢查慣例合規 | 不讀 spec |
| spec-compliance-reviewer | 檢查 spec 覆蓋率 | 範圍 plan + spec |

### Step 2：新增 plan-challenger

```
spec → plan-explorer → plan agent → plan-challenger → [plan-reviewer + spec-compliance-reviewer] → plan
```

合規 reviewer 只能抓「plan 違反了某條規則」的錯誤，抓不到「plan 遵守了所有規則，設計卻是錯的」。例如選了過度工程的抽象層、或採用看似合理卻在此情境下不合適的 pattern。這些不觸發 rule violation，卻讓下游的 implement 帶著結構缺陷。plan-challenger 就是補這個盲點。

關鍵在方法：先把 plan 放一邊，獨立研究問題本身，形成自己對這個功能該怎麼做的理解，再回來比對 plan 的設計選擇。有了獨立的參照點，才有真正「挑戰」的基礎，不是在 plan 內部邏輯裡打轉。對抗式 reviewer 很容易退化成噪音產生器，所以每個挑戰在輸出前要通過 self-check（是否已被規範管轄、能否說清楚這個選擇錯了會出什麼事、plan 能否據此修改），任一道過不了就丟棄。這是 inferential sensor 的品質閥。

plan-challenger 只處理「規範沒管到但選擇錯了會出事」的灰色地帶，屬於明文規範的問題交給其他 reviewer。輸出用疑問句形式保留 plan 作者的判斷空間，附 `filepath:line` 引用作為 evidence，分 BLOCK 和 NOTE 兩級：BLOCK 要求附上具體的 failure scenario（會觸發 bug、security、test 問題），不是「這樣比較好」的風格偏好。單次執行最多 10 條 challenge，且沒有最低下限：乾淨的 review report 是合法結果，不需要為了「盡責」湊問題出來。執行順序上先於其他 reviewer，因為它可能改變整個設計方向。合規審查的對象會跟著變。

**Agents**

| Agent | 職責 |
|---|---|
| plan-challenger | 對抗式審查規範外的設計缺陷 |

### Step 3：抽出 plan-conventions

新增共用 guide：

```
plan-conventions.md  ←  plan agent / plan-challenger / plan-reviewer / spec-compliance-reviewer
```

「plan 應該長什麼樣」的規則散落在四個 prompt 裡：plan agent 知道 plan 該有哪些 section，plan-reviewer 知道怎麼檢查結構，plan-challenger 知道可以挑戰什麼面向，spec-compliance-reviewer 知道 spec 到 plan 的 mapping。這些規則彼此相關，卻各自寫在自己的 prompt 裡，改一條要翻四個檔案，不同 agent 對同一條規則的表達還會微妙漂移。

把共用規則抽出來成 plan-conventions.md：plan 的 section 結構、粒度要求、格式慣例、常見反模式。四個 agent 共同引用這份文件，產出端以它為產出標準，審查端以它為檢查基準。這是 guide 的外部化，把散落在 prompt 裡的隱性規則變成可版本化、可追溯、可單點更新的顯性文件。

CLAUDE.md 也順勢收斂：原本混在裡面的 plan 相關規則搬到 plan-conventions.md，CLAUDE.md 回到「repo 通用、所有 agent 啟動就該讀」的定位。這是 guide 的層級化，plan-conventions 只在 plan 相關 agent 載入，不讓無關規則消耗 agent 有限的 instruction budget。

### Step 4：Review Pipeline 重新設計

```
spec → plan-explorer → plan agent → draft plan
     → [plan-spec-reviewer + plan-assumption-reviewer + plan-codebase-reviewer]
     → plan-challenger → plan
```

這一步改兩件事：reviewer 改按驗證基準分組，plan-challenger 改在 reviewer 與修正之後執行。

Reviewer 按「驗證基準」重新組織，每個 reviewer 嚴格綁定一個真理來源。原本按「角色」分的做法邊界模糊（有的 reviewer 同時做慣例和結構檢查，有的同時做覆蓋率、假設審計和架構適切性），導致重複偵測和漏洞並存：同一個問題被兩個 reviewer 各抱怨一次，另一類問題卻沒人覆蓋。

plan-spec-reviewer 對照文件規範（spec、CLAUDE.md、plan-conventions.md），看 plan 是否違反明文規則；plan-assumption-reviewer 對照 spec 的空白與歧義，看 plan 填補的假設合不合理；plan-codebase-reviewer 對照 codebase 實際狀態，看 plan 的認知是否跟 repo 現況一致。每個 reviewer 有明確的 oracle，邊界不再模糊。這裡做的是隔離 reviewer 的判斷依據，每個 reviewer 只對一個 oracle 負責。和 Step 1 的 sub-agent firewall 同屬視野隔離：前者限制探索時的輸入，後者限制判斷時的依據。

另一個關鍵變化是偵測與修復分離：三個 reviewer 只回報 finding，不改 plan。每個 finding 被分類為 A 類（規範有唯一正確答案，可自動修正）或 B 類（合理分歧，需使用者判斷）。使用者在集中的 decision gate 處理所有 B 類 finding 後，orchestrator 在一次 pass 裡統一執行修正。修正集中化後，plan 的狀態變化變得可追蹤。

plan-challenger 放在最後執行：它審查的是修正後的 plan，而不是 draft，避免浪費精力挑戰一個即將被 A 類 fix 修掉的設計選擇。它處理的是通過所有文件規範、假設審計、codebase 對齊之後仍然可能存在的設計錯誤。

最後是 evidence 標準化：所有 finding 必須附帶 `filepath:line` 引用，沒有引用的不被接受；已通過的檢查不再列出；檢查範圍限縮到需要修改的檔案。

**Agents**

| Agent | 職責 | 綁定 oracle |
|---|---|---|
| plan-spec-reviewer | 檢查 plan 是否違反明文規則 | spec、CLAUDE.md、plan-conventions.md |
| plan-assumption-reviewer | 檢查 plan 填補的假設是否合理 | spec 的空白與歧義 |
| plan-codebase-reviewer | 檢查 plan 對 codebase 的認知是否一致 | codebase 實際狀態 |
| plan-challenger | 規範外的設計挑戰 | 獨立研究形成的問題理解 |

### Step 5：testcase 側完整建立

```
spec → testcases agent → testcases-reviewer → testcases
```

好的 testcases 大致圍繞兩件事：獨立於被驗證的對象、覆蓋 spec 的完整行為。這兩個性質形塑了 testcase 側的設計。

獨立性指的是 testcases 的真理來源應該是 spec，而不是 plan。若 testcases 從 plan 推導，一旦 plan 誤解某個需求，testcases 容易跟著這個誤解走。測試通過了、需求卻沒滿足。testcases agent 因此直接從 spec 推導，不讀 plan；plan 和 testcases 成為 spec 的兩個獨立衍生物，任一方有盲點時另一方有機會捕捉。驗證獨立性從 prompt-level 的期待升級到 pipeline-level 的結構強制。

「不讀 plan」在 prompt 裡寫成絕對禁令，而不是建議。這個區別很重要：若只是「建議不讀」，agent 在探索 codebase 時會繞回去讀 plan「參考一下」，獨立性就破了。允許讀 exploration 摘要但禁止讀 plan。codebase facts 是中性的，design decisions 會污染獨立判斷。

覆蓋完整受益於專門的 reviewer。testcases 寫出來後，若沒有外部審查，很難判斷「是不是漏了某個 spec 需求」或「這個測試是不是過度依賴 implementation detail」。加入 testcases-reviewer 對照 spec 檢查覆蓋率，對照 testcases-conventions 檢查測試品質。testcases-conventions.md 抽出作為共用 guide，testcases agent 和 testcases-reviewer 共同引用，和 plan 側的 plan-conventions 同樣邏輯。

但專門的 reviewer 有一個天生的風險：傾向 over-report，多提 finding 感覺比較「盡責」，實際上產生大量噪音。testcases-reviewer 在 prompt 裡明文列出「不該 flag 的項目」：不要 test framework 行為、不要要求 per-field 組合測試、一個 route group 一個 401 就夠、不要 flag API 打不到的 DB scenario。這是 inferential sensor 的反向品質閥，和 plan-challenger 的 self-check 三道門互相呼應：前者防止「不該 flag 的被 flag」，後者防止「該 dismiss 的被保留」。兩種機制一起撐住 inferential reviewer 的輸出可信度。

「獨立的 reviewer」做的是生產與審查分離，也避免了一個常見問題：讓 agent review 自己的產出通常不太有效，agent 在這種模式下容易合理化剛做過的選擇，難以捕捉生產時就存在的盲點。testcases-reviewer 和 testcases agent 讀的是同一份 spec 和 testcases-conventions，但關注面向不同：生產者想的是「怎麼寫出涵蓋需求的 testcases」，reviewer 想的是「這組 testcases 漏了什麼、有什麼問題」。差異來自 prompt 框架而不是資料差異，相當於強迫同樣的材料被兩種心智模式各看一遍。

**Agents**

| Agent | 職責 | 備註 |
|---|---|---|
| testcases agent | 從 spec 推導 testcases | 禁讀 plan |
| testcases-reviewer | 檢查 spec 覆蓋率與測試品質 | 明列「不該 flag 的項目」 |

### Step 6：tdd-composer 與 TDD 執行結構

```
plan + testcases → tdd-composer → RED → GREEN → Simplify
```

plan 和 testcases 要靠執行結構才能發揮 sensor 作用。implement 若仍由 agent 自由寫、寫完後聲稱完成，testcases 的存在意義就被繞過；換成由測試結果機械地判定「做到哪了」，每個 pass 或 fail 都是可驗證的事實，而不是推論性的描述。

tdd-composer 把 plan 和 testcases 組合成 RED → GREEN（分成數個 round）→ Simplify 的結構，把執行順序塑形成 pipeline，而不是讓 agent 自由決定先做什麼。GREEN 階段之所以分成數個 round 而不是一次實作所有 tests，有幾個考量：

- **Bounded context**：每個 round 聚焦在 plan 裡的一小片實作，按依賴順序切分，agent 不需要把整個 plan 都抓在 context 裡；長任務後期容易失焦，分段執行讓每段都在 agent 可靠的認知範圍內。
- **每個 round 是一個 verified checkpoint**：round 結束時相關 tests 全部 pass，git commit 把這個狀態釘住。進度不再是 agent 聲稱的，而是 test result + commit 共同證明的。
- **Rollback point**：若某個 round 出問題，前一個 round 的 commit 是乾淨的回滾點，不會把整個實作全部歸零。
- **Regression 自然被 catch**：前面 round 的 tests 進入 always-green 狀態，後面 round 寫新實作時若破壞了前面的行為，會在當前 round 就被測試抓到，不需要手動 re-verify 前面已經做好的部分。

RED 和 Simplify 各自也有存在的理由。RED 階段先把所有 tests 寫出來，確認新增或目標測試在預期原因下失敗——失敗來自缺失的實作，而非測試本身有誤。這一步確保 tests 真的在測該測的東西，否則「GREEN 階段 tests pass」這個訊號本身就不可信（可能是 test 因其他原因已經過了，而非實作正確）。Simplify 階段則在所有 tests 通過後、保持綠的前提下做品質清理；沒有它，agent 容易停在「tests pass」的 local minimum，留下重複、過長、抽象錯位的 code。

在這個結構下，implement 的進度由測試結果判定。每個 checkpoint 是一個 computational sensor，狀態由 test result 驗證，而不是 agent 自述。

**Agents**

| Agent | 職責 |
|---|---|
| tdd-composer | 把 plan + testcases 編成 RED → GREEN（多輪）→ Simplify 的執行結構 |

---

## Part 3：task → spec 側的深化

### Step 1：spec-explorer 獨立 + spec-reviewer

```
task → spec-explorer → spec agent → spec-reviewer → testcases agent → testcases-reviewer → testcases
```

第一件事：把 spec agent 的探索職責拆出來，獨立成 spec-explorer。它和 plan-explorer 扮演同樣的 context firewall 角色：唯讀工具、不做生成判斷、只回傳帶 `filepath:line` 引用的摘要。Spec agent 從「邊探索邊寫 spec」變成「拿到乾淨的 codebase 摘要後再寫 spec」，context 不被搜尋結果污染，spec 品質更穩。

第二件事：把 spec 的審查從純人工擴展為 agent + 人工。加入 spec-reviewer，對照 task 描述和 CLAUDE.md 檢查 spec 的完整性、結構、邏輯一致性。人工審查仍在但不再是唯一關卡。reviewer 先過濾明顯問題，人工聚焦在判斷性議題。spec → plan pipeline 的品質控制至此對稱，每個階段都有 agent reviewer + 人工 gate 的組合。

**Agents**

| Agent | 職責 |
|---|---|
| spec-explorer | 探索 codebase 並回傳摘要 |
| spec agent | 寫 spec |
| spec-reviewer | 檢查 spec 完整性、結構、邏輯一致性 |

### Step 2：spec agent 拆分（brief-from-task + spec-from-brief）

```
task → brief-from-task → brief → spec-explorer → spec-from-brief → spec-reviewer → testcases agent → testcases-reviewer → testcases
```

spec agent 在這一步拆成兩個前後相接的 agent。Spec 生成前需要先和使用者對齊對 task 的理解：task 常有多處模糊或遺漏，若 agent 直接用自己的假設補齊後跳到完整 spec，使用者看到的是成品而不是「agent 理解到什麼」的中間狀態，審查時才發現方向偏掉就已經走了兩步回頭路。

brief-from-task 是 interactive 的，主動追問 task 裡的模糊處（這個功能怎麼被使用、有哪些邊界條件、哪些 case 不需要支援），輸出一份確認過的 brief 送人工審查。spec-from-brief 是 generative 的，拿到 brief 和 spec-explorer 的 codebase 摘要後一次產出完整 spec，不再需要猜任何事。

這個拆分把「理解」和「設計」兩個階段明確分離：前者和人對話，後者從確認的輸入生成輸出。brief 也成為一份持久化的意圖記錄，跨 session 可以回看，減輕長期任務中的 intent drift。

**Agents**

| Agent | 職責 |
|---|---|
| brief-from-task | 主動追問 task 模糊處，輸出 brief |
| spec-from-brief | 從 brief + codebase 摘要產出 spec |

### Step 3：domain-extractor

```
task → brief-from-task → brief → spec-explorer → domain-extractor → spec-from-brief → spec-reviewer → testcases agent → testcases-reviewer → testcases
```

brief 往往以 UI 或功能描述為主：「使用者可以在列表頁看到所有訂單，點擊後進入詳情頁」。spec-from-brief 若直接從這段描述推 API，很容易把 UI 結構當成領域模型：列表頁對應 `GET /orders`，詳情頁對應 `GET /orders/:id`，就結束了。但真實的 domain 可能更複雜（訂單有狀態機、和使用者/商品/付款有關聯、某些 query 是跨 entity 的），這些在 UI 為中心的思路下會被扁平化成一堆瑣碎 endpoint。

插入 domain-extractor 作為前置步驟：拿到 brief 和 codebase 摘要後，先識別 domain concepts：核心 entity 是什麼、它們的狀態怎麼轉移、entity 之間有哪些關聯、哪些操作是跨 entity 的。把這些明確寫下來後，spec-from-brief 才從 domain 模型推導 API 和 resource schema。

這一步和前面幾個 step 性質不同：前面幾個主要在切分既有流程與隔離推理來源，這一步在 spec-from-brief 之前新增一個前置分析步驟。它決定 agent 應該先想什麼、再想什麼：「先想 domain，再想 API」。這個順序寫進 pipeline 結構，不需要 agent 自己記得遵守。

**Agents**

| Agent | 職責 |
|---|---|
| domain-extractor | 從 brief + codebase 摘要識別 domain concepts（entity、狀態、關聯） |

---

## 橫切議題：決策日誌與 observability

前面講的多數 agent（尤其是做判斷的 reviewer 和 challenger）除了主要輸出（plan、testcases、review finding、challenge 等）之外，還會同步寫一份結構化的 decision log 到獨立檔案。log 記錄 agent 在這次執行裡讀了哪些檔案、探索了哪些 codebase 位置、考慮過哪些可能的 finding、哪些被判定為 governed 而交給其他 agent、哪些被 dismiss（例如 self-check 沒過、evidence 不足）、哪些最終被提升成正式輸出。這份 log 不回傳給 parent agent，只寫到檔案系統作為事後檢視用。

log 有三個用途。**Audit**：驗證 agent 是否遵守自己的 suppression list 和 self-check 規則。如果 plan-challenger 挑戰了一個其實屬於 plan-spec-reviewer 管轄的 finding，log 會讓這個越界可見。**Debug**：agent 產出奇怪時（挑錯方向、漏掉明顯問題、重複抱怨同一件事），log 還原它的推理路徑，不用靠猜。**Steering loop 的燃料**：跨多次執行的 log patterns 揭示系統性問題，同一類 finding 反覆被某個 reviewer 漏掉、某個 prompt 規則頻繁被誤解、某個 agent 的 dismiss 比例異常高。這些是改進 harness 本身的訊號，單看單次輸出看不出來。

這三個用途共用一個手段：把原本只存在於 agent context 裡的東西寫成檔案。TDD 處理 code state（實作是否完成），decision log 處理 reasoning state（agent 怎麼做決策）。兩者讓 agent 的行為可以在事後被檢視。
