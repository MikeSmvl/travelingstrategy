import React, {useEffect, useState } from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import { setSkycon } from '../../utils/weatherIcon';
var moment = require('moment');


const weather = {
  icon1: 'CLEAR_DAY',
  icon2: 'CLEAR_NIGHT',
  icon3: 'PARTLY_CLOUDY_DAY',
  icon4: 'PARTLY_CLOUDY_NIGHT',
  icon5: 'CLOUDY',
  icon6: 'RAIN',
  icon7: 'DRIZZLE',
  icon8: 'SNOW',
  icon9: 'WIND',
  icon10: 'FOG',
  color1: 'goldenrod',
  color2: 'blue',
  color3: 'gray',
  color4: 'black',
  color5: 'white',
  size: 50,
  animate: true
};

const data = {
  icon : ''
}



const Icon = (props) => {
  const [icon, setIcon] = useState(data.icon);
  const [color, setColor] = useState('Not Available Yet');
  setSkycon(data.icon, setColor, setIcon);

  const {
		lat = '',
    lng = '',
    response = []
  } = props;
  let newDate = new Date();
  console.log(response)

  return (
    <div className="col-sm-6">
    <div className="card">
      <h4 className="card-title">{moment(newDate).format('dddd')}</h4>
      <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p>
      <div className="card-body">
      <ReactAnimatedWeather
        icon={icon}
        color={weather.color3}
        size={weather.size}
        animate={weather.animate}
      />
     </div>
    </div>
  </div>
  )
}

export default Icon;