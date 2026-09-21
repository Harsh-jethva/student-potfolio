import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function TaskAnalyticsChart({ tasks = [] }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  const highPriority = tasks.filter((t) => (t.priority || '').toLowerCase() === 'high').length;
  const mediumPriority = tasks.filter((t) => (t.priority || '').toLowerCase() === 'medium').length;
  const lowPriority = tasks.filter((t) => (t.priority || '').toLowerCase() === 'low').length;

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Completed Tasks', 'Pending Tasks', 'High Priority', 'Medium Priority', 'Low Priority'],
        datasets: [
          {
            label: 'Task Metrics',
            data: [
              completedCount,
              pendingCount,
              highPriority,
              mediumPriority,
              lowPriority
            ],
            backgroundColor: [
              '#10b981', // green
              '#f59e0b', // amber
              '#ef4444', // red
              '#3b82f6', // blue
              '#8b5cf6'  // purple
            ],
            borderWidth: 2,
            borderColor: '#ffffff'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 13
              },
              boxWidth: 16
            }
          },
          title: {
            display: true,
            text: 'Live Task Status & Priority Breakdown (Chart.js)',
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [completedCount, pendingCount, highPriority, mediumPriority, lowPriority]);

  return (
    <div className="task-chart-wrapper">
      <div className="task-chart-inner">
        <canvas ref={chartRef} height={260} />
      </div>
      <div className="chart-stats-summary">
        <span className="badge badge-success">Completed: {completedCount}</span>
        <span className="badge badge-warning">Pending: {pendingCount}</span>
        <span className="badge badge-total">Total Tasks: {tasks.length}</span>
      </div>
    </div>
  );
}
