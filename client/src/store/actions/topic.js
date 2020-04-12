import axios from "axios";

import { setAlert } from "./alert";
import { ADD_TOPIC, GET_TOPICS, GET_TOPIC, DELETE_TOPIC, TOPIC_ERROR } from "./types";

// Add topic
export const addTopic = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/topics", formData, config);

    dispatch({
      type: ADD_TOPIC,
      payload: res.data,
    });

    dispatch(setAlert("New Topic Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) errors.forEach((error) => dispatch(setAlert(error.msg, "error")));

    dispatch({
      type: TOPIC_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get topics
export const getTopics = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/topics");

    dispatch({
      type: GET_TOPICS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) errors.forEach((error) => dispatch(setAlert(error.msg, "error")));

    dispatch({
      type: TOPIC_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get topic
export const getTopic = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/topics/${id}`);

    dispatch({
      type: GET_TOPIC,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) errors.forEach((error) => dispatch(setAlert(error.msg, "error")));

    dispatch({
      type: TOPIC_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete topic
export const deleteTopic = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/topics/${id}`);

    dispatch({
      type: DELETE_TOPIC,
      payload: id,
    });

    dispatch(setAlert("Topic Removed", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) errors.forEach((error) => dispatch(setAlert(error.msg, "error")));

    dispatch({
      type: TOPIC_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
