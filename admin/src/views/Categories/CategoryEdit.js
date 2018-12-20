import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import InputElement from "../InputElement/InputElement";
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row
} from "reactstrap";

var options = [];
class CategoryEdit extends Component {
  constructor(props) {
    super(props);
    this.title = React.createRef();
    this.description = React.createRef();
    this.parent = React.createRef();
    this.status = React.createRef();
    let categoryId = this.props.match.params.id;

    this.state = {
      categoryId: categoryId,
      requestStatus: false,
      categoryForm: {
        title: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Title"
          },
          value: "",
          label: "Title",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        description: {
          elementType: "textarea",
          elementConfig: {
            type: "textarea",
            placeholder: "Description"
          },
          value: "",
          label: "Description",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        parent: {
          elementType: "search-tree",
          elementConfig: {
            options: [],
            selected: [],
            handleCategorySelect: this.handleCategorySelect
          },
          value: "",
          label: "Parent",
          validation: {
            required: false
          },
          valid: true,
          touched: false
        }
      }
    };
  }
  handleCategorySelect = (category) => {
	  this.inputChangedHandler(category, 'parent');	  
  }
  checkValidity(value, rules) {
    let isValid = false;
    if (rules.required) {
      isValid = value.trim() != "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }
  inputChangedHandler = (event, inputIdentifier) => {
	let targetValue = null;
	let selected = [];
	if(inputIdentifier === 'parent'){
		targetValue = event;
		selected = [event];
	}else{
		targetValue = event.target.value;
	}
    const updatedCategory = {
      ...this.state.categoryForm
    };
    const updatedFormElement = {
      ...updatedCategory[inputIdentifier]
    };
    updatedFormElement.value = targetValue;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    if(inputIdentifier === 'parent'){
		updatedFormElement.elementConfig.selected = selected;
	}
    updatedFormElement.touched = true;
    updatedCategory[inputIdentifier] = updatedFormElement;
    this.setState({ categoryForm: updatedCategory }, () => {
			console.log('data value for category', this.state.categoryForm);
	});
  };
  cancelHandler() {
    this.props.history.push("/categories");
  }

  submitHandler(e) {
    e.preventDefault();
    let categoryObj = { _id: this.state.categoryId };
    for (let key in this.state.categoryForm) {
      categoryObj[key] = this.state.categoryForm[key].value;
    }
    //console.log('categoryObj submitHandler', categoryObj);
    axios.put("/category/updateCategory", categoryObj).then(result => {
      if (result.data.code == "200") {
        this.props.history.push("/categories");
      }
    });
  }

  componentDidMount() {
	  if(!this.state.requestStatus){
	   axios.all([
		 axios.get('/category/allCategories'),
		 axios.get('/category/viewCategory/'+ this.state.categoryId)
	   ])
	   .then(axios.spread((allCategories, pCategory) => {
			//all category data
			if (allCategories.data.code === 200) {
			  let oldState = {...this.state.categoryForm};         
				oldState.parent.elementConfig.options = allCategories.data.result.filter(
				cat => cat._id !== this.state.categoryId
			  );
			  this.setState({
				categoryForm: oldState           
			  });
			}			
			//parent category data
			 if (pCategory.data.code === 200) {
			  let categoryForm = {...this.state.categoryForm};
			  for (let key in categoryForm) {
				if (key === "parent") {
					categoryForm[key].value = pCategory.data.result[key]._id;
					categoryForm[key].elementConfig.selected = [pCategory.data.result[key]._id];
				} else {
				  categoryForm[key].value = pCategory.data.result[key];
				}
			  }
				console.log("categoryForm", categoryForm);
			  this.setState({ categoryForm: categoryForm, requestStatus: true  }, () => console.log('STATE', this.state));
			}
			
	   }))	  
	   .catch(error => {console.log("Edit Category ",error);this.setState({requestStatus: true})});  
   }
}

  render() {
    const formElementsArray = [];
    for (let key in this.state.categoryForm) {
      formElementsArray.push({
        id: key,
        config: this.state.categoryForm[key]
      });
    }
    let form = null;
    
    if(this.state.requestStatus){
		form = (
		  <Form noValidate>
			{formElementsArray.map(formElement => (
			  <Row key={formElement.id}>
				<Col xs="4" sm="12" key={formElement.id}>
				  <InputElement
					key={formElement.id}
					label={formElement.config.label}
					elementType={formElement.config.elementType}
					elementConfig={formElement.config.elementConfig}
					changed={event =>
					  this.inputChangedHandler(event, formElement.id)
					}
					value={formElement.config.value}                
				  />
				</Col>
			  </Row>
			))}
			<Row>
			  <Col xs="6" className="text-right">
				<Button
				  onClick={e => this.submitHandler(e)}
				  color="success"
				  className="px-4"
				>
				  Submit
				</Button>
			  </Col>
			  <Col xs="6">
				<Button
				  onClick={() => this.cancelHandler()}
				  color="primary"
				  className="px-4"
				>
				  Cancel
				</Button>
			  </Col>
			</Row>
		  </Form>
		);
	}
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <strong>Edit Category</strong>
              </CardHeader>
              <CardBody>{form}</CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
// ProjectItem.propTypes = {
//   project: PropTypes.object
// };
export default CategoryEdit;
