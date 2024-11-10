
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SalesGraph = ({ data }) => {
  const chartRef = useRef(null); 
  const canvasRef = useRef(null); 

  useEffect(() => {
    
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    if (data && data.totalSales !== undefined) {
      const ctx = canvasRef.current.getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Total Sales'],
          datasets: [{
            label: 'Sales',
            data: [data.totalSales],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            }
          }
        }
      });
    }

 
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div style={{ width: '100%', height: '400px', padding: '20px', boxSizing: 'border-box' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sales Graph</h2>
      <canvas ref={canvasRef} id="salesChart" style={{ width: '100%', height: '100%' }}></canvas>
    </div>
  );
};

export default SalesGraph;
