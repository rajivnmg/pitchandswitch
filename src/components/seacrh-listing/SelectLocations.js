import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
class SelectLocations extends React.Component {
  constructor(props) {
      super(props);
  }
  render() {
    return (
      <Select
        value={this.props.selectedOption}
        onChange={this.props.onLocationChange}
        options={this.props.options}
      />
    );
  }
}
export default SelectLocations;
