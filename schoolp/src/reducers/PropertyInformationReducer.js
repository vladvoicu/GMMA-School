const INITIAL_STATE = {
  purchasePrice: '',
  downPayment: '',
  borrowedDownPayment: '',
  numberOfUnits: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'purchase_price_changed':
      return { ...state, purchasePrice: action.payload };
    case 'down_payment_changed':
      return { ...state, downPayment: action.payload };
    case 'borrowed_down_payment_changed':
      return { ...state, borrowedDownPayment: action.payload };
    case 'number_of_units_changed':
      return { ...state, numberOfUnits: action.payload };
    case 'clear_property_information':
      return INITIAL_STATE;
    default:
      return state;
   }
};
