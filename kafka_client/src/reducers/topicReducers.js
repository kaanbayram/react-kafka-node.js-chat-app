import { GET_TOPICS } from '../actions/types';

const initialState = {
    topics:[]
};

export default function(state = initialState, action){
    switch (action.type) {

        case GET_TOPICS:
            return{...state, topics:action.payload};

        default:
            return state;
    }

}