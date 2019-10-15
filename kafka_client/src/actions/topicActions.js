import axios from 'axios';
import { GET_TOPICS } from './types';

export const getTopics = () => dispatch => {
    axios.get('/listtopics').then(res =>   
        dispatch({
            type: GET_TOPICS,
            payload: res.data
        })
    );
};
