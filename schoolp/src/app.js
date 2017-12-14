import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import StartingPage from './components/StartingPage';
import Dashboard from './components/Dashboard/Dashboard';
import Portofolio from './components/Portofolio/Portofolio';
import Menu from './components/Menu/Menu';
import { StackNavigator, NavigationActions } from 'react-navigation';
import AssetDetailExpanded from './components/Portofolio/AssetDetailExpanded';
import AnalysisList from './components/Analysis/AnalysisList';
import IncompleteAnalysisList from './components/Analysis/incomplete/IncompleteAnalysisList';
import CompareList from './components/Analysis/compare/CompareList';
import CompareReports from './components/Analysis/compare/CompareReports';
import AnalysisReport from './components/Analysis/AnalysisReport';
import AddAnalysis from './components/Analysis/add/AddAnalysis';
import ConfirmAnalysis from './components/Analysis/add/ConfirmAnalysis';
import PropertyInformation from './components/Analysis/add/PropertyInformation';
import MonthlyRevenue from './components/Analysis/add/MonthlyRevenue';
import MonthlyExpenses from './components/Analysis/add/MonthlyExpenses';
import OtherCosts from './components/Analysis/add/OtherCosts';
import Calculations from './components/Analysis/add/Calculations';
import AnalysisDone from './components/Analysis/add/AnalysisDone';
import LoginForm from './components/Login/LoginForm';
import SignUpForm from './components/Login/SignUpForm';
import InvalidToken from './components/Login/InvalidToken';

  const AppNavigator = StackNavigator(
    {
      Start: { screen: StartingPage },
      Dashboard: {screen: Dashboard },
      Portfolio: {
        path: 'portfolio',
        screen: Portofolio
      },
      Login: {
        screen: LoginForm
      },
      SignUp: {
        screen: SignUpForm
      },
      InvalidToken: {
        screen: InvalidToken
      },
      AssetDetailExpanded: {
        path: 'portfolio/:id/:name',
        screen: AssetDetailExpanded
      },
      Analysis: {
        path: 'analysis',
        screen: AnalysisList
      },
      IncompleteAnalysis: {
        path: 'analysis/incomplete',
        screen: IncompleteAnalysisList
      },
      AnalysisReport: {
        path: 'analysis/:id',
        screen: AnalysisReport
      },
      Compare: {
        path: 'compare',
        screen: CompareList
      },
      CompareReports: {
        path: 'compare/:type',
        screen: CompareReports
      },
      AddAnalysis: {
        path: 'add',
        screen: AddAnalysis
      },
      ConfirmAnalysis: {
        path: 'add/:type',
        screen: ConfirmAnalysis
      },
      PropertyInformation: {
        path: 'add/:type/:name',
        screen: PropertyInformation
      },
      MonthlyRevenue: {
        path: 'add/:type/:name/:id',
        screen: MonthlyRevenue
      },
      MonthlyExpenses: {
        path: 'add/:type/:name/:id',
        screen: MonthlyExpenses
      },
      OtherCosts: {
        path: 'add/:type/:name/:id',
        screen: OtherCosts
      },
      Calculations: {
        path: 'add/:type/:name/:id',
        screen: Calculations
      },
      AnalysisDone: {
        path: 'add/:type/:name/:id',
        screen: AnalysisDone
      },
      Menu: {screen: Menu}
    }

  );
  AppNavigator.navigationOptions = () => ({
  header: null
});



export default function App() {
  return (
    <Provider store={createStore(reducers)}>
      <AppNavigator onNavigationStateChange={null}/>
    </Provider>
  );
}
