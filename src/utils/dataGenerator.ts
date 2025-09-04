import type { AMCTestData, DataGenerationConfig } from '../types';

/**
 * AMC 測試數據生成器
 * 將原 Python 邏輯遷移到 TypeScript
 */
export class AMCDataGenerator {
  private seed = 42;
  
  /**
   * 簡單的偽隨機數生成器 (基於 LCG 算法)
   */
  private random(): number {
    this.seed = (this.seed * 1664525 + 1013904223) % Math.pow(2, 32);
    return this.seed / Math.pow(2, 32);
  }

  /**
   * 生成正態分佈隨機數 (Box-Muller 變換)
   */
  private normalRandom(mean: number = 0, std: number = 1): number {
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return z0 * std + mean;
  }

  /**
   * 生成 AMC 機台測試數據
   */
  generateMachineData(config: DataGenerationConfig): AMCTestData[] {
    const {
      days_count,
      start_date,
      interval_minutes,
      quality_mode,
      anomaly_ratio
    } = config;

    const data: AMCTestData[] = [];
    const records_per_day = Math.floor((24 * 60) / interval_minutes);
    const total_records = days_count * records_per_day;

    for (let i = 0; i < total_records; i++) {
      const current_time = new Date(start_date.getTime() + i * interval_minutes * 60 * 1000);
      
      // 模擬濾網老化過程
      const aging_days = Math.floor((current_time.getTime() - start_date.getTime()) / (1000 * 60 * 60 * 24));
      const aging_factor = Math.min(aging_days / 180.0, 1.0);
      
      // 時間因子 (模擬日夜變化)
      const hour_factor = Math.sin(2 * Math.PI * current_time.getHours() / 24) * 0.1;
      
      // 基礎參數設定
      const base_inlet_toc = 10.0;
      const base_outlet_toc = 2.0;
      const base_pressure_initial = 60.0;
      const base_temp = 23.0;
      const base_humidity = 43.0;
      const base_flow_rate = 0.5;
      
      // 根據品質模式調整噪音參數
      let toc_noise: number, pressure_noise: number, temp_noise: number, humidity_noise: number;
      
      switch (quality_mode) {
        case 'normal':
          toc_noise = 0.5;
          pressure_noise = 5;
          temp_noise = 0.5;
          humidity_noise = 2;
          break;
        case 'with_anomaly':
          toc_noise = 1.0;
          pressure_noise = 8;
          temp_noise = 1.0;
          humidity_noise = 3;
          break;
        case 'severe_anomaly':
          toc_noise = 2.0;
          pressure_noise = 15;
          temp_noise = 2.0;
          humidity_noise = 5;
          break;
        default: // mixed
          if (i % 100 < 20) {
            toc_noise = 1.5;
            pressure_noise = 12;
            temp_noise = 1.5;
            humidity_noise = 4;
          } else {
            toc_noise = 0.3;
            pressure_noise = 3;
            temp_noise = 0.3;
            humidity_noise = 1.5;
          }
      }
      
      // 生成具體數值
      let inlet_toc = base_inlet_toc + this.normalRandom(0, toc_noise) + hour_factor;
      
      // TOC 出口值隨老化增加
      const outlet_toc_base = base_outlet_toc + aging_factor * 1.5;
      let outlet_toc = outlet_toc_base + this.normalRandom(0, toc_noise * 0.3) + hour_factor * 0.5;
      
      // 壓差隨老化增加
      let pressure_diff = base_pressure_initial + aging_factor * 20 + this.normalRandom(0, pressure_noise);
      
      // 環境參數
      let temperature = base_temp + this.normalRandom(0, temp_noise) + hour_factor * 2;
      let humidity = base_humidity + this.normalRandom(0, humidity_noise) + hour_factor * 3;
      
      // 流速
      let flow_rate = base_flow_rate + this.normalRandom(0, 0.05) + hour_factor * 0.02;
      
      // 異常注入
      const is_anomaly = Math.random() < (anomaly_ratio / 100);
      if (is_anomaly && quality_mode !== 'normal') {
        const anomaly_types = ['toc_spike', 'pressure_high', 'temp_drift', 'flow_low'];
        const anomaly_type = anomaly_types[Math.floor(Math.random() * anomaly_types.length)];
        
        switch (anomaly_type) {
          case 'toc_spike':
            outlet_toc += Math.random() * 2 + 1;
            break;
          case 'pressure_high':
            pressure_diff += Math.random() * 15 + 10;
            break;
          case 'temp_drift':
            temperature += (Math.random() - 0.5) * 7;
            break;
          case 'flow_low':
            flow_rate *= Math.random() * 0.2 + 0.6;
            break;
        }
      }
      
      // 確保數值在合理範圍內
      inlet_toc = Math.max(0.1, inlet_toc);
      outlet_toc = Math.max(0.01, outlet_toc);
      pressure_diff = Math.max(10, pressure_diff);
      temperature = Math.max(15, Math.min(35, temperature));
      humidity = Math.max(20, Math.min(80, humidity));
      flow_rate = Math.max(0.1, Math.min(1.0, flow_rate));
      
      // 判定 pass/fail
      const pass_criteria = (
        outlet_toc <= 3.0 &&
        pressure_diff <= 85 &&
        temperature >= 20 && temperature <= 26 &&
        humidity >= 35 && humidity <= 55 &&
        flow_rate >= 0.3 && flow_rate <= 0.7
      );
      
      const result: 'pass' | 'fail' = pass_criteria ? 'pass' : 'fail';
      
      // 創建記錄
      const record: AMCTestData = {
        No: i + 1,
        Date: current_time.toLocaleDateString('zh-TW').replace(/\//g, '/'),
        Time: current_time.toTimeString().substring(0, 8),
        DateTime: current_time.toISOString().substring(0, 19).replace('T', ' '),
        SN: `AMC${1000 + i}`,
        Shift: current_time.getHours() >= 6 && current_time.getHours() < 18 ? 'D' : 
               current_time.getHours() >= 18 ? 'N' : 'A',
        Feature1: Math.floor(Math.random() * 3) + 1,
        Feature2: Math.random() > 0.5 ? 'on' : 'off',
        Inlet_TOC: Number(inlet_toc.toFixed(4)),
        Outlet_TOC: Number(outlet_toc.toFixed(6)),
        Pressure_Diff: Number(pressure_diff.toFixed(1)),
        Flow_Rate: Number(flow_rate.toFixed(6)),
        Temperature: Number(temperature.toFixed(1)),
        Humidity: Number(humidity.toFixed(1)),
        Result: result,
        Aging_Factor: Number(aging_factor.toFixed(3)),
        Is_Anomaly: is_anomaly
      };
      
      data.push(record);
    }
    
    return data;
  }
}