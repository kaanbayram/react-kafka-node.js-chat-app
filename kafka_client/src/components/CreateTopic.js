import React,{Component} from 'react';
import {createTopic,set_Topic,postTopic} from '../actions/messageActions';
import {getTopics} from '../actions/topicActions';
import { Button, Form, FormGroup,Container,Row,Input,Label } from 'reactstrap';
import { connect } from 'react-redux';



class CreateTopic extends Component{
    constructor(props){
        super(props);
        this.state = {
            createtopic:'',
        };

    }

    onChange_createtopicname = (e) => {
        e.preventDefault();
        this.setState({
            createtopic: e.target.value
        });
        console.log(this.state.createtopic);
    };

    onSubmit = e => {
        e.preventDefault();
        console.log('Creating topic: '+this.createtopic);
        const newCreateTopic = {
          createtopic:this.state.createtopic
        };
        console.log(newCreateTopic);

        
        
        this.props.createTopic(newCreateTopic);
        this.props.getTopics(); 
        console.log(this.state.createtopic);
        
        // const sendtopic = this.state.createtopic;
        // const newTopic = {
        //     topic:sendtopic
        // };
        // console.log('create topic mew topic  '+newTopic.topic);
        // this.props.set_Topic(this.state.createtopic);
        // this.props.postTopic(newTopic);
        
      };

    render(){
        return(

            <div>
                <Container>
                    <Row>
                        <Form style={{flex:1}} onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="exampleName"><h4 style={{color:'#fff'}}>Create Topic</h4></Label>
                                <Input value={this.state.createtopic} type="text" name="topicname" id="exampleTopic" placeholder="Please Enter Topic Name" onChange={this.onChange_createtopicname} />
                            </FormGroup>
                            <Button type="submit" color="secondary" size="sm" block>Create</Button>
                        </Form>
                    </Row>
                </Container>
                <hr/>
            </div>

        );
    }

}


const mapStateToProps = ({messagesResponse}) => {
    return ;
};
  

export default connect(mapStateToProps, {createTopic,getTopics,set_Topic,postTopic})(CreateTopic);