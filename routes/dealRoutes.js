const express = require('express');
const router = express.Router();
const dealController = require('../controllers/dealController');
const authMiddleware = require('../middleware/auth');
const rbacMiddleware = require('../middleware/rbac');

// All deal routes require authentication
router.use(authMiddleware);

router.post('/', rbacMiddleware(['sales_rep', 'manager']), dealController.createDeal);
router.get('/', rbacMiddleware(['sales_rep', 'manager']), dealController.getDeals);

// Manager approval/rejection operations
router.put('/:id/approve', rbacMiddleware(['manager']), dealController.approveDeal);
router.put('/:id/reject', rbacMiddleware(['manager']), dealController.rejectDeal);

module.exports = router;
