// AMC 測試數據型別定義
export interface AMCTestData {
  No: number;
  Date: string;
  Time: string;
  DateTime: string;
  SN: string;
  Shift: 'D' | 'N' | 'A';
  Feature1: number;
  Feature2: 'on' | 'off';
  Inlet_TOC: number;
  Outlet_TOC: number;
  Pressure_Diff: number;
  Flow_Rate: number;
  Temperature: number;
  Humidity: number;
  Result: 'pass' | 'fail';
  Aging_Factor: number;
  Is_Anomaly: boolean;
}

// 數據生成配置
export interface DataGenerationConfig {
  days_count: number;
  start_date: Date;
  interval_minutes: number;
  quality_mode: 'normal' | 'with_anomaly' | 'severe_anomaly' | 'mixed';
  anomaly_ratio: number;
}

// 系統參數配置
export interface SystemParameters {
  inlet_toc_threshold: number;
  outlet_toc_threshold: number;
  pressure_initial: number;
  pressure_max: number;
  temp_min: number;
  temp_max: number;
  humidity_min: number;
  humidity_max: number;
  flow_rate_target: number;
  flow_rate_tolerance: number;
  lifetime_days: number;
  replacement_threshold: number;
}

// 預設配置模式
export type PresetMode = 'custom' | 'standard' | 'strict' | 'loose' | 'test';

// 分析模式
export type AnalysisMode = 'standard' | 'trend' | 'anomaly' | 'comprehensive';

// 警報設定
export interface AlertSettings {
  enabled: boolean;
  sensitivity: 'low' | 'medium' | 'high';
  types: string[];
}