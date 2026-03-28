const { pool } = require('../config/db');
const logActivity = require('../utils/activityLogger');

exports.createDeal = async (req, res) => {
  const { lead_id, amount, stage } = req.body;
  
  try {
    const newDeal = await pool.query(
      `INSERT INTO deals (lead_id, amount, stage, created_by) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [lead_id, amount, stage || 'Proposed', req.user.id]
    );

    const deal = newDeal.rows[0];
    await logActivity(req.user.id, 'created_deal', 'deal', deal.id);

    res.json(deal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getDeals = async (req, res) => {
  try {
    const deals = await pool.query('SELECT * FROM deals ORDER BY created_at DESC');
    res.json(deals.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.approveDeal = async (req, res) => {
  try {
    let deal = await pool.query('SELECT * FROM deals WHERE id = $1', [req.params.id]);
    if (deal.rows.length === 0) return res.status(404).json({ msg: 'Deal not found' });

    const comments = req.body.comments || 'Approved by manager';

    await pool.query(
      'INSERT INTO deal_approvals (deal_id, approved_by, status, comments, approved_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)',
      [req.params.id, req.user.id, 'Approved', comments]
    );

    const updatedDeal = await pool.query(
      'UPDATE deals SET stage = $1 WHERE id = $2 RETURNING *',
      ['Closed Won', req.params.id]
    );

    await logActivity(req.user.id, 'approved_deal', 'deal', req.params.id);

    res.json(updatedDeal.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.rejectDeal = async (req, res) => {
  try {
    let deal = await pool.query('SELECT * FROM deals WHERE id = $1', [req.params.id]);
    if (deal.rows.length === 0) return res.status(404).json({ msg: 'Deal not found' });

    const comments = req.body.comments || 'Rejected by manager';

    await pool.query(
      'INSERT INTO deal_approvals (deal_id, approved_by, status, comments, approved_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)',
      [req.params.id, req.user.id, 'Rejected', comments]
    );

    const updatedDeal = await pool.query(
      'UPDATE deals SET stage = $1 WHERE id = $2 RETURNING *',
      ['Closed Lost', req.params.id]
    );

    await logActivity(req.user.id, 'rejected_deal', 'deal', req.params.id);

    res.json(updatedDeal.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
