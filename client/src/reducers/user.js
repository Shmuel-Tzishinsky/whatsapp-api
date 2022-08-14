import * as types from "../constants/ActionTypes";

const initialState = {
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  userName: "" || localStorage.getItem("userName"),
  userID: "" || localStorage.getItem("userID"),
  userToken: "" || localStorage.getItem("userToken"),
  error: null,
};

const variable = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_START:
      return {
        status: "loading",
        userName: "",
        userID: "",
        userToken: "",
        error: null,
      };

    case types.AUTH_SUCCESS:
      return {
        status: "succeeded",
        userName: action.data.mail,
        userID: action.data.id,
        userToken: action.data.access_token,
        error: null,
      };

    case types.AUTH_RESET:
      return {
        status: "idle",
        userName: "",
        userID: "",
        userToken: "",
        error: null,
      };

    case types.AUTH_FAILURE:
      return {
        status: "failed",
        userName: "",
        userID: "",
        userToken: "",
        error: action.resErr,
      };

    default:
      return state;
  }
};

export default variable;
