const INITIAL_STATE = {
  firstname: '',
  lastname: '',
  email:'',
  confirmpassword:''
};

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case 'update_firstname':
      return { ...state, firstname: action.payload };
    case 'update_lastname':
      return { ...state, lastname: action.payload };
    case 'update_email':
      return { ...state, email: action.payload };
    case 'update_confirm_password':
      return { ...state, confirmpassword: action.payload };
    case 'clear_register':
      return INITIAL_STATE;
    default:
      return state;

  }
};
