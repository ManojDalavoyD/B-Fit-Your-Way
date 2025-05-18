app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  console.log('Received:', req.body); // Add this for debug

  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).send('Database error');
    }
    res.send('User registered successfully!');
  });
});
