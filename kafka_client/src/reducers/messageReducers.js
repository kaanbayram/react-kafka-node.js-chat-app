import { POST_MESSAGE,POST_TOPIC, SET_TOPIC, CREATE_TOPIC } from '../actions/types';

const initialState = {
    messages: [],
    topic:'',
    createtopic:'',
};

export default function(state = initialState, action){
    switch (action.type) {
        // case GET_MESSAGE:
        //     return{
        //         ...state,
        //         messages: action.payload
        //     };
        case POST_MESSAGE:
            return{
                ...state
            };
        case POST_TOPIC:
            return{
                ...state
            };
        case CREATE_TOPIC:
            return{
                ...state
            };    
        case SET_TOPIC:
            return {...state, topic:action.payload };

        default:
            return state;
    }

}