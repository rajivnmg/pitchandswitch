import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Badge} from 'reactstrap';
//import Moment from 'moment';

// import PropTypes from 'prop-types';


class Report extends Component {
  //~ constructor(props){
       //~ super(props);
  //~ }
  render() {
    return (
      <tr key={(this.props.transaction)?this.props.transaction._id:0}>
      <td>{this.props.sequenceNo+1}</td>
        <td>{(this.props.transaction)?this.props.transaction.paymentId:"N/A"}</td>
        <td>{(this.props.transaction)?this.props.transaction.transactionType:"N/A"}</td>
        <td>{(this.props.transaction && this.props.transaction.userId)? this.props.transaction.userId.userName:"N/A"}</td>
        <td>{(this.props.transaction && this.props.transaction.userId)?this.props.transaction.transactionDate:""}</td>
        <td>{(this.props.transaction && this.props.transaction.userId)?this.props.transaction.transactionAmount:0}</td>
        <td>
           <Badge className="mousePointer" onClick={this.props.changeStatus.bind(this, this.props.transaction)} color= {(this.props.transaction.status === '1')?'success':'danger'}>
            {(this.props.transaction.status === '1')?'completed':'pending'}
          </Badge>
        </td>
        <td>
          <Link to={'/transactions/view/' + this.props.transaction._id}><i className="fa fa-eye fa-md"></i>&nbsp;</Link>
        </td>
      </tr>
    );
  }
}
// ProjectItem.propTypes = {
//   project: PropTypes.object
// };
export default Report;
