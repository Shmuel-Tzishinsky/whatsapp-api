import * as types from "../constants/ActionTypes";

export const getContactsData = () => {
  return async (dispatch) => {
    dispatch({ type: types.GET_CONTACTS_DATA });
  };
};

export const openImg = (base) => {
  return async (dispatch) => {
    dispatch({ type: types.TOGGEL_OPEN_MEDIA, payload: base });
  };
};

export const setContactsData = (data) => {
  return async (dispatch) => {
    dispatch({
      type: types.SET_CONTACTS_DATA,
      payload: {
        ...data,
      },
    });
  };
};
