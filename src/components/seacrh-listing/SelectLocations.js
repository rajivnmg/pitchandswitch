import React from "react";
import Select from "react-select";
class SelectLocations extends React.Component {
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
