import React from "react";
import {NavLink} from "react-router-dom";
import Groot from "../styles/groot.jpg";
import AddIcon from "../styles/addicon.svg";
import CartIcon from "../styles/cart.svg";
import {Tooltip} from "antd";


class NavbarComponent extends React.Component {
	render(){
		return (
			<div>
			<nav className="navbar navbar-expand-sm navbar-light">
			  <NavLink className="navbar-brand" to="/" >
			    <img className="logo" src={Groot} alt="" />
			  </NavLink>
			  <ul className="navbar-nav ml-auto">
			  	<li className="nav-item">
			    	<NavLink to="/add">
			    	<Tooltip placement="bottomLeft" title={"Click to add your awesome farm/garden!"}>
			    	<img className="nav-link cart-icon" src={AddIcon} alt="" />
			    	</Tooltip>
			    	</NavLink>
			    </li>
			    <li className="nav-item">
			    	<Tooltip placement="bottomLeft" title={"Login/Signup and find your saved farms."}><NavLink to="/cart"><img className="nav-link cart-icon" src={CartIcon} alt="" /></NavLink></Tooltip>
			    </li>
			  </ul>
			</nav>
			</div>
		)
	}
};

export default NavbarComponent;