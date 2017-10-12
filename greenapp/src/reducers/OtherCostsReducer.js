const INITIAL_STATE = {
  apply: false,
  repairs: '',
  rentalIncome: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'repairs_changed':
    return { ...state, repairs: action.payload };
  case 'costs_rental_income_changed':
    return { ...state, rentalIncome: action.payload };
  case 'set_apply':
    return { ...state, apply: action.payload };
  case 'clear_other_costs':
    return INITIAL_STATE;
  default:
    return state;
   }
};
