const INITIAL_STATE = {
  taxes: '',
  condo: '',
  insurance: '',
  utilities: '',
  maintenanceFund: '',
  cable: '',
  borrowedDownPayment: '',
  other: '',
  propertyManagement: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'taxes_changed':
      return { ...state, taxes: action.payload };
    case 'condo_changed':
      return { ...state, condo: action.payload };
    case 'insurance_changed':
      return { ...state, insurance: action.payload };
    case 'utilities_changed':
      return { ...state, utilities: action.payload };
    case 'maintenance_fund_changed':
      return { ...state, maintenanceFund: action.payload };
    case 'cable_changed':
      return { ...state, cable: action.payload };
    case 'expenses_borrowed_down_payment_changed':
      return { ...state, borrowedDownPayment: action.payload };
    case 'expenses_other_changed':
      return { ...state, other: action.payload };
    case 'property_management_changed':
      return { ...state, propertyManagement: action.payload };
    case 'clear_expenses':
      return INITIAL_STATE;
    default:
      return state;
   }
};
