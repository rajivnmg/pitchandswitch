import React, {Component} from 'react';
import Style from './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
// import LeftNav from './components/leftNav'
// import Dashboard from './components/dashboard/Dashboard';
// import MyTrades from './components/myTrades/MyTrades';
import Home from './components/home/home';
import Login from './components/login/login'
import Register from './components/register/register'
import Forget from './components/forgotPassword/forget'
import Reset from './components/resetPassword/reset'
import Subscription from './components/subscription/subscription'
import Popup from 'react-popup';
import Dashboard from './components/dashboard/dashboard';

class App extends Component {
    
    
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
                            <Route exact path='/reset' component={Reset} />
                            <Route exact path='/subscription' component={Subscription} />
                            <Route exact path='/dashboard' component={Dashboard} />
                        </Switch>
                        </div>
                        <Footer />
                    </div>
                </Router>
              )
    }
}
export default App;