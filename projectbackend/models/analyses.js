import mongoose, { Schema } from 'mongoose';

// Define analysis schema
var analysisSchema = new Schema({
  AnalysisId: {
    type: Number,
    unique: true,
  },
  ForProperty: String,
  Status: String,
  Type: String,
  Date: String,
  PropertyId: Number,
  MonthlyCashflow: Number,
  InitialInvestment: Number,
  ROIfromCashflow: Number,
  ResaleValue: Number,
  MortgageBalanceatSale: Number,
  TotalProfit: Number,
  ROITotal: Number,
  ROIAnnually: Number,
  CapRate: Number,
  DCR: Number,
  Other: String,
});

// Export Mongoose model
export default mongoose.model('analysis', analysisSchema);