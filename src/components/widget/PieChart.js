import React from "react";
import {Doughnut} from 'react-chartjs-2';
import 'chartjs-plugin-labels';
import * as helper from '../../helpers';

const legends = {
    display: true,
    position: 'left',
    fullWidth: true,
    reverse: false,
    responsive: true,
    maintainAspectRatio: false,
}

const option = {
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var meta = dataset._meta[Object.keys(dataset._meta)[0]];
          var total = meta.total;
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = parseFloat((currentValue/total*100).toFixed(1));
          return helper.formatNumber(currentValue) + ' (' + percentage + '%)';
        },
        title: function(tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        }
      }
    },
    plugins: {
      labels: [
        {
          render: 'label',
          position: 'outside',
          textMargin: 4
        },
        {
          render: 'value',
          fontStyle: 'bold',
          fontColor: 'white'
        }
      ]
    }
}

const ChartWithTextCard = ({dataset = {}, onclick}) => {  
    return (
      <div>
        <Doughnut data={dataset} legend={legends} options={option} onElementsClick={onclick}/>
      </div>
    );
  };
  
  export default ChartWithTextCard;
  

