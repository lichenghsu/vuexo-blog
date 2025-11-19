---
title: High Availability(HA) 雙機儲存架構
cover: /images/high-availability/Gemini_Generated_Image_jvwgvejvwgvejvwg.png
sticky: false
tags: [HA, 高可用性, 架構設計, DB2, HADR]
categories: [系統架構, 技術筆記]
layout: post
published: true
date: 2025-11-18 14:35:51
---

最近工作上接觸到一個比較大型的案子，主要是要負責一個已經上線中的系統進行維護，想說藉由筆記讓自己更快進入狀況，整個系統簡單來說是個以 API 微服務建構的，具體的詳情我也還在熟悉中，本章節主要還是針對我所不了解的弱點進行補強。

<!-- more -->

## High Availability 技術解析

在我目前入職到現在也三個月了，所接觸到的第一個案子就有採用這種設計，不過因為我也是中途接手前人的工作，所以對這些概念也沒有太過深究，趁著目前的空檔來學習一下。

這兩個專案雖然感覺性質相差甚遠，但它們確有一個共通處：**都採用了 High Availability (HA) 雙機架構**。

## 什麼是 High Availability？

High Availability (高可用性) 是指系統能夠持續運作，即使部分組件發生故障也不會影響整體服務。一般以「可用性百分比」來衡量：

| 可用性等級 | 年停機時間 | 常見場景 |
|-----------|-----------|---------|
| 99% (兩個九) | 3.65 天 | 一般網站 |
| 99.9% (三個九) | 8.76 小時 | 商業應用 |
| 99.99% (四個九) | 52.56 分鐘 | 金融系統 |
| 99.999% (五個九) | 5.26 分鐘 | 電信級系統 |

## 為什麼需要 HA？

單機架構的致命弱點：

![image-20251119102331061](/images/high-availability/image-20251119102331061.png)

**常見的單點故障原因：**

- 硬體故障（硬碟損壞、主機板故障）
- 軟體錯誤（程式 Bug、記憶體洩漏）
- 維護作業（系統更新、資料庫升級）
- 災難事件（斷電、火災、網路中斷）

## HA 雙機架構原理

### 基本架構
![image-20251119102926041](/images/high-availability/image-20251119102926041.png)

### 核心概念

#### 1. **Primary (主機)**
- 處理所有讀寫請求
- 即時處理業務交易
- 持續將資料變更同步到 Standby

#### 2. **Standby (備機)**
- 保持待命狀態
- 接收 Primary 的資料同步
- 隨時準備接管服務

#### 3. **Virtual IP (虛擬IP)**
- 應用程式連接的邏輯 IP
- 實際指向 Primary
- 故障時自動切換到 Standby

## DB2 HADR (High Availability Disaster Recovery)

### HADR 架構
![image-20251119102950748](/images/high-availability/image-20251119102950748.png)

### HADR 同步模式

DB2 提供三種同步模式，各有優缺點：

#### 1. **SYNC (同步模式)** ⭐⭐⭐
```
Primary 寫入流程：
1. 寫入本地 Log
2. 傳送 Log 到 Standby
3. 等待 Standby 寫入完成
4. 回應應用程式「成功」

特性：
✅ 資料零遺失 (RPO = 0)
❌ 效能較低（因需等待 Standby）
✅ 適合：金融、保險等不容許資料遺失的系統
```

#### 2. **NEARSYNC (近同步模式)** ⭐⭐
```
Primary 寫入流程：
1. 寫入本地 Log
2. 傳送 Log 到 Standby
3. 等待 Standby 接收（但不等寫入完成）
4. 回應應用程式「成功」

特性：
⚠️ 微量資料可能遺失 (RPO < 1秒)
✅ 效能較好
✅ 適合：一般企業應用
```

#### 3. **ASYNC (非同步模式)** ⭐
```
Primary 寫入流程：
1. 寫入本地 Log
2. 立即回應應用程式「成功」
3. 背景非同步傳送到 Standby

特性：
❌ 可能遺失較多資料 (RPO > 數秒)
✅ 效能最佳
⚠️ 適合：允許資料遺失的場景（較少使用）
```

### 故障切換 (Failover)

#### 自動切換流程
![image-20251119103434382](/images/high-availability/image-20251119103434382.png)

#### 切換時間 (RTO)
```
偵測故障：    5-30 秒
升級 Standby： 10-60 秒
切換 VIP：     1-5 秒
────────────────────────
總計 RTO：    ~1-2 分鐘
```

## 實務考量

### 1. 監控項目
```bash
# 檢查 HADR 狀態
db2pd -hadr -db LIARDB

重要指標：
- HADR_STATE: PEER (正常) / DISCONNECTED (異常)
- HADR_ROLE: PRIMARY / STANDBY
- LOG_GAP: 日誌差距（應接近 0）
- HADR_CONNECT_STATUS: CONNECTED
```

### 2. 網路需求
```
Primary ←──→ Standby
   專用 HADR 網路
   
建議：
- 專線連接（不經過交換器）
- 低延遲（< 10ms）
- 高頻寬（> 1Gbps）
- 避免網路壅塞
```

### 3. 硬體配置
```
Primary 和 Standby 應該：
✅ 相同的 CPU 規格
✅ 相同的記憶體大小
✅ 相同的磁碟 I/O 能力
✅ 相同的 DB2 版本

原因：
- 確保切換後效能一致
- 避免 Standby 無法負荷
```

## 常見架構模式

### 模式 1: Active-Passive (主被動)
```
Primary (Active)  ← 處理所有請求
   ↓ 同步
Standby (Passive) ← 完全待命

優點：
- 架構簡單
- 資源清楚
- 容易管理

缺點：
- Standby 資源閒置
- 成本較高
```

### 模式 2: Active-Standby with Read (讀寫分離)
```
Primary (Active)  ← 處理寫入 + 部分讀取
   ↓ 同步
Standby (Active)  ← 處理唯讀查詢

優點：
- Standby 資源被利用
- 分散 Primary 負載
- 提升查詢效能

注意：
- 可能有輕微延遲
- 不適合即時性要求高的查詢
```

### 模式 3: Multiple Standby (多備援)
```
Primary
   ├─→ Standby 1 (本地)
   ├─→ Standby 2 (異地機房)
   └─→ Standby 3 (災難備援)

優點：
- 更高可用性
- 災難恢復能力

缺點：
- 成本倍增
- 複雜度提升
```

## 容量規劃陷阱

### 案例：Tablespace 爆滿
```
監控數據：
Tablespace: TS_POLICY_DATA
Size: 1024 GB
Used: 975 GB (95.2%) ⚠️⚠️⚠️

風險：
- 超過 95% 可能觸發 DB2 降速
- 無法寫入新資料
- 系統可能當機
```

### 預防措施
```sql
-- 定期監控
SELECT 
  TBSP_NAME,
  TBSP_TOTAL_SIZE_KB / 1024 / 1024 AS SIZE_GB,
  TBSP_USED_SIZE_KB / 1024 / 1024 AS USED_GB,
  (TBSP_USED_SIZE_KB * 100 / TBSP_TOTAL_SIZE_KB) AS USAGE_PCT
FROM 
  SYSIBMADM.TBSP_UTILIZATION
WHERE
  TBSP_TYPE = 'DMS'
ORDER BY 
  USAGE_PCT DESC;

-- 設定告警閾值
> 85%: 黃色警告（規劃擴容）
> 90%: 橙色警告（準備擴容）
> 95%: 紅色警告（立即擴容）
```

### 擴容策略
```sql
-- 方法 1: 增加容器
ALTER TABLESPACE TS_POLICY_DATA 
ADD (FILE '/data/ts_policy_data_03' 200G);

-- 方法 2: 擴展現有容器
ALTER TABLESPACE TS_POLICY_DATA 
RESIZE (FILE '/data/ts_policy_data_01' 300G);

-- 方法 3: 資料歸檔
-- 將歷史資料移到歸檔表
INSERT INTO POLICY_ARCHIVE 
SELECT * FROM POLICY 
WHERE POLICY_DATE < '2020-01-01';

DELETE FROM POLICY 
WHERE POLICY_DATE < '2020-01-01';

-- 重整表空間
REORG TABLE POLICY;
```

## HA 以外的其他可用性策略

### 1. 應用層 HA
![image-20251119111150280](/images/high-availability/image-20251119111150280.png)

### 2. 資料複製
```
Master (寫入)
  ├─→ Slave 1 (讀取)
  ├─→ Slave 2 (讀取)
  └─→ Slave 3 (讀取)

減輕 Master 負載
```

### 3. 快取層
```
App → Redis (快取) → Database
                ↓
          90% 請求在快取處理
          只有 10% 打到 DB
```

## 學習資源

- [IBM DB2 HADR 官方文件](https://www.ibm.com/docs/en/db2/11.5?topic=recovery-hadr)
- [High Availability 架構設計模式](https://martinfowler.com/articles/patterns-of-distributed-systems/)
- [Database Reliability Engineering](https://www.oreilly.com/library/view/database-reliability-engineering/9781491925935/)

## 總結

High Availability 不只是技術問題，更是一種設計思維：

1. **假設一切都會壞掉** - 沒有永遠不壞的硬體
2. **監控比治療重要** - 提前發現問題
3. **定期演練** - 確保故障時不會慌亂
4. **持續優化** - 架構需要隨業務成長調整

透過這次的學習，我對 HA 架構有了更深入的理解，也知道在實務上需要注意哪些細節。系統維運不只是「讓它跑起來」，更重要的是「讓它穩定地一直跑下去」。

---

**延伸閱讀**：
- 下一篇將探討「負載均衡與流量管理」
- 分散式系統的 CAP 理論
- 微服務架構下的容錯設計
