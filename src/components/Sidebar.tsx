import React from 'react';
import type { DataGenerationConfig, SystemParameters, PresetMode, AnalysisMode, AlertSettings } from '../types';

interface SidebarProps {
  config: DataGenerationConfig;
  setConfig: (config: DataGenerationConfig) => void;
  parameters: SystemParameters;
  setParameters: (parameters: SystemParameters) => void;
  presetMode: PresetMode;
  onPresetChange: (mode: PresetMode) => void;
  analysisMode: AnalysisMode;
  setAnalysisMode: (mode: AnalysisMode) => void;
  alertSettings: AlertSettings;
  setAlertSettings: (settings: AlertSettings) => void;
  onGenerate: () => void;
  onClearData: () => void;
  isGenerating: boolean;
  hasData: boolean;
  totalRecords: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  config,
  setConfig,
  parameters,
  setParameters,
  presetMode,
  onPresetChange,
  analysisMode,
  setAnalysisMode,
  alertSettings,
  setAlertSettings,
  onGenerate,
  onClearData,
  isGenerating,
  hasData,
  totalRecords
}) => {
  const recordsPerDay = Math.floor((24 * 60) / config.interval_minutes);

  return (
    <aside style={{
      width: '320px',
      backgroundColor: '#f8fafc',
      borderRight: '1px solid #e5e7eb',
      padding: '1.5rem',
      overflowY: 'auto',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 10
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '700', 
          color: '#1f2937', 
          marginBottom: '0.5rem' 
        }}>
          控制面板
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          AMC 智能監控系統設定
        </p>
      </div>

      {/* 預設配置選擇 */}
      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ 
          fontSize: '1rem', 
          fontWeight: '600', 
          color: '#374151', 
          marginBottom: '1rem' 
        }}>
          快速配置
        </h3>
        <select
          value={presetMode}
          onChange={(e) => onPresetChange(e.target.value as PresetMode)}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            backgroundColor: 'white'
          }}
        >
          <option value="custom">自定義</option>
          <option value="standard">標準模式</option>
          <option value="strict">嚴格模式</option>
          <option value="loose">寬鬆模式</option>
          <option value="test">測試模式</option>
        </select>
      </section>

      {/* 系統參數設定 */}
      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ 
          fontSize: '1rem', 
          fontWeight: '600', 
          color: '#374151', 
          marginBottom: '1rem' 
        }}>
          系統參數設定
        </h3>
        
        {/* TOC 參數 */}
        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
            TOC 設定
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '0.25rem' }}>
                入口TOC閾值 (ppbv)
              </label>
              <input
                type="number"
                step="0.5"
                value={parameters.inlet_toc_threshold}
                onChange={(e) => setParameters({
                  ...parameters,
                  inlet_toc_threshold: parseFloat(e.target.value)
                })}
                style={{
                  width: '100%',
                  padding: '0.25rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '0.25rem' }}>
                出口TOC閾值 (ppbv)
              </label>
              <input
                type="number"
                step="0.1"
                value={parameters.outlet_toc_threshold}
                onChange={(e) => setParameters({
                  ...parameters,
                  outlet_toc_threshold: parseFloat(e.target.value)
                })}
                style={{
                  width: '100%',
                  padding: '0.25rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem'
                }}
              />
            </div>
          </div>
        </div>

        {/* 濾網參數 */}
        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
            濾網設定
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '0.25rem' }}>
                初始壓差 (Pa)
              </label>
              <input
                type="number"
                step="5"
                value={parameters.pressure_initial}
                onChange={(e) => setParameters({
                  ...parameters,
                  pressure_initial: parseInt(e.target.value)
                })}
                style={{
                  width: '100%',
                  padding: '0.25rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '0.25rem' }}>
                最大壓差 (Pa)
              </label>
              <input
                type="number"
                step="5"
                value={parameters.pressure_max}
                onChange={(e) => setParameters({
                  ...parameters,
                  pressure_max: parseInt(e.target.value)
                })}
                style={{
                  width: '100%',
                  padding: '0.25rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '0.25rem' }}>
                濾網生命週期 (天)
              </label>
              <input
                type="number"
                value={parameters.lifetime_days}
                onChange={(e) => setParameters({
                  ...parameters,
                  lifetime_days: parseInt(e.target.value)
                })}
                style={{
                  width: '100%',
                  padding: '0.25rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '0.25rem' }}>
                更換提醒閾值 (%)
              </label>
              <input
                type="range"
                min="50"
                max="95"
                step="5"
                value={parameters.replacement_threshold}
                onChange={(e) => setParameters({
                  ...parameters,
                  replacement_threshold: parseInt(e.target.value)
                })}
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                {parameters.replacement_threshold}%
              </span>
            </div>
          </div>
        </div>

        {/* 環境參數 */}
        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
            環境控制
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '0.25rem' }}>
                最低溫度 (°C)
              </label>
              <input
                type="number"
                step="0.5"
                value={parameters.temp_min}
                onChange={(e) => setParameters({
                  ...parameters,
                  temp_min: parseFloat(e.target.value)
                })}
                style={{
                  width: '100%',
                  padding: '0.25rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '0.25rem' }}>
                最高溫度 (°C)
              </label>
              <input
                type="number"
                step="0.5"
                value={parameters.temp_max}
                onChange={(e) => setParameters({
                  ...parameters,
                  temp_max: parseFloat(e.target.value)
                })}
                style={{
                  width: '100%',
                  padding: '0.25rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '0.25rem' }}>
                最低濕度 (%)
              </label>
              <input
                type="number"
                step="1"
                value={parameters.humidity_min}
                onChange={(e) => setParameters({
                  ...parameters,
                  humidity_min: parseFloat(e.target.value)
                })}
                style={{
                  width: '100%',
                  padding: '0.25rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '0.25rem' }}>
                最高濕度 (%)
              </label>
              <input
                type="number"
                step="1"
                value={parameters.humidity_max}
                onChange={(e) => setParameters({
                  ...parameters,
                  humidity_max: parseFloat(e.target.value)
                })}
                style={{
                  width: '100%',
                  padding: '0.25rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem'
                }}
              />
            </div>
          </div>
        </div>

        {/* 流速設定 */}
        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
            流速設定
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '0.25rem' }}>
                目標流速 (m/s)
              </label>
              <input
                type="number"
                step="0.1"
                value={parameters.flow_rate_target}
                onChange={(e) => setParameters({
                  ...parameters,
                  flow_rate_target: parseFloat(e.target.value)
                })}
                style={{
                  width: '100%',
                  padding: '0.25rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '0.25rem' }}>
                流速容忍度 (±)
              </label>
              <input
                type="number"
                step="0.05"
                value={parameters.flow_rate_tolerance}
                onChange={(e) => setParameters({
                  ...parameters,
                  flow_rate_tolerance: parseFloat(e.target.value)
                })}
                style={{
                  width: '100%',
                  padding: '0.25rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 分析設定 */}
      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ 
          fontSize: '1rem', 
          fontWeight: '600', 
          color: '#374151', 
          marginBottom: '1rem' 
        }}>
          分析設定
        </h3>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '0.875rem', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
            分析模式
          </label>
          <select
            value={analysisMode}
            onChange={(e) => setAnalysisMode(e.target.value as AnalysisMode)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              backgroundColor: 'white'
            }}
          >
            <option value="standard">標準分析</option>
            <option value="trend">趨勢預測</option>
            <option value="anomaly">異常檢測</option>
            <option value="comprehensive">全面分析</option>
          </select>
        </div>
      </section>

      {/* 警報設定 */}
      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ 
          fontSize: '1rem', 
          fontWeight: '600', 
          color: '#374151', 
          marginBottom: '1rem' 
        }}>
          警報設定
        </h3>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={alertSettings.enabled}
              onChange={(e) => setAlertSettings({
                ...alertSettings,
                enabled: e.target.checked
              })}
            />
            <span style={{ fontSize: '0.875rem', color: '#374151' }}>啟用警報</span>
          </label>
        </div>
        
        {alertSettings.enabled && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.875rem', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                警報敏感度
              </label>
              <select
                value={alertSettings.sensitivity}
                onChange={(e) => setAlertSettings({
                  ...alertSettings,
                  sensitivity: e.target.value as 'low' | 'medium' | 'high'
                })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  backgroundColor: 'white'
                }}
              >
                <option value="low">低</option>
                <option value="medium">中</option>
                <option value="high">高</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.875rem', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                警報類型
              </label>
              {['TOC超標', '壓差異常', '溫濕度異常', '流速偏差', '濾網壽命'].map((type) => (
                <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <input
                    type="checkbox"
                    checked={alertSettings.types.includes(type)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAlertSettings({
                          ...alertSettings,
                          types: [...alertSettings.types, type]
                        });
                      } else {
                        setAlertSettings({
                          ...alertSettings,
                          types: alertSettings.types.filter(t => t !== type)
                        });
                      }
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{type}</span>
                </label>
              ))}
            </div>
          </>
        )}
      </section>

      {/* 測試數據生成器 */}
      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ 
          fontSize: '1rem', 
          fontWeight: '600', 
          color: '#374151', 
          marginBottom: '1rem' 
        }}>
          測試數據生成器
        </h3>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '0.875rem', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
            生成天數
          </label>
          <input
            type="number"
            min="1"
            max="365"
            value={config.days_count}
            onChange={(e) => setConfig({
              ...config,
              days_count: parseInt(e.target.value)
            })}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.875rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '0.875rem', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
            開始日期
          </label>
          <input
            type="date"
            value={config.start_date.toISOString().split('T')[0]}
            onChange={(e) => setConfig({
              ...config,
              start_date: new Date(e.target.value)
            })}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.875rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '0.875rem', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
            數據間隔
          </label>
          <select
            value={config.interval_minutes}
            onChange={(e) => setConfig({
              ...config,
              interval_minutes: parseInt(e.target.value)
            })}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              backgroundColor: 'white'
            }}
          >
            <option value={15}>15分鐘 (高頻)</option>
            <option value={30}>30分鐘 (標準)</option>
            <option value={60}>60分鐘 (低頻)</option>
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '0.875rem', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
            數據品質模式
          </label>
          <select
            value={config.quality_mode}
            onChange={(e) => setConfig({
              ...config,
              quality_mode: e.target.value as any
            })}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              backgroundColor: 'white'
            }}
          >
            <option value="normal">正常運行</option>
            <option value="with_anomaly">包含異常</option>
            <option value="severe_anomaly">嚴重異常</option>
            <option value="mixed">混合模式</option>
          </select>
        </div>

        {config.quality_mode !== 'normal' && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.875rem', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
              異常比例 ({config.anomaly_ratio}%)
            </label>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={config.anomaly_ratio}
              onChange={(e) => setConfig({
                ...config,
                anomaly_ratio: parseInt(e.target.value)
              })}
              style={{ width: '100%' }}
            />
          </div>
        )}

        {/* 數據預覽 */}
        <div style={{ 
          backgroundColor: '#eff6ff', 
          padding: '0.75rem', 
          borderRadius: '0.375rem', 
          marginBottom: '1rem' 
        }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1e40af', marginBottom: '0.5rem' }}>
            生成預覽
          </h4>
          <div style={{ fontSize: '0.75rem', color: '#1e40af' }}>
            <div>日期範圍: {config.days_count} 天</div>
            <div>時間間隔: {config.interval_minutes} 分鐘</div>
            <div>品質模式: {config.quality_mode}</div>
            <div>總數據點: {totalRecords} 筆</div>
            <div>預估大小: {Math.round(totalRecords * 0.5)} KB</div>
          </div>
        </div>

        <button
          onClick={onGenerate}
          disabled={isGenerating}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: isGenerating ? '#9ca3af' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: isGenerating ? 'not-allowed' : 'pointer',
            marginBottom: '0.5rem'
          }}
        >
          {isGenerating ? '生成中...' : '生成測試數據'}
        </button>

        {hasData && (
          <button
            onClick={onClearData}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            清除生成數據
          </button>
        )}
      </section>

      {/* 快速匯出 */}
      <section>
        <h3 style={{ 
          fontSize: '1rem', 
          fontWeight: '600', 
          color: '#374151', 
          marginBottom: '1rem' 
        }}>
          快速匯出
        </h3>
        <button
          disabled={!hasData}
          style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: hasData ? '#10b981' : '#d1d5db',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '0.75rem',
            cursor: hasData ? 'pointer' : 'not-allowed'
          }}
        >
          一鍵匯出完整報告
        </button>
      </section>
    </aside>
  );
};