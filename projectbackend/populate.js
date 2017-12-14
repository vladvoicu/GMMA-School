import mongoose from 'mongoose';
import Analysis from './models/analyses';
import Property from './models/properties';

const properties = [
  {
    PropertyId: '1',
    Type: 'Residential',
    PurchaseDate: '12/03/1997',
    Name: 'Alex house',
    StreetName: 'mehadia',
    StreetNumber: '3',
    City: 'Timisoara',
    ZipCode: '325400',
    AnnualROI: '70',
    HealthValue: '65',
  },
  {
    PropertyId: '2',
    Type: 'Commercial',
    PurchaseDate: '12/04/2010',
    Name: 'Vlad store',
    StreetName: 'aradului',
    StreetNumber: '4',
    City: 'Timisoara',
    ZipCode: '325400',
    AnnualROI: '30',
    HealthValue: '30',
  },
  {
    PropertyId: '3',
    Type: 'Commercial',
    PurchaseDate: '05/04/2011',
    Name: 'Magazin',
    StreetName: 'Torontalului',
    StreetNumber: '44',
    City: 'Arad',
    ZipCode: '325400',
    AnnualROI: '50',
    HealthValue: '80',
  },
  {
    PropertyId: '4',
    Type: 'Residential',
    PurchaseDate: '01/23/2016',
    Name: 'House',
    StreetName: 'Seberinului',
    StreetNumber: '171',
    City: 'Caransebes',
    ZipCode: '325400',
    AnnualROI: '73',
    HealthValue: '90',
  },
];

const analyses = [
  {
    AnalysisId: '1',
    Type: 'Rent vs. Own',
    ForProperty: 'Alex house',
    Status: 'Complete',
    Date: '05/23/2018',
    PropertyId: '1',
    MonthlyCashflow: '45',
    InitialInvestment: '34',
    ROIfromCashflow: '33',
    ResaleValue: '32',
    MortgageBalanceatSale: '22',
    TotalProfit: '21',
    ROITotal: '11',
    ROIAnnually: '5',
    CapRate: '3',
    DCR: '3',
    Other: '4',
  },
  {
    AnalysisId: '2',
    Type: 'Rent vs. Own',
    ForProperty: 'Vlad store',
    Status: 'Complete',
    Date: '05/23/2016',
    PropertyId: '2',
    MonthlyCashflow: '45',
    InitialInvestment: '34',
    ROIfromCashflow: '33',
    ResaleValue: '32',
    MortgageBalanceatSale: '22',
    TotalProfit: '21',
    ROITotal: '11',
    ROIAnnually: '5',
    CapRate: '3',
    DCR: '3',
    Other: '4',
  },
  {
    AnalysisId: '3',
    Type: 'Cash Flow',
    ForProperty: 'House',
    Status: 'Complete',
    Date: '06/05/2018',
    PropertyId: '4',
    MonthlyCashflow: '45',
    InitialInvestment: '34',
    ROIfromCashflow: '33',
    ResaleValue: '32',
    MortgageBalanceatSale: '22',
    TotalProfit: '21',
    ROITotal: '11',
    ROIAnnually: '5',
    CapRate: '3',
    DCR: '3',
    Other: '4',
  },
  {
    AnalysisId: '4',
    Type: 'Cash Flow',
    ForProperty: 'Magazin',
    Status: 'Complete',
    Date: '08/05/2018',
    PropertyId: '3',
    MonthlyCashflow: '45',
    InitialInvestment: '34',
    ROIfromCashflow: '33',
    ResaleValue: '32',
    MortgageBalanceatSale: '22',
    TotalProfit: '21',
    ROITotal: '11',
    ROIAnnually: '5',
    CapRate: '3',
    DCR: '3',
    Other: '4',
  },
  {
    AnalysisId: '5',
    Type: 'Flip',
    ForProperty: 'Alex house',
    Status: 'Incomplete',
    Date: '10/05/2018',
    PropertyId: '1',
    MonthlyCashflow: '45',
    InitialInvestment: '34',
    ROIfromCashflow: '33',
    ResaleValue: '32',
    MortgageBalanceatSale: '22',
    TotalProfit: '21',
    ROITotal: '11',
    ROIAnnually: '5',
    CapRate: '3',
    DCR: '3',
    Other: '4',
  },
  {
    AnalysisId: '6',
    Type: 'Cash Flow',
    ForProperty: 'Vlad store',
    Status: 'Incomplete',
    Date: '23/05/2018',
    PropertyId: '2',
    MonthlyCashflow: '45',
    InitialInvestment: '34',
    ROIfromCashflow: '33',
    ResaleValue: '32',
    MortgageBalanceatSale: '22',
    TotalProfit: '21',
    ROITotal: '11',
    ROIAnnually: '5',
    CapRate: '3',
    DCR: '3',
    Other: '4',
  },
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost/properties');

// Go through each property
properties.map(data => {
  // Initialize a model with property data
  const property = new Property(data);
  // and save it into the database
  property.save();
});

analyses.map(data => {
  // Initialize a model with property data
  const analysis = new Analysis(data);
  // and save it into the database
  analysis.save();
});