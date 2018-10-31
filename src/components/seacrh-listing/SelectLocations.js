import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
class SelectLocations extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          selectedOption: null
      };
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={this.props.options}
      />
    );
  }
}
export default SelectLocations;
