const express = require('express');
const router = express.Router();
const db = require('../config/db');

// @route   GET /api/users/:id
// @desc    Get user profile including attachment style and love language
router.get('/:id', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT user_id, name, email, created_at, attachment_style, love_language FROM users WHERE user_id = $1', [req.params.id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
