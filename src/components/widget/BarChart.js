import React from 'react';
import {Bar} from 'react-chartjs-2';
import 'chartjs-plugin-labels';
import * as helper from '../../helpers';

const legends = {
    display: true,
    position: 'bottom',
    fullWidth: true,
    reverse: false,
    responsive: true,
    maintainAspectRatio: false,
};

const option = {
    layout: {
        padding: {
            left: 20,
            right: 30,
            top: 15,
            bottom: 15
        }
    },
    plugins: {
        labels: {
            render: 'value'
        }
    },
    legend: {
        display: false
    },
    scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: function(value, index, values) {
              if(parseInt(value) >= 1000){
                return helper.formatNumber(value);
              } else {
                return value;
              }
            }
          }
        }]
    },
    tooltips: {
        callbacks: {
            label: function(tooltipItem, chart){
                var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                return datasetLabel + ': ' + helper.formatNumber(tooltipItem.yLabel);
            }
        }
    }
}

const BarChartx = ({values, labels, displayName, chartColor}) => {
    const data = {
        labels: labels,
        datasets: [
          {
            label: displayName,
            backgroundColor: chartColor,
            borderColor: chartColor,
            borderWidth: 1,
            hoverBackgroundColor: chartColor,
            hoverBorderColor: chartColor,
            data: values
          }
        ]
      };
    return (
        <div>
            <Bar data={data} legends={legends} options={option}/>
        </div>
    );
};

export default BarChartx;
