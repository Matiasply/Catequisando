const express = require('express');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);


app.listen(3000, function() {
    console.log('Server is running on port 3000');
})