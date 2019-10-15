import { SET_VIEW,SET_NICKNAME, SET_VIEW2 } from './types';

export const setView = () => {
    return {
      type: SET_VIEW,  
  };
};

export const setNickname = (nickname) => {
  return {
    type: SET_NICKNAME,
    payload: nickname
  };
};

export const setView2 = () => {
  return {
    type: SET_VIEW2,
  };
};