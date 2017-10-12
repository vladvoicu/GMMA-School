const INITIAL_STATE = {
  property: '',
  name: '',
  address: '',
  city: '',
  province: '',
  postalCode: '',
  ownership: '0',
  object: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'property_chosen':
      return { ...state, property: action.payload };
    case 'name_changed':
      return { ...state, name: action.payload };
    case 'address_changed':
      return { ...state, address: action.payload };
    case 'city_changed':
      return { ...state, city: action.payload };
    case 'province_changed':
      return { ...state, province: action.payload };
    case 'postal_code_changed':
      return { ...state, postalCode: action.payload };
      case 'ownership_changed':
        return { ...state, ownership: action.payload };
      case 'set_property_object':
        return { ...state, object: action.payload };
      case 'clear_modal':
        return INITIAL_STATE;
    default:
      return state;
   }
};
