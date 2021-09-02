// const initialData = { storeName: "es" };
const initialData = null;

const coreReducer = (state = initialData, actions) => {
  let currentSprogress;
  switch (actions.type) {
    case "SUBT_TOTAL_PRODUCTS":
      return {
        ...state,
        totalProducts: (parseInt(state.totalProducts) - 1).toString(),
      };
    case "UPDATE_TOTAL_PRODUCTS_AA":
      return {
        ...state,
        totalProducts: (parseInt(state.totalProducts) + 1).toString(),
      };
    case "UP_POR_DOC_URL":
      currentSprogress = state.setupProgress;
      if (state.storeData.uploadedProofofResidence === "") {
        currentSprogress = (parseInt(currentSprogress) + 5).toString();
      }
      return {
        ...state,
        setupProgress: currentSprogress,
        storeData: {
          ...state.storeData,
          uploadedProofofResidence: actions.payload,
        },
      };
    case "UP_POC_DOC_URL":
      currentSprogress = state.setupProgress;
      if (state.storeData.uploadedProofOfCitizenship === "") {
        currentSprogress = (parseInt(currentSprogress) + 5).toString();
      }
      return {
        ...state,
        setupProgress: currentSprogress,
        storeData: {
          ...state.storeData,
          uploadedProofOfCitizenship: actions.payload,
        },
      };
    case "UP_BUS_DOC_URL":
      currentSprogress = state.setupProgress;
      if (state.storeData.uploadedBusinessRegistration === "") {
        currentSprogress = (parseInt(currentSprogress) + 5).toString();
      }
      return {
        ...state,
        setupProgress: currentSprogress,
        storeData: {
          ...state.storeData,
          uploadedBusinessRegistration: actions.payload,
        },
      };
    case "GET_STORE_DEFAULTS":
      return (state = actions.payload);

    case "SETUPPROGRESS":
      return {
        ...state,
        setupProgress: (
          parseInt(state.setupProgress) + actions.payload
        ).toString(),
      };
    default:
      return state;
  }
};

export default coreReducer;
