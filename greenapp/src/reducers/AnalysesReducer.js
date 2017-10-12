const INITIAL_STATE = {
  complete: [],
  incomplete: []
};

const defaultObject = {
  PropertyId: -1,
  AnalysisId: -1,
  Status: 'Status',
  Type: 'Type',
  ForProperty: 'Property Name',
  Date: '08/28/2017'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'get_complete_analyses':
      return { ...state, complete: action.payload };
    case 'get_incomplete_analyses':
      return { ...state, incomplete: action.payload };
      case 'add_to_complete':
        const completeAnalysis = Object.assign({}, defaultObject, action.payload);
        return Object.assign({}, state, {
          complete: [
            ...state.complete,
            completeAnalysis
          ]
        });
      case 'add_to_incomplete':
        const incompleteAnalysis = Object.assign({}, defaultObject, action.payload);
        return Object.assign({}, state, {
          incomplete: [
            ...state.incomplete,
            incompleteAnalysis
          ]
        });
      case 'update_complete_analyses':
        const updatedComplete = state.complete;
        for (const analysis of updatedComplete) {
          if (analysis.ForProperty === action.origValue) {
            analysis.ForProperty = action.payload;
          }
        }
        return { ...state, complete: updatedComplete };
      case 'update_incomplete_analyses':
        const updatedIncomplete = state.incomplete;
        for (const analysis of updatedIncomplete) {
          if (analysis.ForProperty === action.origValue) {
            analysis.ForProperty = action.payload;
          }
        }
        return { ...state, incomplete: updatedIncomplete };
      case 'delete_incomplete_analysis':
        return {
          ...state,
          incomplete: [
            ...state.incomplete.slice(0, action.payload),
            ...state.incomplete.slice(action.payload + 1)
          ]
        };
    default:
      return state;
  }
};
