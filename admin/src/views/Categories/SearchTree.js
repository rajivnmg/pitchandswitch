import React from "react";
import { Tree, Input } from 'antd';
import 'antd/dist/antd.css';
const { TreeNode } = Tree;
const Search = Input.Search;

/*const x = 3;
const y = 2;
const z = 1;
 const gData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
 generateData(z);

	const dataList = [];
	const generateList = (data) => {
	  for (let i = 0; i < data.length; i++) {
		const node = data[i];
		const key = node.key;
		dataList.push({ key, title: key });
		if (node.children) {
		  generateList(node.children, node.key);
		}
	  }
	};
	generateList(gData);*/

const getParentKey = (key, tree) => {
  let parentKey = null;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item._id === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  console.log(parentKey);
  return parentKey;
};

class SearchTree extends React.Component {
  
  constructor(props) {
    super(props);	  
	this.state = {
		expandedKeys: [],
		searchValue: '',
		autoExpandParent: true,
	}
	let parentData = [];
	
	
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
    const expandedKeys = this.props.categorydata.map((item) => {
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
    }, () => {
		//this.props.setValue(
	});
  }

  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const loop = data => data.map((item) => {
	  const thisTitle = {...item};
      const index = thisTitle.title.toLowerCase().indexOf(searchValue.toLowerCase());
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
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
