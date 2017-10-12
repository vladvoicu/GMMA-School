const INITIAL_STATE = {
  appreciation: '',
  sellAfter: '',
  rate: '',
  amortization: '',
  location: 'BC',
  amortizationType: 'R'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'appreciation_changed':
    return { ...state, appreciation: action.payload };
  case 'sell_after_changed':
    return { ...state, sellAfter: action.payload };
  case 'rate_changed':
    return { ...state, rate: action.payload };
  case 'amortization_changed':
    return { ...state, amortization: action.payload };
  case 'location_changed':
    return { ...state, location: action.payload };
  case 'amortization_type_changed':
    return { ...state, amortizationType: action.payload };
  case 'clear_calculations':
    return INITIAL_STATE;
  default:
    return state;
   }
};
