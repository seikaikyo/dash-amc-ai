# 🔐 Dash AMC AI 智能監控系統

> **從濾網到良率守門員：打造 AMC 晶圓良率防線的 AI 智能代理人**
> *From Filter to Yield Guardian: Building AI Agent for AMC Wafer Yield Defense Line*

![Version](https://img.shields.io/badge/version-2.1.0-blue.svg)
![React](https://img.shields.io/badge/React-19.1-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.1-purple.svg)
![Security](https://img.shields.io/badge/Security-TOTP%202FA-green.svg)

🌐 **Live Demo**: [ys-amc-ai.vercel.app](https://ys-amc-ai.vercel.app)

---

## 專案簡介

**Dash AMC AI** 是為鈺祥企業股份有限公司開發的智能 AMC (Ambient Molecular Contamination) 監控系統，專注於半導體製程中的空氣分子污染監控與分析。本系統具備企業級雙重驗證安全機制，確保製程數據的安全性。

### 🎯 核心功能

#### 🔒 企業級安全認證
- **TOTP 雙重驗證**: RFC 6238 標準實現，支援 Google Authenticator、Microsoft Authenticator、Authy 等
- **多使用者管理**: 完整的帳號建立、管理、停用功能
- **會話管理**: 8小時自動過期，帳號鎖定保護機制
- **安全管理中心**: 統一的安全設定與帳號管理介面

#### 📊 智能監控分析
- **智能測試數據生成器**: 支援多種數據品質模式
- **即時監控儀表板**: 動態顯示 TOC、壓差、溫濕度等關鍵參數
- **多維度分析**: 3D 可視化、統計分析、相關性分析、雷達圖
- **數據分析與匯出**: 支援 CSV 格式匯出
- **系統參數配置**: 靈活的閾值與警報設定
- **響應式設計**: 適配各種螢幕尺寸

### 🛠️ 技術棧

- **前端**: React 19 + TypeScript + Vite
- **認證**: 自研 TOTP 引擎 + 帳號管理系統
- **圖表**: Plotly.js
- **樣式**: 自定義 CSS (無外部 UI 框架)
- **部署**: Vercel
- **安全**: Web Crypto API + SHA-256 加密

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

## 🚀 使用方法

### 系統登入
1. 訪問 [ys-amc-ai.vercel.app](https://ys-amc-ai.vercel.app)
2. 使用預設管理員帳號登入：
   - 帳號：`admin`
   - 密碼：`AMC2024!YS`

### 設定雙重驗證
1. 登入後點擊右上角「**安全管理**」
2. 在「🔒 雙重驗證設定」區塊點擊「🔒 啟用雙重驗證」
3. 使用 Authenticator App 掃描 QR Code：
   - 📱 Google Authenticator
   - 🔐 Microsoft Authenticator
   - 🛡️ Authy
4. 輸入 6 位數驗證碼完成設定
5. 下次登入將需要密碼 + TOTP 雙重驗證

### 帳號管理
在「📋 帳號管理」區塊可以：
- **➕ 新增帳號**: 建立自訂名稱的帳號
- **🎲 隨機帳號**: 自動生成格式化帳號（如 YS123456A）
- **查看帳號列表**: 顯示所有帳號狀態、TOTP 綁定情況
- **停用帳號**: 管理非必要的帳號

### 系統監控
1. **設定系統參數**: 使用左側控制面板配置 TOC 閾值、壓差限制等
2. **生成測試數據**: 選擇數據品質模式和生成天數
3. **多維度分析**: 查看即時監控、趨勢分析、3D 可視化等
4. **匯出數據**: 下載 CSV 格式的完整測試報告

---

## 🏗️ 項目結構

```
src/
├── components/
│   ├── Auth/                    # 認證相關組件
│   │   ├── EnhancedTOTPAuth.tsx # 增強版 TOTP 認證
│   │   └── EnhancedTOTPAuth.css # 認證介面樣式
│   ├── Charts.tsx              # 圖表組件
│   └── Sidebar.tsx             # 側邊欄組件
├── utils/
│   ├── auth/                   # 認證工具
│   │   ├── totpEngine.ts       # TOTP 核心引擎
│   │   ├── totpManager.ts      # TOTP 管理器
│   │   ├── accountManager.ts   # 帳號管理器
│   │   └── qrGenerator.ts      # QR Code 生成器
│   └── dataGenerator.ts       # 數據生成器
├── types.ts                    # TypeScript 類型定義
└── App.tsx                    # 主應用組件
```

## 🔐 安全特性

### TOTP 雙重驗證
- **標準實現**: 遵循 RFC 6238 標準
- **30秒更新週期**: 標準時間窗口
- **容錯機制**: ±1 時間窗口驗證
- **多平台支援**: 支援所有主流 Authenticator

### 帳號安全
- **密碼加密**: SHA-256 雜湊算法
- **會話管理**: 8小時自動過期
- **失敗保護**: 5次失敗後鎖定5分鐘
- **權限控制**: 管理員和使用者權限分離

### 資料安全
- **本地存儲**: 使用瀏覽器 localStorage/sessionStorage
- **無伺服器傳輸**: 敏感資料不經過網路傳輸
- **即時清除**: 登出時清除所有敏感資料

---

## 🔧 開發與部署

### 本地開發
```bash
# 複製專案
git clone https://github.com/seikaikyo/dash-amc-ai.git
cd dash-amc-ai

# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 建置生產版本
npm run build
```

### 部署到 Vercel
```bash
# 部署到生產環境
npm run build
npx vercel --prod

# 設定自訂網域（如需要）
npx vercel alias set [deployment-url] [custom-domain]
```

---

## 📝 更新日誌

### v2.1.0 (2024-09-20)
- ✨ 新增企業級 TOTP 雙重驗證系統
- ✨ 新增多使用者帳號管理功能
- ✨ 新增安全管理中心
- 🔒 增強系統安全性（會話管理、帳號鎖定）
- 🎨 優化登入介面設計
- 📱 完整響應式支援

### v2.0.0 (2024-09-05)
- 🎉 初始版本發布
- 📊 智能測試數據生成器
- 📈 多維度監控分析功能
- 🎯 即時監控儀表板
- 📋 數據匯出功能

---

## 🙏 授權與版權

© 2024 鈺祥企業股份有限公司 版權所有
All Rights Reserved by Yesiang Enterprise Co., Ltd.

**設計開發**: [選我正解](https://github.com/seikaikyo/dash-amc-ai)

---

## 🌟 特色亮點

- **🔐 企業級安全** - TOTP 雙重驗證，確保製程數據安全
- **👥 多使用者支援** - 完整的帳號管理與權限控制
- **📊 智能分析** - AI 驅動的數據生成與多維度分析
- **🎨 現代化 UI** - 響應式設計，優秀的使用者體驗
- **⚡ 高效能部署** - Vercel 雲端部署，全球 CDN 加速

*專業 AI 驅動的半導體製程監控解決方案 | 企業級安全 | 智能分析*