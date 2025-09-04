import React from 'react';
import Plot from 'react-plotly.js';
import type { AMCTestData, SystemParameters } from '../types';

interface ChartsProps {
  data: AMCTestData[];
  parameters: SystemParameters;
}

export const RealtimeMonitoringCharts: React.FC<ChartsProps> = ({ data, parameters }) => {
  if (!data.length) return null;

  const latest = data[data.length - 1];
  
  // TOC 儀表盤
  const tocGauge = {
    data: [{
      type: 'indicator' as const,
      mode: 'gauge+number+delta',
      value: latest.Outlet_TOC,
      delta: { reference: parameters.outlet_toc_threshold },
      title: { text: '出口TOC (ppbv)', font: { size: 18 } },
      gauge: {
        axis: { range: [0, parameters.outlet_toc_threshold * 2] },
        bar: { color: 'darkblue' },
        steps: [
          { range: [0, parameters.outlet_toc_threshold], color: 'lightgreen' },
          { range: [parameters.outlet_toc_threshold, parameters.outlet_toc_threshold * 1.5], color: 'yellow' },
          { range: [parameters.outlet_toc_threshold * 1.5, parameters.outlet_toc_threshold * 2], color: 'red' }
        ],
        threshold: {
          line: { color: 'red', width: 4 },
          thickness: 0.75,
          value: parameters.outlet_toc_threshold
        }
      }
    }],
    layout: {
      height: 300,
      margin: { l: 20, r: 20, t: 40, b: 20 }
    }
  };

  // 壓差儀表盤
  const pressureGauge = {
    data: [{
      type: 'indicator' as const,
      mode: 'gauge+number+delta',
      value: latest.Pressure_Diff,
      delta: { reference: parameters.pressure_max },
      title: { text: '濾網壓差 (Pa)', font: { size: 18 } },
      gauge: {
        axis: { range: [0, parameters.pressure_max * 1.5] },
        bar: { color: 'darkgreen' },
        steps: [
          { range: [0, parameters.pressure_initial], color: 'lightgreen' },
          { range: [parameters.pressure_initial, parameters.pressure_max], color: 'yellow' },
          { range: [parameters.pressure_max, parameters.pressure_max * 1.5], color: 'red' }
        ],
        threshold: {
          line: { color: 'red', width: 4 },
          thickness: 0.75,
          value: parameters.pressure_max
        }
      }
    }],
    layout: {
      height: 300,
      margin: { l: 20, r: 20, t: 40, b: 20 }
    }
  };

  // 系統效率儀表盤
  const efficiency = (data.filter(d => d.Result === 'pass').length / data.length) * 100;
  const efficiencyGauge = {
    data: [{
      type: 'indicator' as const,
      mode: 'gauge+number',
      value: efficiency,
      title: { text: '系統效率 (%)', font: { size: 18 } },
      gauge: {
        axis: { range: [0, 100] },
        bar: { color: 'gold' },
        steps: [
          { range: [0, 60], color: 'red' },
          { range: [60, 85], color: 'yellow' },
          { range: [85, 100], color: 'lightgreen' }
        ],
        threshold: {
          line: { color: 'purple', width: 4 },
          thickness: 0.75,
          value: 90
        }
      }
    }],
    layout: {
      height: 300,
      margin: { l: 20, r: 20, t: 40, b: 20 }
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '2rem' }}>
      <div>
        <Plot {...tocGauge} style={{ width: '100%', height: '300px' }} />
      </div>
      <div>
        <Plot {...pressureGauge} style={{ width: '100%', height: '300px' }} />
      </div>
      <div>
        <Plot {...efficiencyGauge} style={{ width: '100%', height: '300px' }} />
      </div>
    </div>
  );
};

export const TrendAnalysisCharts: React.FC<ChartsProps> = ({ data, parameters }) => {
  if (!data.length) return null;

  const dates = data.map(d => d.DateTime);
  
  // 多維度趨勢分析
  const trendChart = {
    data: [
      {
        x: dates,
        y: data.map(d => d.Outlet_TOC),
        type: 'scatter' as const,
        mode: 'lines+markers' as const,
        name: '出口TOC',
        line: { color: '#1f77b4', width: 3 },
        marker: { size: 6, color: '#1f77b4' },
        yaxis: 'y1'
      },
      {
        x: dates,
        y: data.map(d => d.Pressure_Diff),
        type: 'scatter' as const,
        mode: 'lines+markers' as const,
        name: '壓差',
        line: { color: '#2ca02c', width: 3 },
        marker: { size: 6, color: '#2ca02c' },
        yaxis: 'y2'
      },
      {
        x: dates,
        y: data.map(d => d.Temperature),
        type: 'scatter' as const,
        mode: 'lines+markers' as const,
        name: '溫度',
        line: { color: '#ff7f0e', width: 3 },
        marker: { size: 6, color: '#ff7f0e' },
        yaxis: 'y3'
      },
      {
        x: dates,
        y: data.map(d => d.Humidity),
        type: 'scatter' as const,
        mode: 'lines+markers' as const,
        name: '濕度',
        line: { color: '#d62728', width: 3 },
        marker: { size: 6, color: '#d62728' },
        yaxis: 'y4'
      }
    ],
    layout: {
      title: '多參數趨勢分析儀表板',
      height: 500,
      grid: { rows: 2, columns: 2, pattern: 'independent' },
      xaxis: { title: '時間' },
      yaxis: { title: 'TOC (ppbv)', side: 'left' },
      yaxis2: { title: '壓差 (Pa)', side: 'right', overlaying: 'y' },
      yaxis3: { title: '溫度 (°C)', side: 'left' },
      yaxis4: { title: '濕度 (%)', side: 'right', overlaying: 'y3' },
      plot_bgcolor: 'rgba(245,245,245,0.8)',
      showlegend: true
    }
  };

  return (
    <div>
      <Plot {...trendChart} style={{ width: '100%', height: '500px' }} />
    </div>
  );
};

export const ThreeDVisualization: React.FC<ChartsProps> = ({ data, parameters }) => {
  if (!data.length) return null;

  // 3D 散點圖
  const scatter3d = {
    data: [{
      x: data.map(d => d.Outlet_TOC),
      y: data.map(d => d.Pressure_Diff),
      z: data.map(d => d.Temperature),
      mode: 'markers' as const,
      type: 'scatter3d' as const,
      marker: {
        size: data.map(d => d.Humidity / 5),
        color: data.map(d => d.Outlet_TOC),
        colorscale: 'Viridis',
        showscale: true,
        colorbar: { title: 'TOC值', x: 1.1 },
        opacity: 0.8,
        line: { width: 2, color: 'DarkSlateGrey' }
      },
      text: data.map((_, i) => `測試點 ${i}`),
      hovertemplate: '<b>測試點 %{text}</b><br>' +
                    'TOC: %{x:.3f} ppbv<br>' +
                    '壓差: %{y:.1f} Pa<br>' +
                    '溫度: %{z:.1f}°C<br>' +
                    '<extra></extra>',
      name: '測試數據點'
    }],
    layout: {
      title: '3D多維度數據分析 (TOC-壓差-溫度)',
      scene: {
        xaxis: { title: '出口TOC (ppbv)' },
        yaxis: { title: '壓差 (Pa)' },
        zaxis: { title: '溫度 (°C)' },
        bgcolor: 'rgba(240,240,240,0.8)',
        camera: { eye: { x: 1.5, y: 1.5, z: 1.5 } }
      },
      height: 600,
      margin: { l: 0, r: 0, b: 0, t: 50 }
    }
  };

  // 性能預測表面圖
  const tocRange = Array.from({ length: 20 }, (_, i) => 
    Math.min(...data.map(d => d.Outlet_TOC)) + 
    (Math.max(...data.map(d => d.Outlet_TOC)) - Math.min(...data.map(d => d.Outlet_TOC))) * i / 19
  );
  const pressureRange = Array.from({ length: 20 }, (_, i) => 
    Math.min(...data.map(d => d.Pressure_Diff)) + 
    (Math.max(...data.map(d => d.Pressure_Diff)) - Math.min(...data.map(d => d.Pressure_Diff))) * i / 19
  );

  const surfaceZ = tocRange.map(toc => 
    pressureRange.map(pressure => 
      100 * Math.exp(
        -Math.pow(toc / parameters.outlet_toc_threshold, 2) - 
        Math.pow(pressure / parameters.pressure_max, 2)
      )
    )
  );

  const surface3d = {
    data: [{
      z: surfaceZ,
      x: tocRange,
      y: pressureRange,
      type: 'surface' as const,
      colorscale: 'RdYlGn',
      showscale: true,
      colorbar: { title: '預測性能 (%)', x: 1.1 }
    }],
    layout: {
      title: '系統性能預測表面 (基於TOC和壓差)',
      scene: {
        xaxis: { title: 'TOC (ppbv)' },
        yaxis: { title: '壓差 (Pa)' },
        zaxis: { title: '預測性能 (%)' },
        camera: { eye: { x: 1.2, y: 1.2, z: 1.2 } }
      },
      height: 600,
      margin: { l: 0, r: 0, b: 0, t: 50 }
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <Plot {...scatter3d} style={{ width: '100%', height: '600px' }} />
      </div>
      <div>
        <h4 style={{ marginBottom: '1rem' }}>🌊 性能預測表面圖</h4>
        <Plot {...surface3d} style={{ width: '100%', height: '600px' }} />
      </div>
    </div>
  );
};

export const StatisticalAnalysis: React.FC<ChartsProps> = ({ data, parameters }) => {
  if (!data.length) return null;

  // 分佈直方圖
  const histograms = {
    data: [
      {
        x: data.map(d => d.Outlet_TOC),
        type: 'histogram' as const,
        name: 'TOC分佈',
        marker: { color: 'skyblue', opacity: 0.7 },
        xaxis: 'x',
        yaxis: 'y'
      },
      {
        x: data.map(d => d.Pressure_Diff),
        type: 'histogram' as const,
        name: '壓差分佈',
        marker: { color: 'lightgreen', opacity: 0.7 },
        xaxis: 'x2',
        yaxis: 'y2'
      },
      {
        x: data.map(d => d.Temperature),
        type: 'histogram' as const,
        name: '溫度分佈',
        marker: { color: 'orange', opacity: 0.7 },
        xaxis: 'x3',
        yaxis: 'y3'
      },
      {
        x: data.map(d => d.Humidity),
        type: 'histogram' as const,
        name: '濕度分佈',
        marker: { color: 'pink', opacity: 0.7 },
        xaxis: 'x4',
        yaxis: 'y4'
      }
    ],
    layout: {
      title: '參數分佈統計',
      height: 500,
      grid: { rows: 2, columns: 2, pattern: 'independent' },
      showlegend: false,
      plot_bgcolor: 'rgba(245,245,245,0.8)',
      annotations: [
        { text: 'TOC分佈', x: 0.2, y: 0.9, xref: 'paper', yref: 'paper', showarrow: false },
        { text: '壓差分佈', x: 0.8, y: 0.9, xref: 'paper', yref: 'paper', showarrow: false },
        { text: '溫度分佈', x: 0.2, y: 0.4, xref: 'paper', yref: 'paper', showarrow: false },
        { text: '濕度分佈', x: 0.8, y: 0.4, xref: 'paper', yref: 'paper', showarrow: false }
      ]
    }
  };

  // 箱型圖
  const boxPlots = {
    data: [
      {
        y: data.map(d => d.Outlet_TOC),
        type: 'box' as const,
        name: 'TOC',
        marker: { color: '#1f77b4' },
        boxpoints: 'outliers' as const
      },
      {
        y: data.map(d => d.Pressure_Diff),
        type: 'box' as const,
        name: '壓差',
        marker: { color: '#ff7f0e' },
        boxpoints: 'outliers' as const
      },
      {
        y: data.map(d => d.Temperature),
        type: 'box' as const,
        name: '溫度',
        marker: { color: '#2ca02c' },
        boxpoints: 'outliers' as const
      },
      {
        y: data.map(d => d.Humidity),
        type: 'box' as const,
        name: '濕度',
        marker: { color: '#d62728' },
        boxpoints: 'outliers' as const
      },
      {
        y: data.map(d => d.Flow_Rate),
        type: 'box' as const,
        name: '流速',
        marker: { color: '#9467bd' },
        boxpoints: 'outliers' as const
      }
    ],
    layout: {
      title: '參數異常值檢測 (箱型圖)',
      height: 500,
      yaxis: { title: '數值' },
      plot_bgcolor: 'rgba(245,245,245,0.8)'
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div>
        <Plot {...histograms} style={{ width: '100%', height: '500px' }} />
      </div>
      <div>
        <Plot {...boxPlots} style={{ width: '100%', height: '500px' }} />
      </div>
    </div>
  );
};

export const CorrelationHeatmap: React.FC<ChartsProps> = ({ data }) => {
  if (!data.length) return null;

  const numericFields = ['Outlet_TOC', 'Inlet_TOC', 'Pressure_Diff', 'Temperature', 'Humidity', 'Flow_Rate'];
  
  // 計算相關性矩陣
  const correlationMatrix = numericFields.map(field1 => 
    numericFields.map(field2 => {
      const values1 = data.map(d => d[field1 as keyof AMCTestData] as number);
      const values2 = data.map(d => d[field2 as keyof AMCTestData] as number);
      return pearsonCorrelation(values1, values2);
    })
  );

  const heatmap = {
    data: [{
      z: correlationMatrix,
      x: numericFields,
      y: numericFields,
      type: 'heatmap' as const,
      colorscale: 'RdBu',
      zmid: 0,
      text: correlationMatrix.map(row => row.map(val => val.toFixed(2))),
      texttemplate: '%{text}',
      textfont: { size: 12 },
      hoverongaps: false,
      colorbar: { title: '相關係數' }
    }],
    layout: {
      title: '參數相關性熱圖',
      height: 500,
      font: { size: 12 }
    }
  };

  // 計算特徵重要性
  const resultNumeric = data.map(d => d.Result === 'pass' ? 1 : 0);
  const featureImportance = numericFields.map(field => {
    const values = data.map(d => d[field as keyof AMCTestData] as number);
    return {
      field,
      importance: Math.abs(pearsonCorrelation(values, resultNumeric))
    };
  }).sort((a, b) => b.importance - a.importance);

  const importanceChart = {
    data: [{
      x: featureImportance.map(f => f.field),
      y: featureImportance.map(f => f.importance),
      type: 'bar' as const,
      marker: {
        color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'].slice(0, featureImportance.length)
      },
      text: featureImportance.map(f => f.importance.toFixed(3)),
      textposition: 'auto' as const
    }],
    layout: {
      title: '特徵對系統性能的影響程度',
      xaxis: { title: '參數' },
      yaxis: { title: '重要性係數' },
      height: 400,
      plot_bgcolor: 'rgba(245,245,245,0.8)'
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <Plot {...heatmap} style={{ width: '100%', height: '500px' }} />
      </div>
      <div>
        <h4 style={{ marginBottom: '1rem' }}>🎯 特徵重要性分析</h4>
        <Plot {...importanceChart} style={{ width: '100%', height: '400px' }} />
      </div>
    </div>
  );
};

export const RadarChart: React.FC<ChartsProps> = ({ data, parameters }) => {
  if (!data.length) return null;

  // 計算各項指標得分
  const avgOutletToc = data.reduce((sum, d) => sum + d.Outlet_TOC, 0) / data.length;
  const avgPressure = data.reduce((sum, d) => sum + d.Pressure_Diff, 0) / data.length;
  const avgTemp = data.reduce((sum, d) => sum + d.Temperature, 0) / data.length;
  const avgHumidity = data.reduce((sum, d) => sum + d.Humidity, 0) / data.length;

  const tocScore = Math.max(0, (parameters.outlet_toc_threshold - avgOutletToc) / parameters.outlet_toc_threshold * 100);
  const pressureScore = Math.max(0, (parameters.pressure_max - avgPressure) / parameters.pressure_max * 100);
  const tempScore = 100 - Math.abs(avgTemp - (parameters.temp_min + parameters.temp_max) / 2) / ((parameters.temp_max - parameters.temp_min) / 2) * 100;
  const humidityScore = 100 - Math.abs(avgHumidity - (parameters.humidity_min + parameters.humidity_max) / 2) / ((parameters.humidity_max - parameters.humidity_min) / 2) * 100;
  const efficiencyScore = (data.filter(d => d.Result === 'pass').length / data.length) * 100;

  const categories = ['TOC控制', '壓差管理', '溫度穩定', '濕度控制', '整體效率'];
  const values = [tocScore, pressureScore, tempScore, humidityScore, efficiencyScore];

  const radar = {
    data: [
      {
        r: [...values, values[0]], // 閉合圖形
        theta: [...categories, categories[0]],
        type: 'scatterpolar' as const,
        fill: 'toself' as const,
        name: '當前性能',
        line: { color: 'rgb(0,100,200)' },
        fillcolor: 'rgba(0,100,200,0.3)'
      },
      {
        r: [90, 85, 95, 90, 95, 90], // 目標性能
        theta: [...categories, categories[0]],
        type: 'scatterpolar' as const,
        fill: 'toself' as const,
        name: '目標性能',
        line: { color: 'rgb(200,0,100)' },
        fillcolor: 'rgba(200,0,100,0.1)'
      }
    ],
    layout: {
      polar: {
        radialaxis: {
          visible: true,
          range: [0, 100],
          tickvals: [20, 40, 60, 80, 100],
          ticktext: ['20%', '40%', '60%', '80%', '100%']
        }
      },
      showlegend: true,
      title: '系統性能綜合評估雷達圖',
      height: 500
    }
  };

  return (
    <Plot {...radar} style={{ width: '100%', height: '500px' }} />
  );
};

// 輔助函數：計算皮爾森相關係數
function pearsonCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);
  const sumYY = y.reduce((sum, yi) => sum + yi * yi, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY));

  return denominator === 0 ? 0 : numerator / denominator;
}