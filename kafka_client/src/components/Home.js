import React,{Component} from 'react';
import CreateTopic from './CreateTopic';
import ConnectTopic from './ConnectTopic';
import Modal from './Modal';
import ToggleDisplay from 'react-toggle-display';
import Consumer from './Consumer';
import Producer from './Producer';
import { Container, Row, Col,Button } from 'reactstrap';
import { setView,setView2 } from '../actions/modalActions';
import { connect } from 'react-redux';
import PrivateChat from './PrivateChat';
import CreatePrivateTopic from './CreatePrivateTopic';

class Home extends Component{
    // constructor(props){
    //     super(props);
    //     //this.state = { show: false };
    // }
    handleClick() {
      //this.props.setView();
      this.props.setView2();
        // this.setState({
        //   show: !this.state.show
        // });
    }
      
    render(){
        return(
            <div>
                 <Container><Row style={{padding:'30px',marginTop:'-55px'}}>
            <Col xs="12"><center><Modal /></center></Col>
            {/* <Col xs="6"></Col> */}
            </Row>
            
          <ToggleDisplay show={this.props.show}>
          
            <Row>
              <Col xs="6">
              <div style={styles.box}>
                  <div style={{padding:'30px'}}>
                  
                  <Consumer />
                <Producer />
                </div>
                </div>
              </Col>
              <Col xs="6">
                <div style={styles.box2}>
                  <div style={{padding:'30px'}}>
                  <center><Button onClick={ () => this.handleClick() } style={styles.closebutton}>Close Chat</Button></center>
                  <br/>
                  <hr/>
                <CreateTopic />
                <ConnectTopic />
                
                <CreatePrivateTopic />
                <PrivateChat />
                </div>
                </div>
              </Col>
            </Row> 
            </ToggleDisplay> 
          </Container>
            </div>
        );
    }
}

const styles={
    box:{
      display: 'box',
      //marginLeft:'36px',
      //height:'500px',
      height: '90vh',
      width: '615px',
      //width: '34vw',
      //width:'450px',
      //position: 'fixed',
      //backgroundColor:'#90b6d5',
      //marginTop:'-15px',
      overflow: 'auto',
      //borderRadius: '50px',
      marginTop:'-20px',
      marginLeft:'-45px',
  
      background:'linear-gradient(45deg,#ff3300,#3939c6)',
    },
    box2:{
      display: 'box',
    //marginLeft:'36px',
    //height:'500px',
    height: '90vh',
    width: '615px',
    //width: '34vw',
    //width:'450px',
    //position: 'fixed',
    //backgroundColor:'#90b6d5',
    //marginTop:'-15px',
    overflow: 'auto',
    //borderRadius: '50px',
    marginTop:'-20px',
    //marginRight:'20px',
  
    background:'linear-gradient(-45deg,#ff3300,#3939c6)',
    },
    closebutton:{
      height:'45px',
      width:'120px',
      background:'#3939c6',
      marginBottom:'-5px'
    }
    
  }
  
  const mapStateToProps = ({ modalResponse }) => {
    const { show } = modalResponse
    return {
      show
    };
  };

export default connect(mapStateToProps, { setView,setView2 })(Home);