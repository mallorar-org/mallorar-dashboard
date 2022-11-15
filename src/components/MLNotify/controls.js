import store from "../../store/store";

export function notify(
  type = 1,
  head = "Success",
  image = "",
  message = "This operation was successful",
) {
  store.dispatch({
    type: "SET_NOTIFY",
    payload: {
      type: type,
      head: head,
      image: image,
      message: message,
      open: true,
    },
  });
}
export function close() {
  store.dispatch({ type: "CLOSE_NOTIFY" });
}
