import React, {useState } from 'react';





const DegreeToggle = (props) => {

  const {
    degree = '',
    updateDegree =''
  } = props

  return (
    <React.Fragment>
    <div className="form-check form-check-inline">
        <input
        className="form-check-input"
        type="radio"
        name="degree-type"
        id="celsius"
        value="celsius"
        onClick={()=>updateDegree('celsius')}
        />
        <label className="form-check-label" for="celsius">Celsius</label>
      </div>
      <div className="form-check form-check-inline">
        <input
        className="form-check-input"
        type="radio"
        name="degree-type"
        id="farenheit"
        value="farenheit"
        onClick={()=>updateDegree('farenheit')}
        />
        <label className="form-check-label" for="farenheit">Farenheit</label>
      </div>
    </React.Fragment>
  )
}

export default DegreeToggle;