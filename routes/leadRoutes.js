const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const authMiddleware = require('../middleware/auth');
const rbacMiddleware = require('../middleware/rbac');

// All lead routes require authentication
router.use(authMiddleware);

router.post('/', rbacMiddleware(['sales_rep', 'manager']), leadController.createLead);
router.get('/', rbacMiddleware(['sales_rep', 'manager']), leadController.getLeads);
router.get('/:id', rbacMiddleware(['sales_rep', 'manager']), leadController.getLead);
router.put('/:id', rbacMiddleware(['sales_rep', 'manager']), leadController.updateLead);
router.delete('/:id', rbacMiddleware(['sales_rep', 'manager']), leadController.deleteLead);

module.exports = router;
