import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/index'
import './index.css';
import App from './App';
import {Provider } from 'react-redux'


function render() {
     ReactDOM.render(
          <Provider store={store}>
               <App />
          </Provider>, 
          document.getElementById("root")); 
}

render()
store.subscribe(render)