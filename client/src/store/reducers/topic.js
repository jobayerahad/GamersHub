import { ADD_TOPIC, GET_TOPICS, GET_TOPIC, DELETE_TOPIC, TOPIC_ERROR } from "../actions/types";

const initialState = {
  topics: [],
  topic: null,
  loading: true,
  error: {},
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case ADD_TOPIC:
      return {
        ...state,
        topics: [...state.topics, payload],
        loading: false,
      };

    case GET_TOPICS:
      return {
        ...state,
        topics: payload,
        loading: false,
      };

    case GET_TOPIC:
      return {
        ...state,
        topic: payload,
        loading: false,
      };

    case DELETE_TOPIC:
      return {
        ...state,
        topics: state.topics.filter((topic) => topic._id !== payload),
        loading: false,
      };

    case TOPIC_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
