const INITIAL_STATE = {
  token: '',
  exist: 0
};

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case 'update_token':
      return { ...state, token: action.payload };
    case 'update_token_exist':
      return { ...state, exist: action.payload };
    case 'clear_token':
      return INITIAL_STATE;
    default:
      return state;

  }
};
