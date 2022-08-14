import * as types from "../constants/ActionTypes";

export const display = () => {
  return async (dispatch) => {
    dispatch({ type: types.DISPLAY });
  };
};

export const notDisplay = () => {
  return async (dispatch) => {
    dispatch({ type: types.NOT_DISPLAY });
  };
};
