const initialState = {
  tokenizer: {
    accessToken: '',
  }

};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      return {
        ...state,
        tokenizer: {
          ...state.tokenizer,
          accessToken: action.payload.token,
        },
      };

    case 'CLEAR_TOKEN':
      return {
        initialState,
      };
      
    default:
      break;
  }
  return state;
};

export default tokenReducer;
