//
// Analyses actions
//

export const getCompleteAnalyses = (completeAnalyses) => {
  return {
    type: 'get_complete_analyses',
    payload: completeAnalyses
  };
};

export const getIncompleteAnalyses = (incompleteAnalyses) => {
  return {
    type: 'get_incomplete_analyses',
    payload: incompleteAnalyses
  };
};

export const addToComplete = (analysis) => {
  return {
    type: 'add_to_complete',
    payload: analysis
  };
};

export const addToIncomplete = (analysis) => {
  return {
    type: 'add_to_incomplete',
    payload: analysis
  };
};

export const updateCompleteAnalyses = (origValue, newValue) => {
  return {
    type: 'update_complete_analyses',
    payload: newValue,
    origValue
  };
};

export const updateIncompleteAnalyses = (origValue, newValue) => {
  return {
    type: 'update_incomplete_analyses',
    payload: newValue,
    origValue
  };
};

export const deleteIncompleteAnalysis = (index) => {
  return {
    type: 'delete_incomplete_analysis',
    payload: index
  };
};

//
// Property information actions
//

export const purchasePriceChanged = (text) => {
  return {
    type: 'purchase_price_changed',
    payload: text
  };
};

export const downPaymentChanged = (text) => {
  return {
    type: 'down_payment_changed',
    payload: text
  };
};

export const borrowedDownPaymentChanged = (text) => {
  return {
    type: 'borrowed_down_payment_changed',
    payload: text
  };
};

export const numberOfUnitsChanged = (text) => {
  return {
    type: 'number_of_units_changed',
    payload: text
  };
};

export const clearPropertyInformation = () => {
  return {
    type: 'clear_property_information'
  };
};

//
// Revenue actions
//

export const vacancyChanged = (text) => {
  return {
    type: 'vacancy_changed',
    payload: text
  };
};

export const rentalIncomeChanged = (text) => {
  return {
    type: 'rental_income_changed',
    payload: text
  };
};

export const otherChanged = (text) => {
  return {
    type: 'other_changed',
    payload: text
  };
};

export const clearRevenue = () => {
  return {
    type: 'clear_revenue'
  };
};

//
// Expenses actions
//

export const taxesChanged = (text) => {
  return {
    type: 'taxes_changed',
    payload: text
  };
};

export const condoChanged = (text) => {
  return {
    type: 'condo_changed',
    payload: text
  };
};

export const insuranceChanged = (text) => {
  return {
    type: 'insurance_changed',
    payload: text
  };
};

export const utilitiesChanged = (text) => {
  return {
    type: 'utilities_changed',
    payload: text
  };
};

export const maintenanceFundChanged = (text) => {
  return {
    type: 'maintenance_fund_changed',
    payload: text
  };
};

export const cableChanged = (text) => {
  return {
    type: 'cable_changed',
    payload: text
  };
};

export const expensesBorrowedDownPaymentChanged = (text) => {
  return {
    type: 'expenses_borrowed_down_payment_changed',
    payload: text
  };
};

export const expensesOtherChanged = (text) => {
  return {
    type: 'expenses_other_changed',
    payload: text
  };
};

export const propertyManagementChanged = (text) => {
  return {
    type: 'property_management_changed',
    payload: text
  };
};

export const clearExpenses = () => {
  return {
    type: 'clear_expenses'
  };
};

//
// Other costs actions
//

export const repairsChanged = (text) => {
  return {
    type: 'repairs_changed',
    payload: text
  };
};

export const costsRentalIncomeChanged = (text) => {
  return {
    type: 'costs_rental_income_changed',
    payload: text
  };
};

export const setApply = (bool) => {
  return {
    type: 'set_apply',
    payload: bool
  };
};

export const clearOtherCosts = () => {
  return {
    type: 'clear_other_costs'
  };
};

//
// Calculation actions
//

export const appreciationChanged = (text) => {
  return {
    type: 'appreciation_changed',
    payload: text
  };
};

export const sellAfterChanged = (text) => {
  return {
    type: 'sell_after_changed',
    payload: text
  };
};

export const rateChanged = (text) => {
  return {
    type: 'rate_changed',
    payload: text
  };
};

export const amortizationChanged = (text) => {
  return {
    type: 'amortization_changed',
    payload: text
  };
};

export const locationChanged = (text) => {
  return {
    type: 'location_changed',
    payload: text
  };
};

export const amortizationTypeChanged = (text) => {
  return {
    type: 'amortization_type_changed',
    payload: text
  };
};

export const clearCalculations = () => {
  return {
    type: 'clear_calculations'
  };
};

//
// Properties actions
//

export const getCommercials = (commercials) => {
  return {
    type: 'get_commercials',
    payload: commercials
  };
};

export const getResidentials = (residentials) => {
  return {
    type: 'get_residentials',
    payload: residentials
  };
};

export const addToResidentials = (object) => {
  return {
    type: 'add_to_residentials',
    payload: object
  };
};

export const addToCommercials = (object) => {
  return {
    type: 'add_to_commercials',
    payload: object
  };
};

export const updateResidentialsArray = (object, index) => {
  return {
    type: 'update_residentials_array',
    payload: object,
    index
  };
};

export const updateCommercialsArray = (object, index) => {
  return {
    type: 'update_commercials_array',
    payload: object,
    index
  };
};

//
// Compare actions
//

export const addSelectedCompareObject = (id) => {
  return {
    type: 'add_selected_compare_object',
    payload: id
  };
};

export const clearSelectedCompareArray = () => {
  return {
    type: 'clear_selected_compare_array'
  };
};

export const getAnalysisType = (analysisType) => {
  return {
    type: 'get_analysis_type',
    payload: analysisType
  };
};

export const setCancel = (bool) => {
  return {
    type: 'set_cancel',
    payload: bool
  };
};

//
//  Add property for analysis actions
//

export const propertyChosen = (text) => {
  return {
    type: 'property_chosen',
    payload: text
  };
};

export const nameChanged = (text) => {
  return {
    type: 'name_changed',
    payload: text
  };
};

export const addressChanged = (text) => {
  return {
    type: 'address_changed',
    payload: text
  };
};

export const cityChanged = (text) => {
  return {
    type: 'city_changed',
    payload: text
  };
};

export const provinceChanged = (text) => {
  return {
    type: 'province_changed',
    payload: text
  };
};

export const postalCodeChanged = (text) => {
  return {
    type: 'postal_code_changed',
    payload: text
  };
};

export const ownershipChanged = (text) => {
  return {
    type: 'ownership_changed',
    payload: text
  };
};

export const clearModal = () => {
  return {
    type: 'clear_modal'
  };
};

export const setPropertyObject = (object) => {
  return {
    type: 'set_property_object',
    payload: object
  };
};

//
// Login
//

export const updateUsername = (username) => {
  return {
    type: 'update_username',
    payload: username
  };
};

export const updatePassword = (password) => {
  return {
    type: 'update_password',
    payload: password
  };
};

export const clearLogin = () => {
  return {
    type: 'clear_login'
  };
};

//
// Sign Up
//

export const updateFirstName = (firstname) => {
  return {
    type: 'update_firstname',
    payload: firstname
  };
};

export const updateLastName = (lastname) => {
  return {
    type: 'update_lastname',
    payload: lastname
  };
};

export const updateEmail = (email) => {
  return {
    type: 'update_email',
    payload: email
  };
};

export const clearRegister = () => {
  return {
    type: 'clear_register'
  };
};

export const updateConfirmPassword = (confirmpassword) => {
  return {
    type: 'update_confirm_password',
    payload: confirmpassword
  };
};

//
// Token
//

export const updateToken = (token) => {
  return {
    type: 'update_token',
    payload: token
  };
};

export const updateTokenExist = (bool) => {
  return {
    type: 'update_token_exist',
    payload: bool
  };
};

export const clearToken = () => {
  return {
    type: 'clear_token'
  };
};
