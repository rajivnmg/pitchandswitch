import React, {Component}
from 'react';
import Style from './main.css';
import { BrowserRouter as Router, Switch, Route, Link }
from 'react-router-dom';
import icon from '../images/lockicon.png';
import axios from 'axios';
import jquery from 'jquery'
const menuHide = {
    display: 'none'
}

class categoryMenu extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            category: [
                //~ {
                    //~ name: 'Electronics',
                    //~ icon: {icon},
                    //~ link: '/',
                    //~ isSubnav: true,
                    //~ children: [
                        //~ {
                            //~ name: "Kids Clothing",
                            //~ link: "/",
                            //~ isSubnav1: true,
                            //~ submenu1: [
                                //~ {
                                    //~ name: "United Colors of Benetton",
                                    //~ link: "/"
                                //~ },
                                //~ {
                                    //~ name: "The Children's Place",
                                    //~ link: "/"
                                //~ }
                            //~ ]
                        //~ },
                        //~ {
                            //~ name: "Boy's Clothing",
                            //~ link: "/",
                            //~ isSubnav1: false,
                            //~ submenu1: []
                        //~ }
                    //~ ]

                //~ },
                //~ {
                    //~ name: 'TVs & Appliances',
                    //~ icon: './assets/images/flags/uk.png',
                    //~ link: '/',
                    //~ isSubnav: false,
                    //~ submenu: []
                //~ },
                //~ {
                    //~ name: 'Men',
                    //~ icon: './assets/images/flags/uk.png',
                    //~ link: '/',
                    //~ isSubnav: false,
                    //~ submenu: []
                //~ },
                //~ {
                    //~ name: 'Baby & Kids',
                    //~ icon: './assets/images/flags/uk.png',
                    //~ link: '/',
                    //~ isSubnav: false,
                    //~ submenu: []

                //~ }
            ]
        }
    }
    
    componentDidMount(){		
	 axios.get('/category/allCategories').then(result => {
      if(result.data.code === 200){		  
		  //console.log("allCategories",result)
        this.setState({
          category: result.data.result,           
        });
		
				
jquery(".category span").click(function(){	

jquery(this).next().slideToggle();

jquery(this).toggleClass("active");	



	});
		
		jquery("<span class='plusminus'></span>" ).insertAfter(".submenu > a");
		jquery("<span class='plusminus2'></span>" ).insertAfter(".submenu2 > a");
		
jquery(".plusminus").click(function(){	   
if (jquery(this).next(".drop2").is(':visible')) 

{
jquery(this).next(".drop2").slideUp(500);
jquery(".plusminus").removeClass("active");	

} 

else{
jquery(".drop2").slideUp();
jquery(".plusminus ").removeClass("active");
jquery(this).next(".drop2").slideDown();
jquery(this).addClass("active");	 
		
}

});

jquery(".plusminus2").click(function(){	   
if (jquery(this).next(".drop3").is(':visible')) 

{
jquery(this).next(".drop3").slideUp(500);
jquery(".plusminus2").removeClass("active");	

} 

else{
jquery(".drop3").slideUp();
jquery(".plusminus2 ").removeClass("active");
jquery(this).next(".drop3").slideDown();
jquery(this).addClass("active");	 
		
}

});
		
      }
    })
   .catch((error) => {
    console.log('error', error)
      if(error.code === 401) {
        this.props.history.push("/login");
      }
    });
		
	}
	
    render() {
        return(
		<div className="category"><span className="cats">Category</span>
			<div className="dropDown">
				<ul>
					{
						this.state.category.map((slide, index) => {
							return(
								<li key={slide.value} className={ (slide.children && slide.children.length)? "submenu" : null }> 
								<img src={icon} style= { menuHide } alt={icon} /> <a href={'/search-listing/'+slide._id}>{slide.title}</a>
								{ 
									(slide.children && slide.children.length) ? 
									<ul className="drop2">
									{
										slide.children.map((subMenu, i) => {
											return (
												<li  key={subMenu.value}  className={ (subMenu.children && subMenu.children.length)? "submenu" : null }><a href={'/search-listing/'+subMenu._id}>{subMenu.title}</a>
												{ (subMenu.children && subMenu.children.length)? 
												<ul className="drop3">
												{
													subMenu.children.map((subMenu, i) => {
													return (
														<li key={subMenu.value}><a href={'/search-listing/'+subMenu._id}>{subMenu.title}</a></li>
													)
													})

												}
												</ul>    
												: null }
											</li>
										)
										})

									}
									</ul>
									: null
								 }

								</li>
							)
						})
					
					}
				</ul>
			</div>
		</div>
                                    )
            }
        }
        export default categoryMenu;
