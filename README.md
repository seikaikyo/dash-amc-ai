# 鈺祥企業 AMC 智能監控系統 v2.0

> **從濾網到良率守門員：打造 AMC 晶圓良率防線的 AI 智能代理人**  
> *From Filter to Yield Guardian: Building AI Agent for AMC Wafer Yield Defense Line*

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.1-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.1-purple.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-cyan.svg)

---

## 公司簡介 | Company Introduction

**鈺祥企業股份有限公司 | Yesiang Enterprise Co., Ltd.**

- 專業半導體製程設備
- 精密過濾技術  
- AI 智能監控解決方案

*Professional Semiconductor Process Equipment • Precision Filtration Technology • AI Smart Monitoring Solutions*

---

## 系統特色 | System Features

### **全新 Vite + React 架構**
- **現代化前端技術**: Vite + React 19 + TypeScript
- **響應式設計**: Tailwind CSS 完美適配各種螢幕
- **純前端應用**: 所有運算在瀏覽器中執行，無需後端
- **快速部署**: 一鍵部署到 Vercel

### **智能測試數據生成器**
- **30分鐘機台間隔標準**: 符合工業標準的數據採集頻率
- **多種生成模式**: 按天數、自定義日期範圍
- **四種品質模式**: 正常運行、包含異常、嚴重異常、混合模式
- **智能老化模擬**: 180天濾網老化過程模擬
- **多維異常注入**: TOC突增、壓差過高、溫度漂移、流速異常

### **先進可視化儀表板**
- **即時監控儀表盤**: 3D 儀表盤顯示 TOC、壓差、系統效率
- **互動式圖表**: 基於 Plotly.js 的高品質圖表
- **動態顏色分區**: 綠色(正常)、黃色(警告)、紅色(危險)

---

## 快速開始 | Quick Start

### 1. 環境準備

```bash
# 確保已安裝 Node.js 18+ 和 npm
node --version  # 應該 >= 18.0.0
npm --version   # 應該 >= 8.0.0
```

### 2. 專案設定

```bash
# 安裝相依性
npm install

# 啟動開發伺服器
npm run dev
```

### 3. 訪問系統

開啟瀏覽器訪問：`http://localhost:5173`

### 4. 建置生產版本

```bash
# 建置專案
npm run build

# 預覽建置結果
npm run preview
```

---

## 部署到 Vercel | Deploy to Vercel

### 方法一：GitHub 連接 (推薦)

1. 將程式碼推送到 GitHub 倉庫
2. 在 Vercel 儀表板連接 GitHub 倉庫
3. Vercel 自動偵測 Vite 專案並部署
4. 每次推送自動重新部署

### 方法二：Vercel CLI

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 部署專案
vercel

# 部署到生產環境
vercel --prod
```

---

## 使用指南 | User Guide

### 智能數據生成器使用

1. **設定生成參數**
   - 選擇生成天數 (1-365天)
   - 設定開始日期
   - 選擇數據間隔 (15/30/60分鐘)

2. **選擇品質模式**
   - **正常運行**: 穩定運行，極少異常
   - **包含異常**: 模擬現實輕微異常狀況
   - **嚴重異常**: 高比例異常，用於壓力測試
   - **混合模式**: 動態混合各種運行狀態

3. **生成並分析**
   - 點擊「生成測試數據」
   - 系統自動載入並顯示即時監控儀表板
   - 查看數據表格和統計資訊

### 參數調整

1. **預設配置**: 選擇標準/嚴格/寬鬆/測試模式
2. **自定義參數**: 調整 TOC 閾值、壓差範圍、環境參數
3. **實時驗證**: 系統自動檢查參數合理性

### 數據匯出

1. **快速匯出**: 原始數據或完整分析報告
2. **自定義匯出**: 選擇特定欄位和格式
3. **格式支援**: Excel (.xlsx) 和 CSV (.csv)

---

## 技術架構 | Technical Architecture

### 前端技術棧
```
Vite 7.1 + React 19 + TypeScript 5.8
├── UI Framework: Tailwind CSS 4.1
├── Charts: Plotly.js
├── Excel Export: XLSX
├── Date Handling: date-fns
├── Utilities: Lodash, clsx
└── Icons: Lucide React
```

### 系統規格

| 參數           | 數值           | 說明                 |
| -------------- | -------------- | -------------------- |
| TOC 入口值     | 10 ppbv        | 空氣分子污染入口濃度 |
| TOC 出口值     | 2 ppbv         | 處理後出口濃度       |
| 濾網壓差(初始) | 60 Pa          | 濾網初始壓力差       |
| 濾網壓差(終止) | 80 Pa          | 濾網更換壓力差       |
| 流速           | 0.5 m/s (±0.2) | 氣體流通速度         |
| 溫度           | 23°C (±1)      | 環境溫度控制         |
| 濕度           | 43% (±3%)      | 環境濕度控制         |
| 生命週期       | 180 天         | 濾網使用期限         |

---

## 專案結構 | Project Structure

```
profet-amc-web/
├── public/                    # 靜態資源
├── src/
│   ├── components/           # React 組件
│   │   ├── DataGenerator/   # 數據生成器組件
│   │   ├── ExportModule/    # 匯出功能組件  
│   │   ├── Layout/          # 版面配置組件
│   │   ├── ParameterControl/# 參數控制組件
│   │   ├── UI/              # 基礎 UI 組件
│   │   └── Visualization/   # 可視化組件
│   ├── types/               # TypeScript 型別定義
│   ├── utils/               # 工具函數
│   ├── App.tsx              # 主應用組件
│   ├── main.tsx            # 應用入口
│   └── index.css           # 全域樣式
├── index.html              # HTML 模板
├── package.json            # 專案設定
├── tailwind.config.js      # Tailwind 設定
├── tsconfig.json          # TypeScript 設定  
├── vite.config.ts         # Vite 設定
└── vercel.json           # Vercel 部署設定
```

---

## 疑難排解 | Troubleshooting

### 常見問題

**Q: 圖表不顯示？**
A: 檢查瀏覽器控制台是否有 JavaScript 錯誤，確保 Plotly.js 正確載入。

**Q: 匯出功能不工作？**
A: 確保瀏覽器允許檔案下載，並檢查是否有彈出視窗被封鎖。

**Q: 資料生成很慢？**
A: 大數據集 (>10000 筆) 可能需要較長時間，建議使用較小的數據集進行測試。

---

## 版本歷史 | Version History

### v2.0.0 (Current) - Vite + React 重構版
- 全新 Vite + React + TypeScript 架構
- 純前端應用，無需後端
- Vercel 一鍵部署
- 現代化 UI/UX 設計
- 模組化組件架構

### v1.0.0 - Streamlit 版本
- 基於 Python Streamlit 的原型系統
- 5標籤頁可視化分析
- 智能數據生成器
- Excel 多格式匯出

---

## 授權 | License

MIT License

---

## 技術支援 | Technical Support

**鈺祥企業股份有限公司**
- **系統版本**: AMC智能監控系統 v2.0
- **技術架構**: Vite + React + TypeScript  
- **部署平台**: Vercel

---

*© 2024 鈺祥企業股份有限公司 版權所有 | All Rights Reserved by Yesiang Enterprise Co., Ltd.*