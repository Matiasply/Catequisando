const express = require('express');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const moduleRoutes = require('./routes/moduleRoutes')

const app = express();

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auth/session', sessionRoutes);
app.use('/api/auth/module', moduleRoutes)

app.listen(3000, function() {
    console.log('Server is running on port 3000');
})