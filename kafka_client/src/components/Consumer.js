import React,{Component} from 'react';
//import './App.css';
import socketIOClient from 'socket.io-client';
import {postTopic,set_Topic} from '../actions/messageActions';
import { Form, FormGroup,Container,Row } from 'reactstrap';
//import {getMessage,postMessage} from '../actions/messageActions';
//import PropTypes from 'prop-types';
//import InfiniteListExample from './InfiniteListExample';
import { connect } from 'react-redux';
//import ListView from './ListView';
import List from './List';
import { getTopics } from '../actions/topicActions';
import { setNickname } from '../actions/modalActions';


class Consumer extends Component{
  constructor(props) {
    super(props);
    //this.topicButton = this.topicButton.bind(this);
    this.state = {
      endpoint: "localhost:4001",
      messages: [],
      topic: '',
      topics:[],
    };
    this.onChange_topicname = this.onChange_topicname.bind(this)
  }

  onSubmit = e => {
    e.preventDefault();
    console.log('consumer on submit props topic:  '+this.props.topic);
    const newTopic = {
      topic:this.state.topic
    };
    console.log(newTopic);
    this.props.set_Topic(this.state.topic);
    this.props.postTopic(newTopic);
  };
  
  componentDidMount = () => {
    this.props.getTopics();
    const socket = socketIOClient(this.state.endpoint);
    socket.on('getmessage', (data) => {
        //console.log(data.data);
        this.setState({messages:[]});
        this.setState({messages:data.data});
    });
    
  }

  onChange_topicname = (e) => {
    e.preventDefault();
    this.setChange(e.target.value);
    //console.log(this.state.topic);
    };

    setChange(selected){
      this.setState({
        topic: selected
    });
    console.log(this.state.topic);
    };

  render(){
    const {messages} = this.state;
    //var topics = this.props.topics;
    return(
      <div>
        <center><h6 style={{color:'#fff',marginBottom:'25px'}}>Your Nickname is {this.props.nickname}</h6></center>
        
        <center><h4 style={{color:'#fff'}}>CHAT</h4></center>
    
        <Container>
        <Row>
        <Form style={{flex:1,marginTop:'-13px'}} onSubmit={this.onSubmit}>
        <hr/>
        <List items={messages} />
        <FormGroup>
        {/* <Button color="primary" size="sm" block onClick={this.topicButton_2()}>topicexample2</Button> */}
        </FormGroup>
        
        </Form>
        </Row>
        </Container>

        {/* <Button  color="primary" style={{marginRight:'20px'}} onClick={this.state.value='topic2'}>Oda3</Button> */}
        
        {/* <ul style={{marginTop:'20px'}}>
          {messages.map(message => (
          <p>{message}</p>
          ))}
        </ul> */}
      </div>
      
    );
  }
}

const mapStateToProps = ({messagesResponse,topicsResponse,modalResponse}) => {
  const { topic } = messagesResponse;
  const { topics } = topicsResponse;
  const { nickname } = modalResponse;
  console.log("CONSUMER TOPIC: "+topic);
  //console.log("consumer topic list: "+topics);
  //this.state.topic=topic;
  return {topic,topics,nickname};
};

export default connect(mapStateToProps, {postTopic,set_Topic,getTopics,setNickname})(Consumer);