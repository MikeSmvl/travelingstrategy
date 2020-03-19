import React, {useState } from 'react';


const degree = {

    type ='celcius'
}


updateDegreeType = (event) => {

      degree.type = event.target.value
  }

const DegreeToggle = (props) => {
  const [degreeType, setDegreeType] = useState('celcius');

  return (
    <React.Fragment>
    <div className="form-check form-check-inline">
        <input
        className="form-check-input"
        type="radio"
        name="degree-type"
        id="celsius"
        value="celsius"
        checked={degree.type === "celsius"}
        onClick={updateDegreeType}
        />
        <label className="form-check-label" for="celsius">Celsius</label>
      </div>
      <div className="form-check form-check-inline">
        <input
        className="form-check-input"
        type="radio"
        name="degree-type"
        id="farenheit"
        value="fahrenheit"
        checked={degree.type === "fahrenheit"}
        onClick={updateDegreeType}
        />
        <label className="form-check-label" for="farenheit">Farenheit</label>
      </div>
    </React.Fragment>
  )
}

export default DegreeToggle;