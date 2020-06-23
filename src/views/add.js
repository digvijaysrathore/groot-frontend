import React from "react";
import { Steps, Result, Button, Typography } from 'antd';
import Upload from "../components/upload";
import firebase from "firebase";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import SubmitModal from "../components/modal";
import axios from "axios";
import {NavLink} from "react-router-dom";
import { CloseCircleOutlined } from '@ant-design/icons';

const { Paragraph, Text } = Typography;

const { Step } = Steps;

class Add extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isSignedIn: false,
      info: true,
      contact: false,
      current: 0,
      crop: "",
      address: "",
      district: "",
      facebook: "",
      farmkey: "",
      owner: "",
      email: "",
      success: false,
      error: false
    }
  }

  componentDidMount = () => {
    var that = this
    firebase.auth().onAuthStateChanged(function (user){
      if(user){
        that.setState({
          isSignedIn: true,
          farmkey: user.uid,
          owner: user.displayName,
          email: user.email
        })
      } else {
        console.log("No!")
      }
    })
  }

  handleInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
    console.log(this.state)
  }

  continueFirst = (e) => {
    e.preventDefault()
    this.setState({
      current: 1,
      info: false,
      contact: true
    })
  }

  backSecond = (e) => {
    e.preventDefault()
    this.setState({
      current: 0,
      info: true,
      contact: false
    })
  }

  onChange = current => {
    console.log('onChange:', current);
    this.setState({ current });
  };

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

  signout = () => {
    var that = this
    firebase.auth().signOut().then(function(){
      that.setState({
        isSignedIn: false
      })
    })
  }

  addFarm = (e) => {
    e.preventDefault()
    axios.post("https://grootback.herokuapp.com/addfarm", this.state)
    .then((response) => {
      this.setState({
        success: true,
        info: false,
        contact: false
      })
    }).catch((err) => {
      this.setState({
        error: true,
        contact: false,
        info: false
      })
    })
  }

  render() {
    const { current } = this.state;
    return (
      <div className="add">
      {this.state.isSignedIn ?
        <div>
        <h1 className="heading">Add Farm</h1>
      {this.state.info ?
        <div className="farm-form">
          <form className="text-left">
          <div class="form-group row">
            <label for="crop" className="label col-sm-2 col-form-label">Well, the crop you majorly grow.</label>
            <div class="col-sm-10">
              <input type="text" onChange={this.handleInput} className="form-control" id="crop" placeholder="Crop" />
            </div>
          </div>
          <div class="form-group row">
            <label for="district" className="label col-sm-2 col-form-label">What district your place falls into?</label>
            <div class="col-sm-10">
              <input type="text" onChange={this.handleInput} className="form-control" id="district" placeholder="District" />
            </div>
          </div>
          <div class="form-group row">
            <label for="address" className="label col-sm-2 col-form-label">Mention the address in a detailed format.</label>
            <div class="col-sm-10">
              <textarea type="text" onChange={this.handleInput} className="form-control" id="address" placeholder="Address" />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-10">
              <button type="click" className="button" onClick={this.continueFirst}>Continue</button>
            </div>
          </div>
        </form>
        </div>
        :
        <div>
        </div>
      }
      {this.state.contact ? 
        <div className="farm-form">
          <form className="text-left">
          <div className="form-group row">
            <label for="nick" className="label col-sm-2 col-form-label">*enter the username of a public Facebook page associated with your farm/garden/</label>
            <div class="col-sm-10">
              <input type="text" onChange={this.handleInput} className="form-control" id="facebook" placeholder="Facebook Username, ex. novadigvijay" />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-10">
              <button className="button" onClick={this.backSecond}>Back</button>
              <button className="button btn-margin" onClick={this.addFarm}>Add Farm</button>
            </div>
          </div>
        </form>
        </div>
        :
        <div>
        </div>
      }
      {this.state.error
        ?
        <Result
          status="error"
          title="Submission Failed"
          subTitle="Please check and modify the following information before resubmitting."
        >
          <div className="desc">
            <Paragraph>
              <Text
                strong
                style={{
                  fontSize: 16,
                }}
              >
                Your form must be having either of the following errors.
              </Text>
            </Paragraph>
            <Paragraph>
              <CloseCircleOutlined className="site-result-demo-error-icon" /> You might not have filled all the fields with relevant information.
            </Paragraph>
            <Paragraph>
              <CloseCircleOutlined className="site-result-demo-error-icon" /> A farm from your ID has already been submitted.
            </Paragraph>
          </div>
        </Result>
        :
        <div>
        </div>
      }
      {this.state.success ?
        <Result
          status="success"
          title="Successfully Added A New Farm!"
          subTitle="A new farm is added with your key. You can enter the district to check whether it is being indexed."
          extra={[
            <Button type="primary"><NavLink to="/">Explore</NavLink></Button>,
          ]}
        />
        :
        <div className="steps">
          <Steps
            type="navigation"
            size="small"
            current={current}
            onChange={this.onChange}
            className="site-navigation-steps"
          >
            <Step
              title="Farm Info"
              description="Let people know about what you grow, district, etc."
            />
            <Step
              title="Contact Info"
              description="Add facebook page associated with farm."
            />
          </Steps>
        </div>
      }
      </div>
        :
        <div>
          <Result
            status="403"
            title="Login To Continue"
            subTitle="Oho! You you need to log in to add your garden."
            extra={<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>}
          />
        </div>
      }
      </div>
    );
  }
}

export default Add;