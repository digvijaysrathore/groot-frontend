import React from "react";
import { Modal, Button } from 'antd';
import axios from "axios";

class SubmitModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      nick: this.props.info.nick,
      crop: this.props.info.crop,
      district: this.props.info.district,
      address: this.props.info.address,
      owner: this.props.info.owner,
      userkey: this.props.info.userkey,
      email: this.props.info.email,
      facebook: "",
      success: false
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    axios.post("https://grootback.herokuapp.com/addfarm", this.state)
    .then((response) => {
      console.log(response)
      this.setState({
        success: true
      })
    })
    .catch((err) => {
      console.log(err)
    })
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleInputThird = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Submit
        </Button>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >

        {this.state.success ? <p>Cool</p> : <p>Ooops!</p>}

        <div className="p-3 text-center">
        <h5>Add Your Facebook Username To Submit Farm.</h5>
        <input type="text" onChange={this.handleInputThird} className="form-control" id="facebook" placeholder="@novadigvijay" />
        </div>

        </Modal>
      </div>
    );
  }
}

export default SubmitModal;