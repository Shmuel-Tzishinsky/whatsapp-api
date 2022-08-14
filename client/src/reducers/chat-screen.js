import * as types from "../constants/ActionTypes";

const initialState = {
  display: false,
};

const variable = (state = initialState, action) => {
  switch (action.type) {
    case types.DISPLAY:
      return { ...state, display: true };

    case types.NOT_DISPLAY:
      return { ...state, display: false };

    default:
      return state;
  }
};

export default variable;
