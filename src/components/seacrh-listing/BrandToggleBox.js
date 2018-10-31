import React, { Component } from 'react';
import ToggleDisplay from 'react-toggle-display';
import { Scrollbars } from 'react-custom-scrollbars';
var Style1 = {columnCount: 3  }
var Style2 = {minWidth: 600}

class BrandToggleBox extends Component {
  constructor(props) {
    super(props);
    this.state = {filteredBrands: []};
  }
  componentDidMount(){
    if(this.props.brandsList.length) this.itemFilter(this.props.brandsList, '');
  }
  itemFilter = (brands, keyword = '') => {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const newBrands = [...brands];
    let newBrandArray = [];
    alphabets.forEach(function(alphabet, index){
      let alphabetFlag = true;
      newBrands.forEach(function(brand, brandIndex){
        if(alphabet === brand.brandName.substr(0,1).toUpperCase()){
          if(keyword.toLowerCase() === brand.brandName.substr(0,keyword.length).toLowerCase()){
            if(alphabetFlag){
              newBrandArray.push({id: "", brandName: alphabet});
              alphabetFlag = false;
            }
            newBrandArray.push(brand);
          }
        }
      });
    });
    this.setState({filteredBrands: newBrandArray});
  }

  render() {
    let brandList = null;
    if(this.state.filteredBrands.length){
        brandList = this.state.filteredBrands.map((item, index) => {
        if(item.id === ""){
          return (<li key={index}><h5>{item.brandName}</h5></li>);
        }else {
        return (<li key={index}>
            <div className="check-box"><input checked={item.checked}  name="brand" id={'cat-' + item._id} onChange={(e) => this.props.changeToCheck(e)} value={item._id} type="checkbox" />
              <label htmlFor={'cat-' + item._id}>
                {item.brandName}
              </label>
            </div>
          </li>);
        }
      });
    }
    return (
      <div className="App">
        <p className="App-intro">
          <button className="moreCat" onClick={ () => this.props.showHide() }>+{this.props.brandsList.length - this.props.showMoreCount} More</button>
        </p>
        <ToggleDisplay show={this.props.isOpen}>
          <div className="searchBox" >
            <div className="search-div">
              <input type="text" className="" onChange = {(e) => this.itemFilter(this.props.brandsList, e.target.value)} placeholder="Type here" />
            </div>
            <Scrollbars className="Scrollsdiv" style={{height: 385}}>
              <div className="checkboxDiv" style={Style2}>
                <ul style={Style1}>
                  { brandList}
                </ul>
              </div>
            </Scrollbars>
          </div>
        </ToggleDisplay>
      </div>
    );
  }
}
export default BrandToggleBox;
