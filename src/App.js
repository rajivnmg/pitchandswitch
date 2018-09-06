import React, {Component} from 'react';
import Popup from 'react-popup';
import Style from './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
// import LeftNav from './components/leftNav'
import MyTrades from './components/myTrades/MyTrades';
import MyTradesDetail from './components/myTrades/MyTradesDetail';
import Home from './components/home/home';
import Login from './components/login/login'
import Register from './components/register/register'
import Forget from './components/forgotPassword/forget'
import Reset from './components/resetPassword/reset'
import Subscription from './components/subscription/subscription'
import Dashboard from './components/dashboard/dashboard';
import SearchListing from './components/seacrh-listing/seacrh-listing';
import AddNewProduct from './components/addNewProduct/addnewproduct';
import myTreasureChest from './components/myTreasureChest/myTreasureChest';
import Style1 from './media.css';
import axios from 'axios';
//import http from 'http';
const port=4001;
const basePath ='';// '/react-test';
//axios.defaults.baseURL = window.location.protocol + '//' + window.location.hostname + ':' + port + basePath;
axios.defaults.baseURL = 'http://localhost:5001'+ basePath;
axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
const SERVER_URL='http://localhost:5001';

class App extends Component {
	constructor(props){
    super(props);
    //console.log('TOken', localStorage.getItem('jwtToken'));
    if(localStorage.getItem('jwtToken') === null){
       window.location.href="#/login";
    }
  }
  componentDidMount() {
	//the function call just after render the html	
  }
	
    render() {
        return(
               <Router>
                    <div className="layout">
                        <Header />
                        <div id="content">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/register' component={Register} />
                            <Route exact path='/forget' component={Forget} />
                            <Route exact path='/reset/:id?' component={Reset} />   
                            <Route exact path='/verifyUserEmail/:id?' component={Login} />                          
                            <Route exact path='/subscription' component={Subscription} />
                            <Route exact path='/dashboard' component={Dashboard} />
                            <Route exact path='/search-listing' component={SearchListing} />
                            <Route exact path='/add-new-product' component={AddNewProduct} />
                            <Route exact path='/my-trades' component={MyTrades} />
                            <Route exact path='/my-trade-detail' component={MyTradesDetail} />
                            <Route exact path="/my-treasure-chest" component={myTreasureChest} />
                        </Switch>
                        </div>
                        <Footer />
                    </div>
                </Router>
              )
    }
}
export default App;
