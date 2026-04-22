const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fiber_management'
});

// CONNECT
db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// GET DATA
app.get('/jalur', (req, res) => {
    db.query("SELECT * FROM jalur", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// ADD DATA
app.post('/jalur', (req, res) => {
    const { nama_jalur, odp, core, pot, teknisi, status } = req.body;

    const sql = "INSERT INTO jalur (nama_jalur, odp, core, pot, teknisi, status) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [nama_jalur, odp, core, pot, teknisi, status], (err, result) => {
        if (err) throw err;
        res.send("Data berhasil ditambahkan");
    });
});

// DELETE
app.delete('/jalur/:id', (req, res) => {
    db.query("DELETE FROM jalur WHERE id=?", [req.params.id], (err) => {
        if (err) throw err;
        res.send("Data dihapus");
    });
});

app.listen(3000, () => {
    console.log("Server jalan di http://localhost:3000");
});
