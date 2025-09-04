# Dash AMC AI 智能監控系統

> **從濾網到良率守門員：打造 AMC 晶圓良率防線的 AI 智能代理人**  
> *From Filter to Yield Guardian: Building AI Agent for AMC Wafer Yield Defense Line*

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.1-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.1-purple.svg)

---

## 專案簡介

**Dash AMC AI** 是為鈺祥企業股份有限公司開發的智能 AMC (Ambient Molecular Contamination) 監控系統，專注於半導體製程中的空氣分子污染監控與分析。

### 核心功能

- **智能測試數據生成器**: 支援多種數據品質模式
- **即時監控儀表板**: 動態顯示 TOC、壓差、溫濕度等關鍵參數  
- **數據分析與匯出**: 支援 CSV 格式匯出
- **系統參數配置**: 靈活的閾值與警報設定
- **響應式設計**: 適配各種螢幕尺寸

### 技術棧

- **前端**: React 19 + TypeScript + Vite
- **圖表**: Plotly.js
- **樣式**: 自定義 CSS (無外部 UI 框架)
- **部署**: Vercel

---

## 快速開始

### 環境需求
- Node.js 18+
- npm 或 yarn

### 安裝與運行

```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 建置生產版本
npm run build

# 預覽生產版本
npm run preview
```

### 代碼規範

```bash
# 檢查代碼格式
npm run lint
```

---

## 使用方法

1. **設定系統參數**: 使用左側控制面板配置 TOC 閾值、壓差限制等
2. **生成測試數據**: 選擇數據品質模式和生成天數
3. **監控分析**: 查看即時監控儀表板和數據表格
4. **匯出數據**: 下載 CSV 格式的完整測試報告

---

## 項目結構

```
src/
├── components/          # React 組件
├── utils/              # 工具函數
├── types.ts            # TypeScript 類型定義
└── App.tsx            # 主應用組件
```

---

## 授權與版權

© 2024 鈺祥企業股份有限公司 版權所有  
All Rights Reserved by Yesiang Enterprise Co., Ltd.

**設計開發**: [選我正解](https://github.com/seikaikyo/dash-amc-ai)

---

*專業 AI 驅動的半導體製程監控解決方案*