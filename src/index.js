import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import store from "./store/rootStore";

//import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
//setTimeout(() => { ReactDOM.unmountComponentAtNode(document.getElementById('root'));}, 10000);
//registerServiceWorker(); 

 
