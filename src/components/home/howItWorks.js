import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Style from './home.css';
import { Link } from 'react-router-dom';


class HowItWorks extends Component {
     render() {
        return (
                <div className="howitworks">
                <div className="container">
                    <h3>How it works</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <Link to='/' className='more-items'>Watch Videos</Link>
                </div>
                </div>
                            );
            }
        }
        export default HowItWorks;