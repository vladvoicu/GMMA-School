import Property from '../models/properties';
import moment from 'moment';


export const index = (req, res, next) => {
  // Find all properties and return json response
  Property.find().lean().exec((err, properties) => res.json(
    // Iterate through each property
    { properties: properties.map(property => ({
      ...property,
    }))}
  ));
};