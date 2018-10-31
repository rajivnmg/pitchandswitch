import 'rc-collapse/assets/index.css';
import Collapse, { Panel } from 'rc-collapse';
import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import colorImg from '../../images/color.png';
import star from '../../images/star.png';
//import { Slider, InputNumber, Row, Col } from 'antd';
import Colors from './colors';
import UserAutosearch from './userSelect';
import axios from 'axios';
import CategoryToggleBox from './CategoryToggleBox';
import AgeSelectUser from './ageSelect';
import Style from './search-listing.css';
import IntegerStep from './IntegerStep';
import SelectLocations from './SelectLocations';
import BrandToggleBox from './BrandToggleBox';
import {
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback
} from 'reactstrap';
const constant = require('../../config/constant');

var FD = require('form-data');
var fs = require('fs');
const treeData = [{
  label: 'month - 6 month',
  value: '0-0',
  key: '0-0',

}, {
  label: '6 month - 1 year',
  value: '0-1',
  key: '0-1',

  }, {
  label: '1 year - 2 year',
  value: '0-2',
  key: '0-2',

  }, {
  label: '2 year - 5 year',
  value: '0-3',
  key: '0-3',

   }, {
  label: '5 year - 10 year',
  value: '0-4',
  key: '0-4',

}];
let catArr;
const filterSearch = [
  {label: "Newly Added", value: 1},
  {label: "A - Z", value: 2},
  {label: "Z - A", value: 3}
];

var Style1 = {columnCount: 7}
var Style2 = {minWidth: 1610}

const options = [
{ value: 'Texes', label: 'Texes' },
{ value: 'Delhi', label: 'Delhi' },
{ value: 'Haryana', label: 'Haryana' }
];

const Hide = {
  display: "none"
}
const searchUser = [
  {label: "Shopkins", value: 1},
{label: "Shoppies ", value: 2},
{label: "Bubblesiha", value: 3},
{label: "Leander ", value: 4},
{label: "Cradle", value: 5},
{label: "Crib", value: 6},
{label: "High Chair", value: 7},
{label: "Call of Duty", value: 8},
{label: "Infinate ", value: 9},
{label: "Warfare More", value: 10},

];
const App = () => (
<div className="app">
    <div className="container">
        <Select options={searchUser} />
    </div>
</div>
);

function random() {
  return parseInt(Math.random() * 10, 10) + 1;
}

class Register extends React.Component {
  constructor(props){
    super(props);
    let categoryId = props.match.params.id;
    this.state = {
      time: random(),
      accordion: false,
      activeKey: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      resultData: [],
      items: [],
      limit: 5,
      loadMore: true,
      categories : [{label: "Select", value: 1}],
      currentCategory:'',
      currentshortBy:1,
      filterOpt : {category: "", sortBy: 1},
      error: false,
      categoryList: [],
      usersList: [],
      citiesList:[],
      sizeList:[],
      sizeTreeData: [],
      brandsList:[],
      constantList:[],
      result: [],
      query: '',
      categoryId: categoryId,
      optionsChecked: [],
      ids :[],
      colors: [
        {
          id: 1,
          name: 'A',
          color: 1,
          disabled: false
        },
        {
          id: 2,
          name: 'B',
          color: 2,
          disabled: false
        },
        {
          id: 3,
          name: 'C',
          color: 3,
          disabled: false
        },
        {
          id: 4,
          name: 'D',
          color: 4,
          disabled: false
        },
        {
          id: 5,
          name: 'E',
          color: 5,
          disabled: false
        },
        {
          id: 6,
          name: 'F',
          color: 6,
          disabled: false
        },
        {
          id: 7,
          name: 'G',
          color: 7,
          disabled: false
        },
        {
          id: 8,
          name: 'H',
          color: 8,
          disabled: false
        },
        {
          id: 9,
          name: 'I',
          color: 9,
          disabled: false
        },
        {
          id: 10,
          name: 'J',
          color: 10,
          disabled: false
        },
        {
          id: 11,
          name: 'K',
          color: 11,
          disabled: false
        },
        {
          id: 12,
          name: 'L',
          color: 12,
          disabled: false
        },
        {
          id: 13,
          name: 'M',
          color: 13,
          disabled: false
        },
        {
          id: 14,
          name: 'N',
          color: 14,
          disabled: false
        },
        {
          id: 15,
          name: 'O',
          color: 15,
          disabled: false
        },
        {
          id: 16,
          name: 'P',
          color: 16,
          disabled: false
        }
      ],
      ratings: [
        {id: 5, value: 5, checked: false},
        {id: 4, value: 4, checked: false},
        {id: 3, value: 3, checked: false},
        {id: 2, value: 2, checked: false},
        {id: 1, value: 1, checked: false}
      ],
      checkedCategories : [],
      showFormSuccess : false,
      showMoreCategories: false,
      showMoreCount : 0,
      showBrandCount: 0,
      isBrandOpen: false,
      selectedUserAges:[],
      selectedSizes:[]
    };

    this.changeContanst = this.changeContanst.bind(this);
  }
  onChange = (activeKey) => {
      this.setState({
          activeKey,
      });
  }
  handleInputChange = () => {
      this.setState({
          query: this.search.value
      }, () => {
          if (this.state.query && this.state.query.length > 1) {
              if (this.state.query.length % 2 === 0) {
                  this.getInfo()
              }
          } else if (!this.state.query) {

          }
      })
  }
  handleInputChange = () => {
      this.setState({
          query: this.search.value
      }, () => {
          if (this.state.query && this.state.query.length > 1) {
              if (this.state.query.length % 2 === 0) {
                  this.getInfo()
              }
          } else if (!this.state.query) {

          }
      })
  }


changeEvent(event) {
    let checkedArray = this.state.optionsChecked;
    let selectedValue = event.target.value;
      if (event.target.checked === true) {
      	checkedArray.push(selectedValue);
          this.setState({
            optionsChecked: checkedArray
          });
      }
      else {
      	let valueIndex = checkedArray.indexOf(selectedValue);
		checkedArray.splice(valueIndex, 1);
          this.setState({
            optionsChecked: checkedArray
          });
      }
      const data = new FD();
      data.append('ids',this.state.optionsChecked)
      data.append('type','productCategory')
      axios.post('/product/filterBycategory',data).then(result =>{
		this.setState({
			resultData : result.data.result
		});
	});
  }

changeBrand(brand) {
    let checkedArray = this.state.optionsChecked;
    let selectedValue = brand.target.value;
      if (brand.target.checked === true) {
      	checkedArray.push(selectedValue);
          this.setState({
            optionsChecked: checkedArray
          });
      }
      else {
      	let valueIndex = checkedArray.indexOf(selectedValue);
		checkedArray.splice(valueIndex, 1);
          this.setState({
            optionsChecked: checkedArray
          });
      }
      const data = new FD();
      data.append('ids',this.state.optionsChecked)
      data.append('type','brand')
      console.log('aaaa',this.state.optionsChecked);
      axios.post('/product/filterBycategory',data).then(result =>{
		this.setState({
			resultData : result.data.result
		});
	});
  }

changeContanst(constantV) {
    let checkedArray = this.state.optionsChecked;
    let selectedValue = constantV.target.value;
      if (constantV.target.checked === true) {
      	checkedArray.push(selectedValue);
          this.setState({
            optionsChecked: checkedArray
          });
      }
      else {
        let valueIndex = checkedArray.indexOf(selectedValue);
		checkedArray.splice(valueIndex, 1);
          this.setState({
            optionsChecked: checkedArray
          });
      }
      const dataConstant = new FD();
      dataConstant.append('ids',this.state.optionsChecked)
      dataConstant.append('type','condition')
      axios.post('/product/filterBycategory',dataConstant).then(result =>{
		this.setState({
			resultData : result.data.result
		});
	});
  }



  changeUser(userList){
	let userValue = userList.value;
    const userdata = new FD();
      userdata.append('ids',userList.value)
      userdata.append('type','userId')
      console.log('aaaa',userdata);
    axios.post('/product/filterBycategory',userdata).then(result =>{
	    this.setState({
			resultData : result.data.result
		});
	 });
}

  changeCity(cityList){
    const citydata = new FD();
      citydata.append('ids',cityList.target.value)
      citydata.append('type','city')
      console.log('citydata',citydata)
    axios.post('/user/searchCity',citydata).then(result =>{
	    this.setState({
			resultData : result.data.result
		});
	 });
}

  changeSize(sizeList){
    const sizedata = new FD();
      sizedata.append('ids',sizeList.target.value)
      sizedata.append('type','size')
    axios.post('/product/filterBycategory',sizedata).then(result =>{
	    this.setState({
			resultData : result.data.result
		});
	});
}

   onLoadMore = () => {
      this.setState((old) => ({limit: old.limit + 10}));
   }

  getInfo = () => {
      console.log(this.state.slides)
      let ArraySlides = this.state.slides
      let ArrayNew;
      for(var i = 0; i < this.state.slides.length; i++) {
          ArrayNew = ArraySlides[i].title
      }
      this.setState({
          results: this.state.slides
      })
  }

  showMoreCategoriesOpen = (value) =>{
    const openClose = this.state.showMoreCategories;
    if(value === true){
      this.setState({showMoreCategories: false});
    }else{
      this.setState({showMoreCategories: !openClose});
    }
  }
  changeToCheckUncheck = (e) => {
    const categories = [...this.state.categoryList];
    let showMoreCount = 0;
    categories.map((item, index) => {
      if(categories[index].checked == undefined) categories[index].checked = false;
      if(item._id === e.target.value){
        categories[index].checked = !categories[index].checked;
      }
      if(categories[index].checked) showMoreCount++;
    });
    this.setState({categoryList: categories, showMoreCount:showMoreCount });
  };
  brandUpdate = (e) => {
    const brands = [...this.state.brandsList];
    let showBrandCount = 0;
    brands.map((item, index) => {
      if(brands[index].checked == undefined) brands[index].checked = false;
      if(item._id === e.target.value){
        brands[index].checked = !brands[index].checked;
      }
      if(brands[index].checked) showBrandCount++;
    });
    this.setState({brandsList: brands, showBrandCount:showBrandCount });
  };
  isBrandOpenFun = (value) =>{
    const openClose = this.state.isBrandOpen;
    if(value === true){
      this.setState({isBrandOpen: false});
    }else{
      this.setState({isBrandOpen: !openClose});
    }
  }

  doSizeSelect = (value) => {
    //console.log('onChange ', value, arguments);
    this.setState({ selectedSizes: value });
  };
  changeThisColor = (e) => {
    console.log('changeThisColor', e.target.value)
    const colors = this.state.colors;
    colors.map((item, index) => {
      if(colors[index].checked == undefined) colors[index].checked = false;
      if(item.id === e.target.value){
        colors[index].checked = !colors[index].checked;
      }
    });
    this.setState({colors: colors }, function(){
      console.log('Selected Colors', this.state.colors)
    });
  };
   componentDidMount(){
      axios.all([
        axios.get('/product/searchresult/'+ this.state.categoryId),
        axios.get('/category/categoriesActive/'),
        axios.get('/user/activeUser/'),
        axios.get('/location/activeCities/'),
        axios.get('/size/listingsize/'),
        axios.get('/brand/listingbrand/'),
        axios.get('/donation/getConstant/')
      ])
      .then(axios.spread((rs1, rs2,rs3,rs4,rs5,rs6,rs7) => {
        if(rs1.data.code === 200){
          this.setState({resultData:rs1.data.result});
        }
        if(rs2.data.code === 200){
          this.setState({categoryList:rs2.data.result});
        }
        if(rs3.data.code === 200){
          this.setState({usersList:rs3.data.result});
        }
        if(rs4.data.code === 200){
          this.setState({citiesList:rs4.data.result});
        }
        if(rs5.data.code === 200){
          this.setState({sizeList:rs5.data.result}, function(){
            let sizeTreeData = [];
            this.state.sizeList.map((size, index) => {
              sizeTreeData.push({
                label: size.size,
                value: size._id,
                key: size._id
              });
            });
            this.setState({sizeTreeData:sizeTreeData});
          });

        }
        if(rs6.data.code === 200){
          this.setState({brandsList:rs6.data.result});
        }
        if(rs7.data.code === 200){
          this.setState({constantList:rs7.data.result});
        }
      }))

      //.then(response => this.setState({ vehicles: response.data }))
      .catch(error => console.log(error));
   }

   onAgeChange = (value) => {
     this.setState({ selectedUserAges: value });
   }
   changeConstant = (e) => {
     const contants = [...this.state.constantList];
     contants.map((item, index) => {
       if(contants[index].checked == undefined) contants[index].checked = false;
       if(item._id === e.target.value){
         contants[index].checked = !contants[index].checked;
       }
     });
     this.setState({constantList: contants});
   };

  getItems() {
      const items = [];
      if(this.state.constantList.length){
        let checkedItems = this.state.categoryList.map((item) => {
          if(item.checked){
            return (
              <div className="check-box" key={item._id}>
                  <input checked={item.checked} name="Apple" id={'category-' + item._id} onChange={(e) => this.changeToCheckUncheck(e)} value={item._id} type="checkbox" />
                  <label htmlFor={'category-' + item._id}>{item.title}</label>
              </div>
            );
          }else{
            return null;
          }
        });
        let checkedBrands = this.state.brandsList.map((item) => {
          if(item.checked){
            return (
              <div className="check-box" key={item._id}>
                  <input checked={item.checked} name="Brand" id={'brand-' + item._id} onChange={(e) => this.brandUpdate(e)} value={item._id} type="checkbox" />
                  <label htmlFor={'brand-' + item._id}>{item.brandName}</label>
              </div>
            );
          }else{
            return null;
          }
        });
        let conditions = this.state.constantList.map((constant) => {
          return (<div className="check-box">
              <input name="condition" id={constant.name} value={constant.id} onChange={(e) => this.changeConstant(e)}  type="checkbox" />
              <label htmlFor={constant.name}>{constant.name}</label>
          </div>);
        });
        let getRatingImgs = (to) => {
          let jsx = [];
          for(let i=0;i<to;i++){
            jsx.push({id: i});
          }
          return jsx.map((js) => {
            return (
              <span className="stardiv">
                <img src={star} alt={star} />
              </span>
            );
          });
        };
        let ratings = this.state.ratings.map((rating) => {
          return (<div className="check-box">
              <input name="New" id={'star'+rating.id} type="checkbox" />
              <label htmlFor={'star'+rating.id}>
                {getRatingImgs(rating.value)}
              </label>
          </div>);
        });

        items.push(
                <Panel header={`All categories`} key="1">
                    <Collapse defaultActiveKey="1">
                        {checkedItems}
                          <CategoryToggleBox
                            categoryList={this.state.categoryList}
                            changeToCheck={this.changeToCheckUncheck}
                            showMoreCount={this.state.showMoreCount}
                            checkedCats={this.checkedCategories}
                            isOpen={this.state.showMoreCategories}
                            showHide={this.showMoreCategoriesOpen}
                          />
                        </Collapse>
                      </Panel>

                            );
                    items.push(
                            <Panel header={`Search by user`} key="2">
                                <Collapse>
                                    <div className="usersearch">
                                      <UserAutosearch
                                        userList={this.state.usersList}
                                       />
                                    </div>
                                    <div className="taglinerow">
                                        <div className="cl"></div>
                                    </div>
                                    <div className="cl"></div>

                                </Collapse>
                            </Panel>

                            );
                    items.push(
                            <Panel header={`Location`} key="3">
                                <Collapse>
                                    <SelectLocations options={options}/>
                                    <div className="distance-range">
                                        <span>Distance</span>
                                        <div className="range-slider">
                                            <div id="slider-range"></div>
                                        </div>
                                        <div className="cl"></div>
                                        <IntegerStep />
                                        <div id="min" className="range fl">0 <span>mile</span></div>
                                        <div id="max" className="range fr">15<span>mile</span></div>
                                    </div>
                                    <div className="cl"></div>


                                </Collapse>
                            </Panel>

                            );
                    items.push(
                            <Panel header={`Size`} key="4">
                                <Collapse>
                                    <div className="age_select_user">
                                        <AgeSelectUser
                                          treeData={this.state.sizeTreeData}
                                          value={this.state.selectedSizes}
                                          onChange={this.doSizeSelect}/>
                                    </div>
                                </Collapse>
                            </Panel>

                            );
                    items.push(
                            <Panel header={`Brands`} key="5">
                                <Collapse>
                                  {checkedBrands}
                                    <BrandToggleBox
                                      brandsList={this.state.brandsList}
                                      changeToCheck={this.brandUpdate}
                                      showMoreCount={this.state.showBrandCount}
                                      checkedBrands={this.checkedBrands}
                                      isOpen={this.state.isBrandOpen}
                                      showHide={this.isBrandOpenFun}
                                    />

                                </Collapse>
                            </Panel>

                            );
                    items.push(
                            <Panel header={`Condition`} key="6">
                                <Collapse>
                                    {conditions}
                                </Collapse>
                            </Panel>
                            );
                    items.push(
                            <Panel header={`Colors`} key="7">
                                <Collapse>
                                <div className="colors-container">
                                <Colors colorList={this.state.colors} changeThisColor={this.changeThisColor}/>
                                </div>
                                </Collapse>
                            </Panel>

                            );
                    items.push(
                            <Panel header={`Age`} key="8">
                                <Collapse>
                                  <div className="age_select_user">
                                    <AgeSelectUser
                                      treeData={treeData}
                                      onChange={this.onAgeChange}
                                      value={this.state.selectedUserAges}
                                    />
                                  </div>
                                </Collapse>
                            </Panel>

                            );
                    items.push(
                            <Panel header={`Rating`} key="9">
                                <Collapse>
                                  {ratings}
                                </Collapse>
                            </Panel>

                            );
                      }


                  return items;
              }

      setActivityKey = () => {
          this.setState({
              activeKey: ['2'],
          });
      }

      reRender = () => {
          this.setState({
              time: random(),
          });
      }

      toggle = () => {
          this.setState({
              accordion: !this.state.accordion,
          });
      }

      render() {
          const accordion = this.state.accordion;
          const btn = accordion ? 'Mode: accordion' : 'Mode: collapse';
          const activeKey = this.state.activeKey;
          return (<div className="search-page">
        		<div className="container">
        			<div className="lft-section">
              <Collapse
                  accordion={accordion}
                  onChange={this.onChange}
                  activeKey={activeKey}
                  >
                  {this.getItems()}
              </Collapse>
              </div>
        			 <div className="rgt-section" onClick={()=>{this.showMoreCategoriesOpen(true); this.isBrandOpenFun(true)}}>
         				<div className="search-row">
         					<div className="search-result">
         						<strong>"god of war 3 ps4" </strong> (19 Results)
         					</div>
         					<div className="sort-by">
         						<span>Sort by:</span>
         						<div className="newly-add">
         							<div className="search"><Select options={filterSearch} defaultValue={filterSearch[0]}   onChange={opt => console.log(opt.label, opt.value)} /></div>
         						</div>
         					</div>
         					<div className="cl"></div>
         				</div>

         				<div className="item-listing"  results={this.state.results}>
         				   { this.state.resultData.map(function (results,index) {
         					let img = results.userId?results.userId.profilePic:"";
         					return (
         					<div className="Items" key={index}><div>
         					<Link to={'/search-result/'+results._id}>
         					    <div className='pic'><img src={constant.BASE_IMAGE_URL+'Products/'+results.productImages} /></div>
         					</Link>
         					<div className='details'>
         					<h4><Link to={'/search-result/'+results._id}>{results.productName}</Link></h4>
         					  <Link className="catLink" to={'/search-result/'+results._id}>{((results.productCategory)?results.productCategory.title:"")}</Link>
         					</div>
         					<div className="userdiv">
         					<div className="user-pic">
         					   <img className="userPicNew" src={constant.BASE_IMAGE_URL+'ProfilePic/'+img} />
         					</div>
         					   <div className="user-name">{results.userId?results.userId.firstName:""}</div>
         					</div>
         					</div>
         					</div>
         					)
         				})
         				}
         				</div>
         				<div className="cl"></div>
         			</div>
         			<div className="cl"></div>
         		</div>
         	</div>);
      }
  }

  export default Register;
