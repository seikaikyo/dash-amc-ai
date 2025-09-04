import { useState } from 'react';
import { AMCTestData, DataGenerationConfig, SystemParameters, PresetMode, AnalysisMode, AlertSettings } from './types';
import { AMCDataGenerator } from './utils/dataGenerator';
import { Sidebar } from './components/Sidebar';

function App() {
  const [data, setData] = useState<AMCTestData[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'generator' | 'charts' | 'data' | 'export'>('generator');

  // 數據生成配置
  const [config, setConfig] = useState<DataGenerationConfig>({
    days_count: 7,
    start_date: new Date(),
    interval_minutes: 30,
    quality_mode: 'normal',
    anomaly_ratio: 10
  });

  // 系統參數
  const [parameters, setParameters] = useState<SystemParameters>({
    inlet_toc_threshold: 10.0,
    outlet_toc_threshold: 2.0,
    pressure_initial: 60,
    pressure_max: 80,
    temp_min: 22.0,
    temp_max: 24.0,
    humidity_min: 40.0,
    humidity_max: 46.0,
    flow_rate_target: 0.5,
    flow_rate_tolerance: 0.2,
    lifetime_days: 180,
    replacement_threshold: 80
  });

  const [presetMode, setPresetMode] = useState<PresetMode>('standard');
  const [analysisMode, setAnalysisMode] = useState<AnalysisMode>('standard');
  const [alertSettings, setAlertSettings] = useState<AlertSettings>({
    enabled: true,
    sensitivity: 'medium',
    types: ['TOC超標', '壓差異常']
  });

  // 預設配置
  const presetConfigs: Record<PresetMode, Partial<SystemParameters>> = {
    custom: {},
    standard: {
      inlet_toc_threshold: 10.0,
      outlet_toc_threshold: 2.0,
      pressure_initial: 60,
      pressure_max: 80,
      temp_min: 22.0,
      temp_max: 24.0,
      humidity_min: 40.0,
      humidity_max: 46.0,
      flow_rate_target: 0.5,
      flow_rate_tolerance: 0.2
    },
    strict: {
      inlet_toc_threshold: 8.0,
      outlet_toc_threshold: 1.5,
      pressure_initial: 50,
      pressure_max: 70,
      temp_min: 22.5,
      temp_max: 23.5,
      humidity_min: 42.0,
      humidity_max: 45.0,
      flow_rate_target: 0.5,
      flow_rate_tolerance: 0.1
    },
    loose: {
      inlet_toc_threshold: 15.0,
      outlet_toc_threshold: 3.0,
      pressure_initial: 70,
      pressure_max: 100,
      temp_min: 20.0,
      temp_max: 26.0,
      humidity_min: 35.0,
      humidity_max: 50.0,
      flow_rate_target: 0.5,
      flow_rate_tolerance: 0.3
    },
    test: {
      inlet_toc_threshold: 12.0,
      outlet_toc_threshold: 2.5,
      pressure_initial: 55,
      pressure_max: 85,
      temp_min: 21.0,
      temp_max: 25.0,
      humidity_min: 38.0,
      humidity_max: 48.0,
      flow_rate_target: 0.5,
      flow_rate_tolerance: 0.25
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const generator = new AMCDataGenerator();
      const newData = generator.generateMachineData(config);
      setData(newData);
      setActiveTab('charts');
    } catch (error) {
      console.error('數據生成失敗:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePresetChange = (mode: PresetMode) => {
    setPresetMode(mode);
    if (mode !== 'custom') {
      const preset = presetConfigs[mode];
      setParameters({ ...parameters, ...preset });
    }
  };

  const handleClearData = () => {
    setData([]);
  };

  const exportToCSV = () => {
    if (!data.length) return;

    const csvHeader = Object.keys(data[0]).join(',');
    const csvContent = data.map(row => 
      Object.values(row).map(value => 
        typeof value === 'string' ? `"${value}"` : value
      ).join(',')
    ).join('\n');
    
    const csvData = csvHeader + '\n' + csvContent;
    const blob = new Blob(['\uFEFF' + csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `AMC數據_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const recordsPerDay = Math.floor((24 * 60) / config.interval_minutes);
  const totalRecords = config.days_count * recordsPerDay;
  const passCount = data.filter(d => d.Result === 'pass').length;
  const failCount = data.filter(d => d.Result === 'fail').length;
  const passRate = data.length > 0 ? (passCount / data.length) * 100 : 0;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Sidebar */}
      <Sidebar
        config={config}
        setConfig={setConfig}
        parameters={parameters}
        setParameters={setParameters}
        presetMode={presetMode}
        onPresetChange={handlePresetChange}
        analysisMode={analysisMode}
        setAnalysisMode={setAnalysisMode}
        alertSettings={alertSettings}
        setAlertSettings={setAlertSettings}
        onGenerate={handleGenerate}
        onClearData={handleClearData}
        isGenerating={isGenerating}
        hasData={data.length > 0}
        totalRecords={totalRecords}
      />

      {/* Main Content */}
      <div style={{ marginLeft: '320px', flex: 1 }}>
        {/* Header */}
        <header style={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          color: 'white',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            鈺祥企業 AMC 智能監控系統
          </h1>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', opacity: 0.9 }}>
            Yesiang Enterprise - AMC Intelligent Monitoring System
          </h2>
          <p style={{ fontSize: '1rem', marginBottom: '0.5rem', opacity: 0.8 }}>
            從濾網到良率守門員：打造 AMC 晶圓良率防線的 AI 智能代理人
          </p>
          <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>
            From Filter to Yield Guardian: Building AI Agent for AMC Wafer Yield Defense Line
          </p>
          
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
              鈺祥企業股份有限公司 | Yesiang Enterprise Co., Ltd.
            </h3>
            <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
              專業半導體製程設備 • 精密過濾技術 • AI智能監控解決方案
            </p>
            <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>
              Professional Semiconductor Process Equipment • Precision Filtration Technology • AI Smart Monitoring Solutions
            </p>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav style={{ backgroundColor: 'white', padding: '1rem 0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              {[
                { id: 'generator', label: '數據生成器', icon: '🔧' },
                { id: 'charts', label: '即時監控', icon: '📊' },
                { id: 'data', label: '數據表格', icon: '📋' },
                { id: 'export', label: '數據匯出', icon: '💾' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    borderRadius: '0.5rem',
                    backgroundColor: activeTab === tab.id ? '#3b82f6' : '#f3f4f6',
                    color: activeTab === tab.id ? 'white' : '#374151',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Content Area */}
        <main style={{ padding: '2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* 數據生成器 */}
            {activeTab === 'generator' && (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                padding: '2rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  智能測試數據生成器
                </h3>
                
                <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                    請使用左側控制面板生成測試數據
                  </h4>
                  <p>配置完成後，點擊「生成測試數據」按鈕即可開始。</p>
                </div>
              </div>
            )}

            {/* 即時監控圖表 */}
            {activeTab === 'charts' && (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                padding: '2rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  即時監控儀表板
                </h3>
                
                {data.length > 0 ? (
                  <>
                    {/* 統計概覽 */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                      <div style={{
                        backgroundColor: '#dbeafe',
                        padding: '1.5rem',
                        borderRadius: '0.5rem',
                        textAlign: 'center'
                      }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e40af' }}>
                          總測試次數
                        </h4>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e3a8a' }}>{data.length}</div>
                      </div>
                      <div style={{
                        backgroundColor: '#dcfce7',
                        padding: '1.5rem',
                        borderRadius: '0.5rem',
                        textAlign: 'center'
                      }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#15803d' }}>
                          通過率
                        </h4>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#14532d' }}>{passRate.toFixed(1)}%</div>
                      </div>
                      <div style={{
                        backgroundColor: '#f3e8ff',
                        padding: '1.5rem',
                        borderRadius: '0.5rem',
                        textAlign: 'center'
                      }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#7c3aed' }}>
                          異常數量
                        </h4>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#581c87' }}>{failCount}</div>
                      </div>
                    </div>

                    {/* 最新數據顯示 */}
                    <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '0.5rem' }}>
                      <h4 style={{ marginBottom: '1rem', color: '#374151' }}>最新測試數據</h4>
                      {data.slice(-1).map((latest, index) => (
                        <div key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', fontSize: '0.875rem' }}>
                          <div><strong>時間:</strong> {latest.DateTime}</div>
                          <div><strong>出口TOC:</strong> {latest.Outlet_TOC} ppbv</div>
                          <div><strong>壓差:</strong> {latest.Pressure_Diff} Pa</div>
                          <div><strong>結果:</strong> 
                            <span style={{ 
                              color: latest.Result === 'pass' ? '#15803d' : '#dc2626',
                              fontWeight: 'bold',
                              marginLeft: '0.5rem'
                            }}>
                              {latest.Result.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                    <p>請先在「數據生成器」中生成測試數據</p>
                  </div>
                )}
              </div>
            )}

            {/* 數據表格 */}
            {activeTab === 'data' && (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                padding: '2rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  測試數據表格
                </h3>
                
                {data.length > 0 ? (
                  <>
                    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>共 {data.length} 筆數據</span>
                      <button
                        onClick={exportToCSV}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.25rem',
                          cursor: 'pointer'
                        }}
                      >
                        匯出 CSV
                      </button>
                    </div>
                    
                    <div style={{ overflowX: 'auto', maxHeight: '600px', overflowY: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                        <thead style={{ backgroundColor: '#f3f4f6', position: 'sticky', top: 0 }}>
                          <tr>
                            {['序號', '日期時間', 'SN', '班別', '入口TOC', '出口TOC', '壓差', '溫度', '濕度', '流速', '結果'].map(header => (
                              <th key={header} style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #d1d5db' }}>
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {data.slice(0, 100).map((row, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                              <td style={{ padding: '0.5rem' }}>{row.No}</td>
                              <td style={{ padding: '0.5rem' }}>{row.DateTime}</td>
                              <td style={{ padding: '0.5rem' }}>{row.SN}</td>
                              <td style={{ padding: '0.5rem' }}>{row.Shift}</td>
                              <td style={{ padding: '0.5rem' }}>{row.Inlet_TOC}</td>
                              <td style={{ padding: '0.5rem' }}>{row.Outlet_TOC}</td>
                              <td style={{ padding: '0.5rem' }}>{row.Pressure_Diff}</td>
                              <td style={{ padding: '0.5rem' }}>{row.Temperature}</td>
                              <td style={{ padding: '0.5rem' }}>{row.Humidity}</td>
                              <td style={{ padding: '0.5rem' }}>{row.Flow_Rate}</td>
                              <td style={{ padding: '0.5rem' }}>
                                <span style={{
                                  padding: '0.25rem 0.5rem',
                                  borderRadius: '0.25rem',
                                  fontSize: '0.75rem',
                                  fontWeight: '600',
                                  backgroundColor: row.Result === 'pass' ? '#dcfce7' : '#fee2e2',
                                  color: row.Result === 'pass' ? '#16a34a' : '#dc2626'
                                }}>
                                  {row.Result}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {data.length > 100 && (
                      <div style={{ textAlign: 'center', marginTop: '1rem', color: '#6b7280' }}>
                        顯示前 100 筆數據，完整數據請使用匯出功能
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                    <p>請先在「數據生成器」中生成測試數據</p>
                  </div>
                )}
              </div>
            )}

            {/* 數據匯出 */}
            {activeTab === 'export' && (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                padding: '2rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  數據匯出功能
                </h3>
                
                {data.length > 0 ? (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                      <div style={{
                        backgroundColor: '#dbeafe',
                        padding: '1.5rem',
                        borderRadius: '0.5rem'
                      }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e40af' }}>
                          數據統計
                        </h4>
                        <div style={{ fontSize: '0.875rem', color: '#1d4ed8' }}>
                          <div>總數據: {data.length} 筆</div>
                          <div>通過: {passCount} 筆</div>
                          <div>失敗: {failCount} 筆</div>
                          <div>通過率: {passRate.toFixed(1)}%</div>
                        </div>
                      </div>
                      <div style={{
                        backgroundColor: '#dcfce7',
                        padding: '1.5rem',
                        borderRadius: '0.5rem'
                      }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#15803d' }}>
                          數據品質
                        </h4>
                        <div style={{ fontSize: '0.875rem', color: '#15803d' }}>
                          <div>模式: {config.quality_mode}</div>
                          <div>異常比例: {config.anomaly_ratio}%</div>
                          <div>時間範圍: {config.days_count} 天</div>
                          <div>間隔: {config.interval_minutes} 分鐘</div>
                        </div>
                      </div>
                      <div style={{
                        backgroundColor: '#f3e8ff',
                        padding: '1.5rem',
                        borderRadius: '0.5rem'
                      }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#7c3aed' }}>
                          匯出選項
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <button
                            onClick={exportToCSV}
                            style={{
                              padding: '0.5rem 1rem',
                              backgroundColor: '#7c3aed',
                              color: 'white',
                              border: 'none',
                              borderRadius: '0.25rem',
                              cursor: 'pointer',
                              fontSize: '0.875rem'
                            }}
                          >
                            匯出完整 CSV 數據
                          </button>
                          <div style={{ fontSize: '0.75rem', color: '#7c2d12' }}>
                            包含所有 {data.length} 筆測試數據
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#f0f9ff', padding: '1.5rem', borderRadius: '0.5rem' }}>
                      <h4 style={{ color: '#0c4a6e', marginBottom: '1rem' }}>匯出數據預覽</h4>
                      <div style={{ fontSize: '0.875rem', color: '#0369a1' }}>
                        <div>檔案格式: CSV (Excel 相容)</div>
                        <div>編碼: UTF-8 with BOM</div>
                        <div>欄位數量: 16 個</div>
                        <div>預估檔案大小: {Math.round(data.length * 0.2)} KB</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                    <p>請先在「數據生成器」中生成測試數據</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              鈺祥企業股份有限公司 | Yesiang Enterprise Co., Ltd.
            </h4>
            <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              <strong>Dash AMC AI</strong> | AMC智能監控系統 v2.0
            </p>
            <p style={{ fontSize: '0.875rem', marginBottom: '1rem', opacity: 0.9 }}>
              專業 AI 驅動的半導體製程監控解決方案<br/>
              Professional AI-Driven Semiconductor Process Monitoring Solutions
            </p>
            
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.875rem' }}>
                設計開發：
                <a 
                  href="https://github.com/seikaikyo/dash-amc-ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#93c5fd', textDecoration: 'underline' }}
                >
                  選我正解
                </a>
              </p>
            </div>
            
            <div>
              <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                © 2024 鈺祥企業股份有限公司 版權所有 | All Rights Reserved by Yesiang Enterprise Co., Ltd.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;