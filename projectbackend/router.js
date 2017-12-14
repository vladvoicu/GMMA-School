import express, { Router } from 'express';
// Import index action from movies controller
import { index } from './controllers/properties';
import { index1 } from './controllers/analyses';

// Initialize the router
const router = Router();

// Handle /properties.json route with index action from properties controller
router.route('/properties.json')
  .get(index);

router.route('/analyses.json')
  .get(index1);


export default router;