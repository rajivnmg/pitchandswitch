import React, {Component}
from 'react';
import Style from './main.css';
import { BrowserRouter as Router, Switch, Route, Link }
from 'react-router-dom';
import icon from '../images/lockicon.png';
const menuHide = {
    display: 'none'
}

class categoryMenu extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            category: [
                {
                    name: 'Electronics',
                    icon: {icon},
                    link: '/',
                    isSubnav: true,
                    submenu: [
                        {
                            name: "Kids Clothing",
                            link: "/",
                            isSubnav1: true,
                            submenu1: [
                                {
                                    name: "United Colors of Benetton",
                                    link: "/"
                                },
                                {
                                    name: "The Children's Place",
                                    link: "/"
                                },
                                {
                                    name: "US Polo ",
                                    link: "/"
                                },
                                {
                                    name: "Flying Machine",
                                    link: "/"
                                },
                                {
                                    name: "Crocs",
                                    link: "/"
                                },
                                {
                                    name: "Barbie ",
                                    link: "/"
                                },
                                {
                                    name: "Disney",
                                    link: "/"
                                }
                            ]
                        },
                        {
                            name: "Boy's Clothing",
                            link: "/",
                            isSubnav1: false,
                            submenu1: []
                        },
                        {
                            name: "Ethnic Wear ",
                            link: "/",
                            isSubnav1: false,
                            submenu1: []
                        },
                        {
                            name: "Girl's Clothing",
                            link: "/",
                            isSubnav1: false,
                            submenu1: []
                        },
                        {
                            name: "Dresses & Skirts",
                            link: "/",
                            isSubnav1: false,
                            submenu1: []
                        },
                        {
                            name: "Ethnic Wears ",
                            link: "/",
                            isSubnav1: false,
                            submenu1: []
                        },
                        {
                            name: "Polos & T-Shirts",
                            link: "/",
                            isSubnav1: false,
                            submenu1: []
                        }
                    ]

                },
                {
                    name: 'TVs & Appliances',
                    icon: './assets/images/flags/uk.png',
                    link: '/',
                    isSubnav: false,
                    submenu: []
                },
                {
                    name: 'Men',
                    icon: './assets/images/flags/uk.png',
                    link: '/',
                    isSubnav: false,
                    submenu: []
                },
                {
                    name: 'Baby & Kids',
                    icon: './assets/images/flags/uk.png',
                    link: '/',
                    isSubnav: false,
                    submenu: []

                },
                {
                    name: 'Women',
                    icon: './assets/images/flags/uk.png',
                    link: '/',
                    isSubnav: false,
                    submenu: []
                },
                {
                    name: 'Home & Furniture',
                    icon: './assets/images/flags/uk.png',
                    link: '/',
                    submenu: []
                },
                {
                    name: 'Books',
                    icon: './assets/images/flags/uk.png',
                    link: '/',
                    isSubnav: false,
                    submenu: []
                },
                {
                    name: 'Sports & Games',
                    icon: './assets/images/flags/uk.png',
                    link: '/',
                    isSubnav: false,
                    submenu: []
                },
                {
                    name: 'More',
                    icon: './assets/images/flags/uk.png',
                    link: '/',
                    isSubnav: false,
                    submenu: []
                }
            ]
        }
    }

    render() {
        return(
                    <div className="category">Category
                        <div className="dropDown">
                            <ul>
                                {this.state.category.map((slide, index) => {
                                                return(<li key={slide.name} className={ slide.isSubnav == true ? "submenu" : null }> 
                                                    <img src={icon} style= { menuHide } alt={icon} /> <a href="#">{slide.name}</a>
                                                    { slide.isSubnav == true ? 
                                                    <ul>
                                                        {
                                                         slide.submenu.map((subMenu, i) => {
                                                         return (
                                                                                        <li  key={subMenu.name}  className={ subMenu.isSubnav1 == true ? "submenu" : null }><a href="#">{subMenu.name}</a>
                                                                                { subMenu.isSubnav1 == true ? 
                                                                                            <ul>
                                                                                                {
                                                                                                                            subMenu.submenu1.map((subMenu, i) => {
                                                                                                                                return (
                                                                                                                                        <li  key={subMenu.name}><a href="#">{subMenu.name}</a></li>
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
                                                    : null }
                                
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
