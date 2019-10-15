import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form,FormGroup,Input } from 'reactstrap';
import {setView,setNickname,setView2} from '../actions/modalActions';
import { connect } from 'react-redux';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      closeAll: false,
      nickname:'',
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      nickname:undefined
    }));
    //this.props.setNickname('');
    //this.props.setView2();
  }


  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }

  onChange = (e) => {
    this.setState({
        nickname: e.target.value,
    });
    console.log(this.state.nickname);
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.nickname);
    if (this.state.nickname!==undefined) {
      this.toggleNested();
      this.props.setNickname(this.state.nickname);
      this.props.setView();
    }
    if (this.state.nickname===undefined) {
      alert('Please Fulfill Nickname Area');
    }
    
  };
  componentDidMount(){
    
  };




  render() {
    return (
      <div>
        <Button onClick={this.toggle} style={{background:'#3939c6'}}>Open Chat & Change Nickname</Button>
        
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Please Enter Nickname</ModalHeader>
          <ModalBody>
          <Form style={{flex:1}} onSubmit={this.onSubmit}>
            <FormGroup>
            <Input type="text" name="nickname" id="nickname" placeholder="Please Enter Nickname" onChange={this.onChange}/>
            </FormGroup>
            
            <Button color="success" style={{width:'34.19vw'}} block>SEND</Button>
            
          </Form>
            
            <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
              <ModalHeader>SUCCESS</ModalHeader>
              <ModalBody>Thanks!!</ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggleNested} style={{width:'17.095vw'}}>Change Nickname</Button>{' '}
                <Button color="secondary" onClick={this.toggleAll} style={{width:'17.095vw'}}>All Done</Button>
              </ModalFooter>
            </Modal>
          </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
            <Button color="secondary" onClick={this.toggle} style={{width:'34.19vw'}}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({modalResponse}) => {
  const { show } = modalResponse;
  return {show};
};

export default connect(mapStateToProps, {setView,setNickname,setView2})(ModalExample);