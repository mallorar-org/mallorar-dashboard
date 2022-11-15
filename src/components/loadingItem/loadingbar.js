import { setLoadingBarProgress } from "../../store/actions/actions";
import store from "../../store/store";

export const beginTheBar = () => {
  // let i = Math.floor(Math.random() * 40) + 10;
  store.dispatch(setLoadingBarProgress(100));
};

export const endTheBar = () => {
  // setTimeout(() => store.dispatch(setoadingBarProgress(100)), 5000);
  store.dispatch(setLoadingBarProgress(100));
};
