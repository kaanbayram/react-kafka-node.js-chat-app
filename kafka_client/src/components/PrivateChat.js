import React,{Component} from 'react';
import {postTopic,set_Topic} from '../actions/messageActions';
import { Button, Form, FormGroup,Container,Row,Input,Label } from 'reactstrap';
import { connect } from 'react-redux';
import { getTopics } from '../actions/topicActions';
import { setNickname } from '../actions/modalActions';
import socketIOClient from 'socket.io-client';

class PrivateChat extends Component{

    constructor(props) {
        super(props);
        this.state = {
          topic: '',
          topics:[],
          endpoint: "localhost:4001"
        };
        this.onChange_topicname = this.onChange_topicname.bind(this);
    }
    
      onSubmit = e => {
        e.preventDefault();
        console.log('priv_chat on submit props topic:  '+this.props.topic);
        const newTopic = {
          topic:this.state.topic
        };
        //console.log(newTopic);
        this.props.set_Topic(this.state.topic);
        this.props.postTopic(newTopic);
      };
      
      componentDidMount = () => {
        //this.props.getTopics();
        const socket = socketIOClient(this.state.endpoint);
        socket.on('sendlist', (data) => {
          //console.log(data.data);
          this.setState({topics:data.data});
          //console.log(data.data);
        });
      }
    
      onChange_topicname = (e) => {
        e.preventDefault();
        this.setChange(e.target.value);
        };
    
        setChange(selected){
          this.setState({
            topic: selected
        });
        //console.log(this.state.topic);
        };
        
        render(){
        var nickname = this.props.nickname;
        var topics=[];
        
        //topics = this.props.topics;
        topics = this.state.topics;
        var privatetopics=[];
        //console.log('render içi topics : '+topics);
        for( var i = 0; i < topics.length; i++){ 
          if ( topics[i].includes("priv") === true && topics[i].includes(nickname) === true ) {
            //topics.splice(i, 1);
          
            privatetopics.push(topics[i]);
          }
        }
        

        //console.log(topics);
        
        return(
          <div>
            {/* <center><h4 style={{color:'#fff'}}>CHAT</h4></center> */}
            
            <Container>
            <Row>
            <Form style={{flex:1,marginTop:'-13px'}} onSubmit={this.onSubmit}>
            <FormGroup>
            <Label for="exampleName"><h4 style={{color:'#fff'}}>Private Topic</h4></Label>
            <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple onChange={this.onChange_topicname} style={{height:'150px'}}>
               
                {privatetopics.map((topic) => (
                  <option value={topic}>{(topic.replace('priv_','')).replace('_',' and ')}</option>
                ))}
                
              </Input>
            </FormGroup>
            <Button type="submit" color="secondary" size="sm" block>Connect</Button>
            </Form>
            </Row>
            </Container>
            
            <hr/>
          </div>
          
        );
    }
}

const mapStateToProps = ({topicsResponse,modalResponse}) => {
    const { topics } = topicsResponse;
    const { nickname } = modalResponse;
    //console.log("consumer topic list: "+topics);
    //console.log('mapstatetoprops '+topics);
    return {
        topics,
        nickname
    };
};

export default connect(mapStateToProps, {postTopic,set_Topic,getTopics,setNickname})(PrivateChat);