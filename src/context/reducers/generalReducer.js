export const generalStates = {
  count: 0,
  isLoggedIn: true,
  isBusy: false,
  user: {}
}

export const generalReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1
      };
    case "RESET":
      return {
        ...state,
        count: 0
      };
    case "SET_VALUE":
      return {
        ...state,
        count: action.data
      };
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false
      };
    case "SETISBUSY":
      return {
        ...state,
        isBusy: true
      };
    case "RESETISBUSY":
      return {
        ...state,
        isBusy: false
      };
    case "SET_USER":
      return {
        ...state,
        user: action.data
      };
    default:
      throw new Error("Unexpected action");
  }
};
