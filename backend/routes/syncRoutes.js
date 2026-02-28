const express = require('express');
const router = express.Router();
const db = require('../config/db');
const aiEngine = require('../services/aiEngine');

// @route   POST /api/sync/checkin
// @desc    Submit daily mood check-in and calculate sync
router.post('/checkin', async (req, res) => {
    const { user_id, relationship_id, mood_score, stress_level, energy_level, need_today, private_note } = req.body;

    try {
        // 1. Insert daily check-in
        const newCheckin = await db.query(
            `INSERT INTO DAILY_CHECKINS (user_id, relationship_id, mood_score, stress_level, energy_level, need_today, private_note, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *`,
            [user_id, relationship_id, mood_score, stress_level, energy_level, need_today, private_note]
        );

        // 2. Trigger Emotional AI Analysis module to calculate fresh sync score
        // Example base score of 80 used for context since we aren't querying history yet
        const aiResult = aiEngine.processSyncUpdate({ mood_score, stress_level, energy_level }, 80);

        res.status(201).json({
            message: 'Check-in recorded',
            checkin: newCheckin.rows[0],
            sync_update_pending: false,
            ai_analysis: aiResult
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
