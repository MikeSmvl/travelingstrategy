import * as React from 'react';
import PropTypes from 'prop-types';
import './Subtitle.css';

const Subtitle = (props) => {
  const {
    text = ''
  } = props;
  return (
    <>
  <div className="subtitle">{text}</div>
  <hr style={{border: 'solid 0.8px #ff6e61', marginTop: '0', width: '70px', color: 'rgb(134, 134, 146)'}}></hr>
  </>
  );
}

Subtitle.propTypes = {
	text: PropTypes.string
};

export default Subtitle