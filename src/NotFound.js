import React from 'react';
import { Link } from 'react-router-dom';
const NotFound = () => (
<div className="container">
<div className="notFound">
<h4 className="notText">404<span>Page Not Found</span></h4>
<center>
<Link to="/">Return to Home Page</Link></center>
</div>
</div>
);
export default NotFound;
