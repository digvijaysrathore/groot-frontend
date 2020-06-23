import React from "react";
import firebase from "firebase";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {Result} from "antd";
import SnapImg from "../styles/snap.jpg";
import {NavLink} from "react-router-dom";

class Cart extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			isSignedIn: false,
			farm: [],
			fetched: false
		}
	}

	uiConfig = {
	    signInFlow: 'redirect',
	    signInSuccessUrl: '/',
	    signInOptions: [
	      firebase.auth.FacebookAuthProvider.PROVIDER_ID
	    ],
	    callbacks: {
	       signInSuccessWithAuthResult: () => {
	        console.log("Yes!")
	       }
	    }
	  };

	componentDidMount = () => {
	    var that = this
	    firebase.auth().onAuthStateChanged(function (user){
	      if(user){
	        that.setState({
	          isSignedIn: true
	        })
	      } else {
	        console.log("No!")
	      }
	    })

	    var tempFarms = []
        var tempArray = []
        var tempFarms = JSON.parse(localStorage.getItem("saved"))
        if(tempFarms === null)
        {
            this.setState({
                fetched: false
            })
        } else {
            tempArray = []
            for(var i = 0; i < tempFarms.length; i++){
                tempArray.push(tempFarms[i])
                this.setState({
                    fetched: true
                })
            }
        }
        this.setState({
            farms: tempArray,
        })
	  }

	  signout = () => {
	    var that = this
	    firebase.auth().signOut().then(function(){
	      that.setState({
	        isSignedIn: false
	      })
	    })
	  }

	 clear = () => {
        localStorage.removeItem("saved")
        window.location.replace("/")
    }

	render(){
		return (
			<div>
				{this.state.isSignedIn ?
					<div className="container">
					{this.state.fetched 
						?
						<section className="farms">
						<button className="btn" onClick={this.clear}>Clear Saved</button>
						<button className="btn btn-2" onClick={this.signout}>Sign Out</button>
						{this.state.farms.map((item, index) => {
							return (
								<div className="farm">
									<p>{item.owner} is growing {item.crop} at {item.address}</p>
									<a className="btn" target="_blank" href={"https://facebook.com/" + item.facebook}>Chat</a>
								</div>
							)
						})}
						</section>
						:
						<div className="text-center">
							<img src={SnapImg} className="snap-img" />
							<p className="snap-text">No farms saved. <NavLink to="/">Explore</NavLink></p>
						</div>
					}
					</div>
					:
					<div>
						<div>
				          <Result
				            status="403"
				            title="Login To Continue"
				            subTitle="Oho! You you need to log in to add your garden."
				            extra={<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>}
				          />
				        </div>
					</div>
				}
			</div>
		)
	}
};

export default Cart;