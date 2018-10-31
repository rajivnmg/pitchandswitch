import 'rc-tree-select/assets/index.css';
import TreeSelect from 'rc-tree-select';
import React from 'react';
import ReactDOM from 'react-dom';
import Style from './ageselect.css';

const SHOW_PARENT = TreeSelect.SHOW_PARENT;

class AgeSelectUser extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      disabled: false,
    };
  }
  switch = (checked) => {
    this.setState({ disabled: checked });
  }
  render() {
    const tProps = {
      treeData: this.props.treeData,
      disabled: this.state.disabled,
      value: this.props.value,
      onChange: this.props.onChange,
      multiple: true,
      allowClear: true,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: 'Please select',
      style: {
        width: 210,
      },
    };
    return (
      <div>
        <TreeSelect {...tProps} />

      </div>
    );
  }
}
export default AgeSelectUser;
