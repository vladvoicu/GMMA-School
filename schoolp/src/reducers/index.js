import { combineReducers } from 'redux';
import AnalysesReducer from './AnalysesReducer';
import AssetsReducer from './AssetsReducer';
import CompareReducer from './CompareReducer';
import PropertyModalReducer from './PropertyModalReducer';
import PropertyInformationReducer from './PropertyInformationReducer';
import RevenueReducer from './RevenueReducer';
import ExpensesReducer from './ExpensesReducer';
import OtherCostsReducer from './OtherCostsReducer';
import CalculationsReducer from './CalculationsReducer';
import LoginReducer from './LoginReducer';
import SignUpReducer from './SignUpReducer';
import TokenReducer from './TokenReducer';

export default combineReducers({
  analyses: AnalysesReducer,
  assets: AssetsReducer,
  compareArray: CompareReducer,
  property: PropertyModalReducer,
  propertyInformation: PropertyInformationReducer,
  revenue: RevenueReducer,
  expenses: ExpensesReducer,
  costs: OtherCostsReducer,
  calculations: CalculationsReducer,
  login: LoginReducer,
  signup: SignUpReducer,
  token: TokenReducer
 });
