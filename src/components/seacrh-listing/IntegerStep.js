import React from 'react';
import ReactDOM from 'react-dom';
import { Slider, InputNumber, Row, Col } from 'antd';
class IntegerStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inputValue: 1};
  }
  onChange = (value) => {
    this.setState({
      inputValue: value,
      tipFormatte : null
    });
  }
  render() {
    return (
      <Row>
         <Slider range defaultValue={[2, 50]}   />
      </Row>
    );
  }
}
export default IntegerStep;
