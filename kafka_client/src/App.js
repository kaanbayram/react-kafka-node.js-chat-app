import React,{Component} from 'react';
//import './App.css';
//import socketIOClient from 'socket.io-client'
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar';
import Home from './components/Home';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = { show: false };
  }
  handleClick() {
    this.setState({
      show: !this.state.show
    });
  }

  render(){
    return(
      <div>
        <Provider store={store}>
          <Navbar />
          <Home />
         
        </Provider>
      </div>
    );
  }
}


