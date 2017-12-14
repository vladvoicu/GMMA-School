import Analysis from '../models/analyses';
import moment from 'moment';


export const index1 = (req, res, next) => {
  // Find all properties and return json response
  Analysis.find().lean().exec((err, analyses) => res.json(
    // Iterate through each property
    { analyses: analyses.map(analysis => ({
      ...analysis,
    }))}
  ));
};