const express = require('express');
const { query } = require('../helpers/db.js');

const router = express.Router();

// Fetch all tasks
router.get('/', async (req, res) => {
    try {
        const result = await query('SELECT * FROM task');
        const rows = result.rows ? result.rows : [];
        res.status(200).json(rows);
    } catch (error) {
        res.statusMessage = error;
        res.status(500).json({ error: error });
    }
});

// Add a new task
router.post('/new', async (req, res) => {
    try {
        const result = await query(
            'INSERT INTO task (description) VALUES ($1) RETURNING *',
            [req.body.description]
        );
        res.status(200).json({ id: result.rows[0].id });
    } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({ error: error });
    }
});

// Delete a task
router.delete('/delete/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        await query('DELETE FROM task WHERE id = $1', [id]);
        res.status(200).json({ id: id });
    } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({ error: error });
    }
});

module.exports = { router };