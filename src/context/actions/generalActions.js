export const generalActions = (props) => {
  return {
    increment: () => {
      props.dispatch({ type: "INCREMENT" });
    },
    decrement: () => {
      props.dispatch({ type: "DECREMENT" });
    },
    reset: () => {
      props.dispatch({ type: "RESET" });
    },
    setValue: (data) => {
      // props.dispatch({ type: "SET_VALUE", data });
      externSetValue(props, data);
    },
    login: () => {
      props.dispatch({ type: "LOGIN" });
    },
    logout: () => {
      props.dispatch({ type: "LOGOUT" });
    },
    setisbusy: () => {
      props.dispatch({ type: "SETISBUSY" });
    },
    resetisbusy: () => {
      props.dispatch({ type: "RESETISBUSY" });
    },
  }
}

function externSetValue(props, data) {
  props.dispatch({ type: "SET_VALUE", data });
}
