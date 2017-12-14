import mongoose, { Schema } from 'mongoose';

// Define property schema
var propertySchema = new Schema({
  PropertyId: {
    type: Number,
    unique: true,
  },
  Type: String,
  PurchaseDate: String,
  Name: String,
  StreetName: String,
  StreetNumber: Number,
  City: String,
  ZipCode: String,
  AnnualROI: Number,
  HealthValue: Number,
});

// Export Mongoose model
export default mongoose.model('property', propertySchema);
