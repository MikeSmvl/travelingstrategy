import * as React from 'react';
import Navbar from '../components/Navbar/Navbar'
import ReactFullpage from '@fullpage/react-fullpage';
import { Card } from 'react-bootstrap/'
import '../App.css';

function Country() {
  return (
    <div>
      <Navbar />
      <ReactFullpage
        //fullpage options
        licenseKey = {'CF1896AE-3B194629-99B627C1-841383E5'}
        scrollingSpeed = {1000} /* Options here */
        sectionsColor={["#00b7ff", "#00fff0"]}
        navigation
        navigationPosition = {'left'}
        navigationTooltips = {['Basics', 'Health & Safety', 'Money']}
        anchors={['basics', 'health', 'money']}

        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <div className="section">
                <div className="App">
                  <div className="App-header" style={{ height: '50vh' }}>
                    <div
                      style={{
                        textAlign: 'center',
                        paddingTop: '110px'
                      }}
                    >
                      <span
                        style={{
                          color: 'white',
                          fontSize: '33px',
                          fontWeight: '750'
                        }}
                      >
                        Paris
                      </span>
                      <span
                        style={{
                          color: 'white',
                          fontSize: '23px',
                          fontWeight: '600',
                          display: 'block'
                        }}
                      >
                        France
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <Card style={{ color: 'grey' }}>
                    <Card.Body>This is some text within a card body.</Card.Body>
                  </Card>
                </div>
                <p>Basics</p>
              </div>
              <div className="section">
                <p>Health & Safety</p>
              </div>
              <div className="section">
                <p>Money</p>
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
		</div>
  );
}

export default Country;