const { pool } = require('../config/db');
const logActivity = require('../utils/activityLogger');

exports.createLead = async (req, res) => {
  const { title, company, contact_name, contact_email, contact_phone, estimated_value, assigned_to } = req.body;
  
  try {
    const newLead = await pool.query(
      `INSERT INTO leads (title, company, contact_name, contact_email, contact_phone, estimated_value, created_by, assigned_to) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, company, contact_name, contact_email, contact_phone, estimated_value, req.user.id, assigned_to || req.user.id]
    );

    const lead = newLead.rows[0];
    await logActivity(req.user.id, 'created_lead', 'lead', lead.id);

    res.json(lead);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getLeads = async (req, res) => {
  try {
    let leads;
    if (req.user.role === 'admin' || req.user.role === 'manager') {
      leads = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
    } else {
      leads = await pool.query('SELECT * FROM leads WHERE assigned_to = $1 ORDER BY created_at DESC', [req.user.id]);
    }
    res.json(leads.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getLead = async (req, res) => {
  try {
    const lead = await pool.query('SELECT * FROM leads WHERE id = $1', [req.params.id]);

    if (lead.rows.length === 0) {
      return res.status(404).json({ msg: 'Lead not found' });
    }

    if (req.user.role !== 'admin' && req.user.role !== 'manager' && lead.rows[0].assigned_to !== req.user.id) {
       return res.status(403).json({ msg: 'Access denied' });
    }

    res.json(lead.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateLead = async (req, res) => {
  const { title, company, contact_name, contact_email, contact_phone, estimated_value, status, assigned_to } = req.body;

  try {
    let lead = await pool.query('SELECT * FROM leads WHERE id = $1', [req.params.id]);
    if (lead.rows.length === 0) return res.status(404).json({ msg: 'Lead not found' });

    if (req.user.role !== 'admin' && req.user.role !== 'manager' && lead.rows[0].assigned_to !== req.user.id) {
       return res.status(403).json({ msg: 'Access denied' });
    }

    const updatedLead = await pool.query(
      `UPDATE leads SET 
        title = COALESCE($1, title), 
        company = COALESCE($2, company), 
        contact_name = COALESCE($3, contact_name), 
        contact_email = COALESCE($4, contact_email), 
        contact_phone = COALESCE($5, contact_phone), 
        estimated_value = COALESCE($6, estimated_value), 
        status = COALESCE($7, status), 
        assigned_to = COALESCE($8, assigned_to) 
       WHERE id = $9 RETURNING *`,
      [title, company, contact_name, contact_email, contact_phone, estimated_value, status, assigned_to, req.params.id]
    );

    await logActivity(req.user.id, 'updated_lead', 'lead', req.params.id);

    res.json(updatedLead.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteLead = async (req, res) => {
  try {
    let lead = await pool.query('SELECT * FROM leads WHERE id = $1', [req.params.id]);
    if (lead.rows.length === 0) return res.status(404).json({ msg: 'Lead not found' });

    if (req.user.role !== 'admin' && req.user.role !== 'manager' && lead.rows[0].assigned_to !== req.user.id) {
       return res.status(403).json({ msg: 'Access denied' });
    }

    await pool.query('DELETE FROM leads WHERE id = $1', [req.params.id]);
    await logActivity(req.user.id, 'deleted_lead', 'lead', req.params.id);

    res.json({ msg: 'Lead removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
