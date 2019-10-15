import axios from 'axios';
import { POST_MESSAGE,POST_TOPIC,SET_TOPIC,CREATE_TOPIC} from './types';
import {getTopics} from './topicActions';


// export const getMessage = () => dispatch =>{
//     axios
//         .get('/api/categories')
//         .then( res => 
//             dispatch({
//                 type:GET_CATEGORI,
//                 payload: res.data
//             })
//         ) 
// };
export const postTopic = topic => dispatch => {
    axios
        .post('/changetopic', topic)
        .then(res => 
            dispatch({
                type: POST_TOPIC,
                payload: res.data
            })
            )    
};

export const postMessage = message => dispatch => {
    axios
        .post('/send', message)
        .then(res => 
            dispatch({
                type: POST_MESSAGE,
                payload: res.data
            })
            )    
};

export const set_Topic = (topic) => {
    return (dispatch) => {
      dispatch({
      type: SET_TOPIC,
      payload: topic
    });
  };
};

export const createTopic = createtopic => dispatch => {
    axios
        .post('/createtopic', createtopic)
        .then(res => 
            dispatch({
                type: CREATE_TOPIC,
                payload: res.data
            })
            )
           
    dispatch(getTopics());   
};

