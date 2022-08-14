import axios from "axios";
import * as types from "../constants/ActionTypes";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: types.AUTH_START,
      });

      const res = await axios.post(`${serverUrl}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("userToken", res.data.access_token);
      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("userID", res.data.id);

      return dispatch({
        type: types.AUTH_SUCCESS,
        data: res.data,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: types.AUTH_FAILURE,
        resErr: error.response?.data?.error_msg || error.response?.data?.error || error.message || "התרחשה שגיאה",
      });
    }
  };

export const signUp = (data, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: types.AUTH_START,
    });

    await axios.post(`${serverUrl}/api/auth/register`, {
      ...data,
    });

    navigate("/login");

    return dispatch({
      type: types.AUTH_RESET,
    });
  } catch (error) {
    console.log(error);
    return dispatch({
      type: types.AUTH_FAILURE,
      resErr: error.response?.data?.error_msg || error.response?.data?.error || error.message || "התרחשה שגיאה",
    });
  }
};

export const logOut = (navigate) => {};

export const sendResetPassword = (email, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: types.AUTH_START,
    });

    const res = await axios.post(`${serverUrl}/api/users/send-reset-password`, {
      data: { email },
    });

    navigate("/login");
    return dispatch({
      type: types.AUTH_SUCCESS,
      data: res.data,
    });
  } catch (error) {
    console.log(error);
    return dispatch({
      type: types.AUTH_FAILURE,
      resErr: error.response?.data?.error || error.message,
    });
  }
};

export const changePassword = (obj, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: types.AUTH_START,
    });

    const res = await axios.post(`${serverUrl}/api/users/change-password`, {
      data: obj,
    });

    localStorage.setItem("userToken", res.data.token);
    localStorage.setItem("userEmail", res.data.email);

    return dispatch({
      type: types.AUTH_SUCCESS,
      data: res.data,
    });
  } catch (error) {
    console.log(error);
    return dispatch({
      type: types.AUTH_FAILURE,
      resErr: error.response?.data?.error || error.message,
    });
  }
};
