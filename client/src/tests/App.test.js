import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import googleStub from './stubs/google'

const stub = new googleStub();
window.google = stub.google;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
