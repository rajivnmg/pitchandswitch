import "rc-collapse/assets/index.css";
import Collapse, { Panel } from "rc-collapse";
import React from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import { Link } from "react-router-dom";
import colorImg from "../../images/color.png";
import star from "../../images/star.png";
//import { Slider, InputNumber, Row, Col } from 'antd';

import Colors from "./colors";
import UserAutosearch from "./userSelect";
import axios from "axios";
import CategoryToggleBox from "./CategoryToggleBox";
import AgeSelectUser from "./ageSelect";
import Style from "./search-listing.css";
import IntegerStep from "./IntegerStep";
import SelectLocations from "./SelectLocations";
import BrandToggleBox from "./BrandToggleBox";
import { Fade, Form, FormGroup, FormText, FormFeedback } from "reactstrap";
import Aux from "../../hoc/Aux";
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
const constant = require("../../config/constant");

var FD = require("form-data");
var fs = require("fs");
const treeData = [
  {
    label: "month - 6 month",
    value: "0-0",
    key: "0-0"

  },
  {
    label: "6 month - 1 year",
    value: "0-1",
    key: "0-1"
  },
  {
    label: "1 year - 2 year",
    value: "0-2",
    key: "0-2"
  },
  {
    label: "2 year - 5 year",
    value: "0-3",
    key: "0-3"
  },
  {
    label: "5 year - 10 year",
    value: "0-4",
    key: "0-4"
  }
];
let catArr;
const filterSearch = [
  { label: "Newly Added", value: 1 },
  { label: "A - Z", value: 2 },
  { label: "Z - A", value: 3 }
];

var Style1 = { columnCount: 7 };
var Style2 = { minWidth: 1610 };

const options = [
  { value: "Texes", label: "Texes" },
  { value: "Delhi", label: "Delhi" },
  { value: "Haryana", label: "Haryana" }
];

const Hide = {
  display: "none"
};

function random() {
  return parseInt(Math.random() * 10, 10) + 1;
}

class Register extends React.Component {
  constructor(props) {
    super(props);
    let categoryId = props.match.params.id;
    let latitude = props.match.params.latitude;
    if (latitude != undefined) {
      latitude = latitude.replace(" ", "");
    } else {
      latitude = "";
    }
    let longitude = props.match.params.longitude;
    if (longitude != undefined) {
      longitude = longitude.replace(" ", "");
    } else {
      longitude = "";
    }
    this.state = {
      time: random(),
      accordion: false,
      activeKey: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      resultData: [],
      items: [],
      limit: 5,
      loadMore: true,
      categories: [{ label: "Select", value: 1 }],
      currentCategory: "",
      currentshortBy: 1,
      filterOpt: { category: "", sortBy: 1 },
      error: false,
      categoryList: [],
      usersList: [],
      citiesList: [],
      sizeList: [],
      sizeTreeData: [],
      brandsList: [],
      constantList: [],
      result: [],
      query: "",
      filters: {
        selectedCategories: [],
        selectedUsers: [],
        selectedLocations: [],
        selectedSizes: [],
        selectedBrands: [],
        selectedConditions: [],
        selectedColors: [],
        selectedAges: [],
        selectedRatings: []
      },
      categoryId: categoryId,
      latitude: latitude,
      longitude: longitude,
      optionsChecked: [],
      ids: [],
      colors: [],
      ratings: [
        { id: 5, value: 5, checked: false },
        { id: 4, value: 4, checked: false },
        { id: 3, value: 3, checked: false },
        { id: 2, value: 2, checked: false },
        { id: 1, value: 1, checked: false }
      ],
      showFormSuccess: false,
      showMoreCategories: false,
      showMoreCount: 0,
      showBrandCount: 0,
      isBrandOpen: false,
      checkedCategories: [],
      locationMin: 0,
      locationMax: 1000
    };
  }
  onChange = activeKey => {
    this.setState({
      activeKey
    });
  };
  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getInfo();
          }
        } else if (!this.state.query) {
        }
      }
    );
  };
  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getInfo();
          }
          } else if (!this.state.query) {
        }
      }
    );
  };

  loadFilterData = () => {
    let filters = { ...this.state.filters };
    const data = new FD();
    if (filters.selectedAges.length) {
      data.append("age_ids", filters.selectedAges);
      data.append("age_type", "productAge");
    }
    if (filters.selectedBrands.length) {
      data.append("brand_ids", filters.selectedBrands);
      data.append("brand_type", "brand");
    }
    if (filters.selectedCategories.length) {
      data.append("category_ids", filters.selectedCategories);
      data.append("category_type", "productCategory");
    }
    if (filters.selectedColors.length) {
      data.append("color_ids", filters.selectedColors);
      data.append("color_type", "color");
    }
    if (filters.selectedConditions.length) {
      data.append("condition_ids", filters.selectedConditions);
      data.append("condition_type", "condition");
    }
    if (filters.selectedLocations.length) {
      data.append("location_ids", filters.selectedLocations);
      data.append("location_type", "location");
    }
    if (filters.selectedRatings.length) {
      data.append("rating_ids", filters.selectedRatings);
      data.append("rating_type", "rating");
    }
    if (filters.selectedSizes.length) {
      data.append("size_ids", filters.selectedSizes);
      data.append("size_type", "size");
    }
    if (filters.selectedUsers.length) {
      data.append("user_ids", filters.selectedUsers);
      data.append("user_type", "userId");
    }
    if (this.state.latitude !== "") {
      data.append("latitude", this.state.latitude);
      data.append("longitude", this.state.longitude);
    }
    axios.post("/product/filterBycategory", data).then(result => {
      if (result.data.code === 200) {
        this.setState({
          resultData: result.data.result
        });
      } else {
        this.setState({
          resultData: []
        });
      }
    });
  };
  onLoadMore = () => {
    this.setState(old => ({ limit: old.limit + 10 }));
  };

  getInfo = () => {
    //console.log(this.state.slides)
    let ArraySlides = this.state.slides;
    let ArrayNew;
    for (var i = 0; i < this.state.slides.length; i++) {
      ArrayNew = ArraySlides[i].title;
    }
    this.setState({
      results: this.state.slides
    });
  };

  showMoreCategoriesOpen = value => {
    const openClose = this.state.showMoreCategories;
    if (value === true) {
      this.setState({ showMoreCategories: false });
    } else {
      this.setState({ showMoreCategories: !openClose });
    }
  };
  changeToCheckUncheck = e => {
    const categories = [...this.state.categoryList];
    let showMoreCount = 0;
    let checkedArray = [];
    categories.map((item, index) => {
      if (categories[index].checked == undefined)
        categories[index].checked = false;
      if (item._id === e.target.value) {
        categories[index].checked = !categories[index].checked;
      }
      if (item.checked) checkedArray.push(item._id);
      if (categories[index].checked) showMoreCount++;
    });
    let filters = { ...this.state.filters };
    filters.selectedCategories = checkedArray;
    this.setState(
      {
        categoryList: categories,
        showMoreCount: showMoreCount,
        filters: filters
      },
      this.loadFilterData
    );
  };
  brandUpdate = e => {
    const brands = [...this.state.brandsList];
    let showBrandCount = 0;
    let selectedBrands = [];
    brands.map((item, index) => {
      if (brands[index].checked == undefined) brands[index].checked = false;
      if (item._id === e.target.value) {
        brands[index].checked = !brands[index].checked;
      }
      if (brands[index].checked) {
        showBrandCount++;
        selectedBrands.push(item._id);
      }
    });
    let filters = { ...this.state.filters };
    filters.selectedBrands = selectedBrands;
    this.setState(
      { brandsList: brands, showBrandCount: showBrandCount, filters: filters },
      this.loadFilterData
    );
  };
  isBrandOpenFun = value => {
    const openClose = this.state.isBrandOpen;
    if (value === true) {
      this.setState({ isBrandOpen: false });
    } else {
      this.setState({ isBrandOpen: !openClose });
    }
  };

  doSizeSelect = value => {
    //  console.log('doSizeSelect ', value);
    let filters = { ...this.state.filters };
    filters.selectedSizes = value;
    this.setState({ filters: filters }, this.loadFilterData);
  };
  changeThisColor = e => {
    const colors = this.state.colors;
    let selectedColors = [];
    colors.map((item, index) => {
      if (colors[index].checked == undefined) colors[index].checked = false;
      if (item.id === e.target.value) {
        colors[index].checked = !colors[index].checked;
      }
      if (colors[index].checked) selectedColors.push(item.id);
    });
    let filters = { ...this.state.filters };
    filters.selectedColors = selectedColors;
    this.setState({ filters: filters, colors: colors }, this.loadFilterData);
  };
  getExtraParams = () => {
    let url = "";
    if (this.state.categoryId != undefined) url += "/" + this.state.categoryId;
    if (this.state.latitude !== "") {
      url += "/" + this.state.latitude + "/" + this.state.longitude;
    }
    return url;
  };
  componentDidMount() {
    let url = "/product/searchresult";
    url += this.getExtraParams();
    axios
      .all([
        axios.get(url),
        axios.get("/category/categoriesActive/"),
        axios.get("/user/activeUser/"),
        axios.get("/location/activeCities/"),
        axios.get("/size/listingsize/"),
        axios.get("/brand/listingbrand/"),
        axios.get("/product/getColors/"),
        axios.get("/donation/getConstant/")
      ])
      .then(
        axios.spread((rs1, rs2, rs3, rs4, rs5, rs6, rs7, rs8) => {
          if (rs1.data.code === 200) {
            this.setState({ resultData: rs1.data.result });
          }
          if (rs2.data.code === 200) {
            this.setState({ categoryList: rs2.data.result }, () => {
              const categories = [...this.state.categoryList];
              if (this.state.categoryId) {
                let showMoreCount = 0;
                let checkedArray = [];
                categories.map((item, index) => {
                  if (categories[index].checked == undefined)
                    categories[index].checked = false;
                  if (item._id === this.state.categoryId) {
                    categories[index].checked = !categories[index].checked;
                  }
                  if (item.checked) checkedArray.push(item._id);
                  if (categories[index].checked) showMoreCount++;
                });
                let filters = { ...this.state.filters };
                filters.selectedCategories = checkedArray;
                this.setState({
                  categoryList: categories,
                  filters: filters,
                  showMoreCount: showMoreCount
                });
              }
            });
          }
          if (rs3.data.code === 200) {
            this.setState({ usersList: rs3.data.result });
          }
          if (rs4.data.code === 200) {
            this.setState({ citiesList: rs4.data.result });
          }
          if (rs5.data.code === 200) {
            this.setState({ sizeList: rs5.data.result }, function() {
              let sizeTreeData = [];
              this.state.sizeList.map((size, index) => {
                sizeTreeData.push({
                  label: size.size,
                  value: size._id,
                  key: size._id
                });
              });
              this.setState({ sizeTreeData: sizeTreeData });
            });
          }
          if (rs6.data.code === 200) {
            this.setState({ brandsList: rs6.data.result });
          }
          if (rs7.data.code === 200) {
            this.setState({ colors: rs7.data.result });
          }
          if (rs8.data.code === 200) {
            this.setState({ constantList: rs8.data.result });
          }
        })
      )

      //.then(response => this.setState({ vehicles: response.data }))
      .catch(error => console.log(error));
  }

  onAgeChange = value => {
    let filters = { ...this.state.filters };
    filters.selectedAges = value;
    this.setState({ filters: filters }, this.loadFilterData);
  };
  changeConstant = e => {
    const contants = [...this.state.constantList];
    let selectedConditions = [];
    contants.map((item, index) => {
      if (contants[index].checked == undefined) contants[index].checked = false;
      if (item.id === e.target.value) {
        contants[index].checked = !contants[index].checked;
      }
      if (contants[index].checked) selectedConditions.push(item.id);
    });
    console.log("changeConstant", selectedConditions, contants, e.target.value);
    let filters = { ...this.state.filters };
    filters.selectedConditions = selectedConditions;
    this.setState(
      { constantList: contants, filters: filters },
      this.loadFilterData
    );
  };

  onUserChange = tags => {
    if (tags) {
      const userdata = new FD();
      let ids = [];
      tags.map((tag, index) => {
        ids.push(tag.id);
      });
      let filters = { ...this.state.filters };
      filters.selectedUsers = ids;
      this.setState({ filters: filters }, this.loadFilterData);
    }
  };
  onRatingChange = (e, rating) => {
    let filters = { ...this.state.filters };
    if (e.target.checked) {
      filters.selectedRatings = [...filters.selectedRatings, rating.id];
    } else {
      const selIndex = filters.selectedRatings.map((rat, index) => {
        if (rat === rating.id) return index;
      });
      filters.selectedRatings.splice(selIndex, 1);
    }
    this.setState({ filters: filters }, this.loadFilterData);
  };
  onLocationChange = selectedOption => {
    let filters = { ...this.state.filters };
    filters.selectedLocations = selectedOption;
    this.setState(
      {
        filters: filters,
        locationMin: selectedOption[0],
        locationMax: selectedOption[1]
      },
      this.loadFilterData
    );
  };

  getItems() {
    const items = [];
    if (this.state.constantList.length) {
      let checkedItems = this.state.categoryList.map(item => {
        if (item.checked) {
          return (
            <div className="check-box" key={item._id}>
              <input
                checked={item.checked}
                name="Apple"
                id={"category-" + item._id}
                onChange={e => this.changeToCheckUncheck(e)}
                value={item._id}
                type="checkbox"
              />
              <label htmlFor={"category-" + item._id}>{item.title}</label>
            </div>
          );
        } else {
          return null;
        }
      });
      let checkedBrands = this.state.brandsList.map(item => {
        if (item.checked) {
          return (
            <div className="check-box" key={item._id}>
              <input
                checked={item.checked}
                name="Brand"
                id={"brand-" + item._id}
                onChange={e => this.brandUpdate(e)}
                value={item._id}
                type="checkbox"
              />
              <label htmlFor={"brand-" + item._id}>{item.brandName}</label>
            </div>
          );
        } else {
          return null;
        }
      });
      let conditions = this.state.constantList.map(constant => {
        return (
          <div className="check-box">
            <input
              name="condition"
              id={constant.name}
              value={constant.id}
              onChange={e => this.changeConstant(e)}
              type="checkbox"
            />
            <label htmlFor={constant.name}>{constant.name}</label>
          </div>
        );
      });
      let getRatingImgs = to => {
        let jsx = [];
        for (let i = 0; i < to; i++) {
          jsx.push({ id: i });
        }
        return jsx.map(js => {
          return (
            <span className="stardiv">
              <img src={star} alt={star} />
            </span>
          );
        });
      };
      let ratings = this.state.ratings.map(rating => {
        return (
          <div className="check-box">
            <input
              name="New"
              id={"star" + rating.id}
              type="checkbox"
              onChange={e => this.onRatingChange(e, rating)}
            />
            <label htmlFor={"star" + rating.id}>
              {getRatingImgs(rating.value)}
            </label>
          </div>
        );
      });

      items.push(
        <Panel header={`All categories`} key="1">
          <Collapse defaultActiveKey="1">
            {checkedItems}
            <CategoryToggleBox
              categoryList={this.state.categoryList}
              changeToCheck={this.changeToCheckUncheck}
              showMoreCount={this.state.showMoreCount}
              checkedCats={this.state.filters.selectedCategories}
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
                onUserChange={this.onUserChange}
              />
            </div>
            <div className="taglinerow">
              <div className="cl" />
            </div>
            <div className="cl" />
          </Collapse>
        </Panel>
      );
      
      items.push(
        <Panel header={`Location`} key="3">
          <Collapse>
            <div className="distance-range">
              <div className="range-slider">
                <div id="slider-range" />
              </div>
              <div className="cl" />
              <IntegerStep onLocationChange={this.onLocationChange} />
              <div id="min" className="range fl">
                {this.state.locationMin} <span>km</span>
              </div>
              <div id="max" className="range fr">
                {this.state.locationMax} <span>km</span>
              </div>
            </div>
            <div className="cl" />
          </Collapse>
        </Panel>
      );
      items.push(
        <Panel header={`Size`} key="4">
          <Collapse>
            <div className="age_select_user">
              <AgeSelectUser
                treeData={this.state.sizeTreeData}
                value={this.state.filters.selectedSizes}
                onChange={this.doSizeSelect}
              />
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
              checkedBrands={this.state.filters.selectedBrands}
              isOpen={this.state.isBrandOpen}
              showHide={this.isBrandOpenFun}
            />
          </Collapse>
        </Panel>
      );
      items.push(
        <Panel header={`Condition`} key="6">
          <Collapse>{conditions}</Collapse>
        </Panel>
      );
      items.push(
        <Panel header={`Colors`} key="7">
          <Collapse>
            <div className="colors-container">
              <Colors
                colorList={this.state.colors}
                changeThisColor={this.changeThisColor}
              />
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
                value={this.state.filters.selectedAges}
              />
            </div>
          </Collapse>
        </Panel>
      );
      items.push(
        <Panel header={`Rating`} key="9">
          <Collapse>{ratings}</Collapse>
        </Panel>
      );
    }
    return items;
  }

  setActivityKey = () => {
    this.setState({
      activeKey: ["2"]
    });
  };

  reRender = () => {
    this.setState({
      time: random()
    });
  };

  toggle = () => {
    this.setState({
      accordion: !this.state.accordion
    });
  };

  render() {
    const accordion = this.state.accordion;
    const btn = accordion ? "Mode: accordion" : "Mode: collapse";
    const activeKey = this.state.activeKey;

    let searchItems = null;
    if (this.state.resultData.length) {
      searchItems = this.state.resultData.map(function(item, index) {
        let catId: "";
        let catName: "";
        if (item.productCategory && Array.isArray(item.productCategory)) {
          catId = item.productCategory[0]._id;
          catName = item.productCategory[0].title;
        } else {
          catId = item.productCategory._id;
          catName = item.productCategory.title;
        }


    let userID = item.userId?item.userId._id:'';  
         
        let img = item.userId ? (
          <img
            className="userPicNew"
            src={
              constant.BASE_IMAGE_URL + "ProfilePic/" + item.userId.profilePic
            }
          />
        ) : null;
        return (
          <div className="Items" key={index}>
            <div>
              <If condition={localStorage.getItem('isLoggedIn') == "1" && localStorage.getItem('userId') === userID}>
               <Then>
                   <Link to={'/my-trade-detail/'+item._id}>
                      <div className="pic">
						  <img
							src={
							  constant.BASE_IMAGE_URL + "Products/" + item.productImages
							}
						  />
						</div>
					  </Link>
                 </Then>   
                  <Else>
                  <Link to={"/search-result/" + item._id}>
                   <div className="pic">
                    <img
                    src={
                      constant.BASE_IMAGE_URL + "Products/" + item.productImages
                    }
                    />
                  </div>
                </Link>
              </Else>
              </If>
              <div className="details">
                <h4>
                <If condition={localStorage.getItem('isLoggedIn') == "1" && localStorage.getItem('userId') === userID}>
                  <Then>
                    <Link to={"/my-trade-detail/" + item._id}>
                     {item.productName}
                  </Link>
                  </Then>
                   <Else>
                    <Link to={"/search-result/" + item._id}>
                    {item.productName}
                  </Link>
                   </Else>
                   </If>
                </h4>
                
                <Link className="catLink" to={"/search-listing/" + catId}>
                  {catName}
                </Link>
              </div>
              <div className="userdiv">
                <div className="user-pic">
                  <Link
                    to={
                      "/public-profile/" + (item.userId ? item.userId._id : "")
                    }
                  >
                    {img}
                  </Link>
                </div>
                <div className="user-name">
                  <Link
                    className="alink"
                    to={
                      "/public-profile/" + (item.userId ? item.userId._id : "")
                    }
                  >
                    {item.userId ? item.userId.firstName : ""}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <Aux>
        <div className="search-page">
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
            <div
              className="rgt-section"
              onClick={() => {
                this.showMoreCategoriesOpen(true);
                this.isBrandOpenFun(true);
              }}
            >
              <div className="search-row">
                <div className="search-result">
                  <strong>{this.state.searchvalue}</strong> (
                  {this.state.resultData.length} Results)
                </div>
                <div className="sort-by">
                  <span>Sort by:</span>
                  <div className="newly-add">
                    <div className="search">
                      <Select
                        options={filterSearch}
                        defaultValue={filterSearch[0]}
                        onChange={opt => console.log(opt.label, opt.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="cl" />
               </div>
              <div className="item-listing">{searchItems}</div>
              <div className="cl" />
            </div>
            <div className="cl" />
          </div>
        </div>
      </Aux>
    );
  }
}

export default Register;
