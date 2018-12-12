import React from 'react';
import ReactDOM from 'react-dom';
import { Slider, InputNumber, Row, Col } from 'antd';
class IntegerStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inputValue: 1, tipFormatte: null};
  }
  onChange = (value) => {
    this.setState({
      inputValue: value,
      tipFormatte : null
    }, ()=>{
      this.props.onLocationChange(this.state.inputValue);
    });
  }
  render() {
    return (
      <Row>
         <Slider range defaultValue={[0, 1000]} min={0} max={1000} onChange={this.onChange}   />
      </Row>
    );
  }
}
export default IntegerStep;
