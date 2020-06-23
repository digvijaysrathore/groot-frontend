import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Main from "./views/main";
import Add from "./views/add";
import Cart from "./views/cart";
import NavbarComponent from "./components/navbar";
import LinearProgress from '@material-ui/core/LinearProgress';
import "./styles/main.css";
import "./styles/add.css";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import 'antd/dist/antd.css';
 
const config = {
  apiKey: "AIzaSyDqH6x96En6N-8jxITHTgud_ShlVuCc9cE",
  authDomain: "groot-dee2e.firebaseapp.com",
  databaseURL: "https://groot-dee2e.firebaseio.com",
  projectId: "groot-dee2e",
  storageBucket: "groot-dee2e.appspot.com",
  messagingSenderId: "1027144172148",
  appId: "1:1027144172148:web:c7818112e2883fc6640721"
};
firebase.initializeApp(config);

const uiConfig = {
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

class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			isSignedIn: false,
			user: "",
			processed: false
		}
	}

	componentDidMount = () => {
		var that = this
		firebase.auth().onAuthStateChanged(function(user){
			if(user){
				that.setState({
					isSignedIn: true,
					user: user,
					processed: true
				})
			} else {
				that.setState({
					processed: true
				})
			}
		})
	}

  render(){
    return (
      <div>
      {this.state.processed ? 
      	<div>
	     <BrowserRouter>
	     <NavbarComponent />
	      	<Route path="/" exact user={this.state.user} component={Main} />
          <Route path="/add" component={Add} />
          <Route path="/cart" component={Cart} />
	     </BrowserRouter>
	     </div>
      	:
      	<div className="loading text-center">
      		<LinearProgress />
      	</div>
      }
      </div>
    )
  }
};

export default App;