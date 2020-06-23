import React from "react";
import {NavLink} from "react-router-dom";
import {notification} from "antd";
import axios from "axios";

class Main extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			allFarms: [],
			saved: [],
			fetching: true,
			district: "",
			loading: false,
			snap: false
		}
	}

	search = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
			loading: true
		})
		
		axios.get(`${process.env.REACT_APP_BACKEND}/getdistrict/${this.state.district}`)
		.then((response) => {
			console.log("Ok!")
			this.setState({
				allFarms: response.data,
				loading: false
			})
		}).catch((err) => {
			this.setState({
				snap: true
			})
		})
	}

	componentDidMount = () => {
		this.openNotification();
		axios.get(`${process.env.REACT_APP_BACKEND}/getfarms`)
		.then((response) => {
			this.setState({
				allFarms: response.data,
				fetching: false
			})
		})
		.catch((err) => {
			console.log("Oops!")
		})
	}

	openNotification = () => {
	  notification.open({
	  	placement: "bottomRight",
	  	duration: 30,
	    message: 'Explore Farms & Add Yours!',
	    description:
	      'Select your city and explore farms/gardens near you. Connect and share organic veges.',
	  });
	};

	save = (e) => {
        console.log(e)
        this.state.saved.push(e)
        console.log(this.state.saved)
        localStorage.setItem("saved", JSON.stringify(this.state.saved))
        console.log(JSON.parse(localStorage.getItem("saved")))
    }

	render(){
		return (
			<div className="main container">
			<section className="select-district container">
			<div className="main-div">
				<input onChange={this.search} placeholder="Search District..." id="district" className="main-search" />
			</div>
			</section>
			{this.state.loading ? <div className="loading">Loading...</div> : <div></div>}
			{this.state.fetching ? <div className="loading">Loading...</div> :
				<section className="farms">
				{this.state.allFarms.map((item, index) => {
					return (
						<div className="farm">
							<p>{item.owner} is growing {item.crop} at {item.address}</p>
							<a className="btn" target="_blank" href={"https://facebook.com/" + item.facebook}>Chat</a>
							<button onClick={()=>this.save(item)} className="btn btn-2">Save Farm</button>
						</div>
					)
				})}
				</section>
			}
			</div>
		)
	}
};

export default Main;