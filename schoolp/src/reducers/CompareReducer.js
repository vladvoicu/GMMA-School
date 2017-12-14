const INITIAL_STATE = {
  list: [],
  type: '',
  cancel: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'add_selected_compare_object':
      return { ...state, list: [...state.list, action.payload] };
    case 'clear_selected_compare_array':
      return INITIAL_STATE;
    case 'get_analysis_type':
      return { ...state, type: action.payload };
    case 'set_cancel':
      return { ...state, cancel: action.payload };
    default:
      return state;
   }
};
