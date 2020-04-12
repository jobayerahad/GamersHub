import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from "./types";
import setAuthToken from "../../utils/setAuthToken";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Login User
export const login = (emailOrUsername, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ emailOrUsername, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());

    dispatch(setAlert("Logged In!", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) errors.forEach((error) => dispatch(setAlert(error.msg, "error")));

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Register User
export const register = ({
  firstname,
  lastname,
  username,
  email,
  password,
  confirmPassword,
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ firstname, lastname, username, email, password, confirmPassword });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());

    dispatch(setAlert("Registration Successful!", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) errors.forEach((error) => dispatch(setAlert(error.msg, "error")));

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch(setAlert("Logout Successfully!", "success", 3500));
  dispatch({ type: LOGOUT });
};
