import React,{Component} from 'react';
import { Button, Form, FormGroup, Label, Input,Container,Row } from 'reactstrap';
import PropTypes from 'prop-types';
import {postMessage,set_Topic} from '../actions/messageActions';
import { setNickname } from '../actions/modalActions';
import { connect } from 'react-redux';


class Producer extends Component{
  constructor() {
    super();
    this.state = {
      topic:"",
      message:"",
      nickname:'',
    };
  }

  static propTypes = {
    postMessage: PropTypes.func.isRequired
  };
  
  onSubmit = e => {
    e.preventDefault();
    const newMessage = {
      topic:this.props.topic,
      message:this.props.nickname+': '+this.state.message
    };
    console.log(newMessage);
    this.props.postMessage(newMessage);
    //alert("SUCCESS!");
  };

topicexample1_button = () => {
  this.setState({topic: 'topicexample1'});
};

topicexample2_button = () => {
  this.setState({topic: 'topicexample2'});
};

onChange_topic = (e) => {
    this.setState({
        topic: e.target.value,
    });
};
onChange_message = (e) => {
    this.setState({
        message: e.target.value
    });
};

  componentDidMount = () => {

  };
  render(){
    
    return(
      <div>
        
        <Container>
        <Row>
        <Form style={{flex:1}} onSubmit={this.onSubmit}>
        {/* <FormGroup>
        <Button color="primary" size="sm" block onClick={this.topicexample1_button}>topicexample1</Button>
        </FormGroup>
        <FormGroup>
        <Button color="primary" size="sm" block onClick={this.topicexample2_button}>topicexample2</Button>
        </FormGroup> */}
        {/* <FormGroup>
          <Label for="exampleTopic">Topic Name</Label>
          <Input type="text" name="topicname" id="topicName" placeholder="Please Enter Topic Name" onChange={this.onChange_topic} />
        </FormGroup> */}
        <FormGroup>
          <Label for="exampleMessage"><h5 style={{color:'#fff'}}>Message</h5></Label>
          <Input type="textarea" name="message" id="exampleMessage" placeholder="Enter the Message"  onChange={this.onChange_message} style={{height:'90px'}} />

        </FormGroup>
        
        <Button color="secondary" size="sm" block>Send</Button>
      </Form>
      </Row>
      </Container>
      
      </div>
    );
  }
}

const mapStateToProps = ({ messagesResponse,modalResponse }) => {
  const { topic } = messagesResponse;
  const { nickname } = modalResponse;
  //console.log('PRODUCER: '+topic);
  console.log("PRODUCER's nickname: "+nickname);
  return {
    topic,
    nickname
  };
};



export default connect(mapStateToProps, { postMessage,set_Topic,setNickname })(Producer);