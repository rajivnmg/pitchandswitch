import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { SketchPicker } from 'react-color'

class AboutUs extends React.Component {
    render() {
        return (
                <div className="add-product-container">
                    <div  className="container">
                        <div className="breadcrumb">
                            <ul>
                                <li><Link to={ (localStorage.getItem('isLoggedIn') === 1)?'/dashboard':'/'  }>Home</Link></li>
                                <li>About Us</li>
                            </ul>
                        </div>
                        <div className="cl"></div>
                        <div className="cms-page">
                
                            <h3>About Us</h3>
                            <p>Pitch and Switch connects thoughtful consumers around the world with creative entrepreneurs. It's an ecosystem where people of all backgrounds inspire each other and build relationships through making, selling, and buying unique goods. We want everyone on Pitch and Switch to feel safe, and fostering an inclusive environment is our priority. This policy explains the kind of behaviour we prohibit on Pitch and Switch to make sure we all have a positive experience.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur</p>
                            <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure</p>
                            <div className="brdr-top">
                                <p>Last updated on 08 Jan, 2018</p>
                            </div>
                
                
                        </div>
                        <div className="cl"> </div>
                    </div>
                </div>
                );
    }
}

export default AboutUs;
