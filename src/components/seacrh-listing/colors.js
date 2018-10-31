import React from 'react';
import ReactDOM from 'react-dom';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
import Style from './color.css';

function onChange(e) {
  console.log('Checkbox checked:', (e.target.checked));
}

class Colors extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    let colors = this.props.colorList.map((color) => {
      return (
        <p>
          <label>
            <Checkbox
              onChange={(e) => this.props.changeThisColor(e)}
              disabled={color.disabled}
              value={color.id}
            />

          </label>

        </p>
      )
    });
    return (
      <div>

        <div className='color_check'>
          {colors}
        </div>

      </div>
    );
  }
}

export default Colors;
