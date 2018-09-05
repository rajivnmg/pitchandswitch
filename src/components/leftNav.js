import React, {Component} from 'react';
  
class LeftNav extends Component {
    render() {
        return (
                <aside className="left-nav">
                    <nav>
                        <ul>
                            <li><a href="#">Manage Users</a></li>
                            <li><a href="#">Manage Categories</a></li>
                            <li><a href="#">Manage Products</a></li>
                            <li><a href="#">Manage Trades</a></li>
                            <li><a href="#">Manage Subscriptions</a></li>
                            <li><a href="#">Manage Donations</a></li>
                            <li><a href="#">Manage Transactions</a></li>
                            <li><a href="#">Manage Notifications</a></li>
                            <li><a href="#">Manage Advertisement</a></li>
                            <li><a href="#">Manage CMS</a></li>
                            <li><a href="#">Reports</a></li>
                            <li><a href="#">My Account</a></li>
                        </ul>
                    </nav>
                </aside>
                )
    }
} 
export default LeftNav;