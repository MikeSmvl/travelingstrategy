import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Divider } from '../../Card/Card';
import { Row, Col, Table, Nav } from 'react-bootstrap/';
import GraphRender from './GraphRender';
import Footer from '../../Footer/Footer';

const WeatherGraph = (props) => {
  const {
    children,
    destinationCity = '',
    ...rest
  } = props;

  const [monthlyWeather, setMonthlyWeather] = useState('')

  useEffect(() => {
    async function fetchData() {
      await fetch(process.env.REACT_APP_BACKEND, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `{
            avgMonthlyWeather:city_average_monthly_weather(city: "${destinationCity}"){
              city,
              january,
              february,
              march,
              april,
              may,
              june,
              july,
              august,
              septembre,
              octobre,
              novembre,
              decembre
            }
          }`
        })
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          res.data.avgMonthlyWeather
            && res.data.avgMonthlyWeather.length !== 0
            && setMonthlyWeather(res.data.avgMonthlyWeather[0]);
        });
    }

    fetchData();
  }, [
    destinationCity
  ]);

  return (
        <Card
          header="Average Monthly Temperature"
            footer={(
            <Row className="justify-content-center"><a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" target="_blank" rel="noopener noreferrer"><i className="fa fa-globe" /> C-Reference &nbsp;</a>
            </Row>
          )}
        >
          <CardBody>
          {!monthlyWeather ? (
            <div>
              Note: We don&apos;t have any info on monthly weather for
              {destinationCity}. Try Googling instead.
            </div>
          ) : (
            <div
              className="scrolling-card"
              style={{ maxHeight: '400px', overflow: 'scroll' }}
            >
            <GraphRender monthlyWeather={monthlyWeather}/>
            </div>
          )}
          </CardBody>
        </Card>
  );
};

WeatherGraph.propTypes = {
  destinationCity: PropTypes.string
};

export default WeatherGraph;

