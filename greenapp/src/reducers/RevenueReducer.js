const INITIAL_STATE = {
  vacancy: '',
  rentalIncome: '',
  other: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'vacancy_changed':
    return { ...state, vacancy: action.payload };
  case 'rental_income_changed':
    return { ...state, rentalIncome: action.payload };
  case 'other_changed':
    return { ...state, other: action.payload };
  case 'clear_revenue':
    return INITIAL_STATE;
  default:
    return state;
   }
};
