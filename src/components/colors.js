import React from 'react';
import ReactDOM from 'react-dom';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
import Style from './seacrh-listing/color.css';

class Colors extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    let colors = null;
    if(this.props.colorList.length){
      colors = this.props.colorList.map((color) => {
        return (
          <p key={color.id}>
            <label>
              <Checkbox
                onChange={(e) => this.props.changeThisColor(e)}
                disabled={color.disabled}
                value={color.id}
                checked={color.checked}
              />

            </label>

          </p>
        )
      });
    }
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
