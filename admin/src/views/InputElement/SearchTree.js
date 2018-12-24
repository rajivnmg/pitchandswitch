import React from "react";
import { Tree, Input } from 'antd';
import 'antd/dist/antd.css';
const { TreeNode } = Tree;
const Search = Input.Search;

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item._id === key)) {
        parentKey = node._id;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
const generateList = (data, dataList) => {
  for (let i = 0; i < data.length; i++) {
	const node = data[i];
	dataList.push({...node});
	if (node.children) {
	  generateList(node.children, dataList);
	}
  }
};

class SearchTree extends React.Component {
	  
  constructor(props) {
    super(props);	  
	const dataList = [];
	//const expandedKeys = [];
	//console.log('DDDD', this.props.categorydata);
	generateList(this.props.categorydata, dataList);
	
	const expandedKeys = dataList.map((item) => {
      return getParentKey(item._id, this.props.categorydata);
    }).filter((item, i, self) => item && self.indexOf(item) === i);
	console.log('DDDD',dataList, expandedKeys);
	this.state = {
		expandedKeys: expandedKeys,
		searchValue: '',
		autoExpandParent: true,
		dataList
	}	
  }
  
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  handleOnChange = (selectedKeys, e) => {
	 this.props.handleOnChange(selectedKeys[0]);
  }

  onChange = (e) => {
    const value = e.target.value;
    const expandedKeys = this.state.dataList.map((item) => {
	  const thisTitle = {...item};
      if (thisTitle.title.toLowerCase().indexOf(value.toLowerCase()) > -1) {
        return getParentKey(item._id, this.props.categorydata);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  }

  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const loop = data => data.map((item) => {
	  const thisTitle = {...item};
      const index = thisTitle.title.toLowerCase().indexOf(searchValue.toLowerCase());
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const searchString = item.title.substr(index, searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchString}</span>
          {afterStr}
        </span>
      ) : <span>{item.title}</span>;

      if (item.children) {
        return (
          <TreeNode key={item._id} title={title}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item._id} title={title} />;
    });
    return (
      <div>
        <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
        <Tree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onSelect={this.handleOnChange}
          selectedKeys={this.props.selected}
          checkedKeys={this.props.selected}
        >
          {loop(this.props.categorydata)}
        </Tree>
      </div>
    );
  }
}
export default SearchTree;
