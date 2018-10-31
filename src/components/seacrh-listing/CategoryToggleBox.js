import React, { Component } from 'react';
import ToggleDisplay from 'react-toggle-display';
import { Scrollbars } from 'react-custom-scrollbars';
var Style1 = {columnCount: 7}
var Style2 = {minWidth: 1610}

class CategoryToggleBox extends Component {
  constructor(props) {
    super(props);
    this.state = {filteredCats: []};
  }
  componentDidMount(){
    if(this.props.categoryList.length) this.itemFilter(this.props.categoryList, '');
  }
  itemFilter = (categories, keyword = '') => {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const newCategories = [...categories];
    let newCategoryArray = [];
    alphabets.forEach(function(alphabet, index){
      let alphabetFlag = true;
      newCategories.forEach(function(category, catIndex){
        if(alphabet === category.title.substr(0,1).toUpperCase()){
          if(keyword.toLowerCase() === category.title.substr(0,keyword.length).toLowerCase()){
            if(alphabetFlag){
              newCategoryArray.push({id: "", title: alphabet});
              alphabetFlag = false;
            }
            newCategoryArray.push(category);
          }
        }
      });
    });
    this.setState({filteredCats: newCategoryArray});
  }
  //
  // componentDidMount(){
  //    axios.get('/category/categoriesActive/').then(rs => {
  //      this.setState({categories:rs.data.result}, function(){
  //        this.itemFilter(this.state.categories);
  //      });
  //    })
  // }

  render() {
    const categoryList = this.state.filteredCats.map((item, index) => {
      if(item.id === ""){
        return (<li key={index}><h5>{item.title}</h5></li>);
      }else {
      return (<li key={index}>
          <div className="check-box"><input checked={item.checked}  name="category" id={'cat-' + item._id} onChange={(e) => this.props.changeToCheck(e)} value={item._id} type="checkbox" />
            <label htmlFor={'cat-' + item._id}>
              {item.title}
            </label>
          </div>
        </li>);
      }
    });
    return (
      <div className="App">
        <p className="App-intro">
          <button className="moreCat" onClick={ () => this.props.showHide() }>+{this.props.categoryList.length - this.props.showMoreCount} More</button>
        </p>
        <ToggleDisplay show={this.props.isOpen}>
          <div className="searchBox" >
            <div className="search-div">
              <input type="text" className="" onChange = {(e) => this.itemFilter(this.props.categoryList, e.target.value)} placeholder="Type here" />
            </div>
            <Scrollbars className="Scrollsdiv" style={{height: 385 }}>
              <div className="checkboxDiv" style={Style2}>
                <ul style={Style1}>
                  { categoryList}
                </ul>
              </div>
            </Scrollbars>
          </div>
        </ToggleDisplay>
      </div>
    );
  }
}
export default CategoryToggleBox;
