import React, {useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';
import './LineChart.css'
import {CORRECT_COLOR, ERROR_COLOR} from "../../common/common";

const LineChart = ({data}) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const getIndex = (data = []) => {
    return data.map((_, i) => i + 1);
  }

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy the previous instance if exists
    }
    const ctx = chartRef.current.getContext('2d');

    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#536DFE");
    gradientStroke.addColorStop(1, "#00b0ff");

    const gradientBkgrd = ctx.createLinearGradient(0, 100, 0, 400);
    gradientBkgrd.addColorStop(0, "rgba(83, 109, 254, 0.2)");
    gradientBkgrd.addColorStop(1, "rgba(0, 176, 255, 0)");

    const pointBackgroundColors = data.map(value => (value < 35 ? ERROR_COLOR : CORRECT_COLOR));

    const options = {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            title: () => {
              return ''
            }
          },
          backgroundColor: '#fff',
          displayColors: false,
          bodyColor: '#000',
        },
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          min: 0,
          max: 40
        }
      }
    };

    const chartData = {
      labels: getIndex(data),
      datasets: [{
        backgroundColor: gradientBkgrd,
        borderColor: gradientStroke,
        data: data,
        fill: true,
        pointBorderColor: "rgba(255,255,255,0)",
        pointBackgroundColor: pointBackgroundColors,
        pointBorderWidth: 3,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: gradientStroke,
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        borderWidth: 2,
        pointHitRadius: 6,
      }]
    };

    const chartInstance = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: options,
    });

    chartInstanceRef.current = chartInstance;

    return () => {
      chartInstance.destroy();
    };
  }, [data]);

  const style = {
    position: 'relative',
    width: `calc(100% - 20px)`,
    height: 'auto',
  }

  return (
    <div className="line-chart">
      <div className="chart__container" style={style}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>)
};

export default LineChart;
