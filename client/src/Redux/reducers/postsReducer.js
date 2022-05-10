const initState = {
  posts: [],
  error: null,
  loading: null,
};

const postsReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "FETCH_REQUEST":
    case "DELETE_REQUEST":
      return { ...state, loading: true };

    case "FETCH_REQUEST_SUCCESS":
      return { ...state, loading: false, posts: payload };

    case "FETCH_SINGLE_SUCCESS":
      return { ...state, loading: false, posts: payload };

    case "CREATE_POST":
      return { ...state, loading: false, posts: [payload, ...state.posts] };

    case "DELETE_POST":
      return {
        ...state,
        loading: false,
        posts: state.posts.filter(post => post._id === payload._id),
      };

    case "FETCH_REQUEST_FAIL":
    case "DELETE_REQUEST_FAIL":
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};

export default postsReducer;
