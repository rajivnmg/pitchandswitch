import React  from 'react';
import ReactDOM from 'react-dom';
        
 

var List = React.createClass({
  render: function(){
    return (
      <ul className="list-group">
      {
        this.props.items.map(function(item) {
          return <li className="list-group-item" data-category={item} key={item}><input type="checkbox" />{item}</li>
        })
       }
      </ul>
    )  
  }
});

export default List;