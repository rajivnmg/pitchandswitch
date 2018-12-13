import React, { Component } from 'react';

class Messages extends React.Component {
    render() {
        return (<div>
            <div className="messageForm">
                <div className="messageRow">
                    <h5>User: 213496</h5>
                    <p>Pitch and Switch connects thoughtful consumers around the world with creative entrepreneurs.</p>
                </div>   
                <div className="messageRow right">
                    <h5>User: 213496</h5>
                    <p>Pitch and Switch connects thoughtful consumers around the world with creative entrepreneurs.</p>
                </div>   
                <div className="messageSent">
                    <input type="submit" value="submit" />
                    <a href="#" className="attachment">&nbsp;</a>
                    <textarea placeholder="Leave a message..."></textarea>
                     <div className="cl"></div>
                        </div>   
                 <div className="cl"></div>
        
            </div>  
        </div>
                );
    }
}

export default Messages;