const INITIAL_STATE = {
  residentials: [],
  commercials: []
};

const defaultObject = {
  PropertyId: -1,
  Type: 'Type',
  Name: 'Name',
  StreetName: 'Street Name',
  StreetNumber: 'Street Number',
  City: 'City',
  ZipCode: 'Zip Code',
  HealthValue: 0,
  AnnualROI: 0,
  PurchaseDate: '08/28/2017',
  MortgageOwn: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'get_commercials':
      return { ...state, commercials: action.payload };
    case 'get_residentials':
      return { ...state, residentials: action.payload };
      case 'add_to_residentials':
        const residential = Object.assign({}, defaultObject, action.payload);
        return Object.assign({}, state, {
          residentials: [
            ...state.residentials,
            residential
          ]
        });
      case 'add_to_commercials':
        const commercial = Object.assign({}, defaultObject, action.payload);
        return Object.assign({}, state, {
          commercials: [
            ...state.commercials,
            commercial
          ]
        });
      case 'update_residentials_array':
        const updatedResidentials = state.residentials;
        updatedResidentials[action.index] = Object.assign({}, state.residentials[action.index], action.payload);
        return { ...state, residentials: updatedResidentials };
      case 'update_commercials_array':
        const updatedCommercials = state.commercials;
        updatedCommercials[action.index] = Object.assign({}, state.commercials[action.index], action.payload);
        return { ...state, commercials: updatedCommercials };
    default:
      return state;
  }
};
