const INITIAL_STATE = {
  username: '',
  password: ''
};

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case 'update_username':
      return { ...state, username: action.payload };
    case 'update_password':
      return { ...state, password: action.payload };
    case 'clear_login':
      return INITIAL_STATE;
    default:
      return state;

  }
};
