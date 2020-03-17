import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Bar} from 'react-chartjs-2';

const GraphRender = (props) => {
	const {
		monthlyWeather = ''
	} = props;

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
    datasets: [
      {
        label: '°C',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        hoverBackgroundColor: 'rgba(75,192,192,1)',
        hoverBorderColor: 'rgba(220,220,220,1)',
        data: [monthlyWeather.january,
               monthlyWeather.february,
               monthlyWeather.march,
               monthlyWeather.april,
               monthlyWeather.may,
               monthlyWeather.june,
               monthlyWeather.july,
               monthlyWeather.august,
               monthlyWeather.septembre,
               monthlyWeather.octobre,
               monthlyWeather.novembre,
               monthlyWeather.decembre
        ],
      }
    ],
  };

  return (
    <div>
      <Bar data={data} 
          width={200}
          height={200}
          options={{
            maintainAspectRatio: false
          }}/>
    </div>
  )
};

GraphRender.propTypes = {
  monthlyWeather: PropTypes.string
};

export default GraphRender;