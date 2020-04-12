import axios from "axios";

import { GET_CATEGORIES, CATEGORY_ERROR } from "./types";

// Get categories
export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/categories");

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
