import * as React from 'react';
import Navbar from '../components/Navbar/Navbar'
import ReactFullpage from '@fullpage/react-fullpage';
import '../App.css';

function Country() {
  return (
    <div>
      <Navbar />
      <ReactFullpage
        //fullpage options
        licenseKey = {'CF1896AE-3B194629-99B627C1-841383E5'}
        scrollingSpeed = {1000} /* Options here */
        sectionsColor={["#FFFFFF", "#000000"]}

        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <div className="section">
                <p>Section 1 (welcome to fullpage.js)</p>
                <button onClick={() => fullpageApi.moveSectionDown()}>
                  Click me to move down
                </button>
              </div>
              <div className="section">
                <p>Section 2</p>
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
		</div>
  );
}

export default Country;