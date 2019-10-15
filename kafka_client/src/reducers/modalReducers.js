import { SET_VIEW,SET_NICKNAME,SET_VIEW2 } from '../actions/types';


const initialState = {
    show:false,
    nickname:'',
};

export default function(state = initialState, action){
    switch (action.type) {

        case SET_VIEW:
            return { ...state,show : true};

        case SET_VIEW2:
            return{...state,show:false};
        

        case SET_NICKNAME:
            return { ...state,nickname:action.payload};

        default:
            return state;
    }

}