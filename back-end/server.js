const express = require('express');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const sectionRoutes = require('./routes/sectionRoutes');
const moduleRoutes = require('./routes/moduleRoutes')
const subRoutes = require('./routes/subRoutes')
const classRoutes = require('./routes/classRoutes')

const app = express();

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auth/section', sectionRoutes);
app.use('/api/auth/module', moduleRoutes)
app.use('/api/auth/submodule', subRoutes)
app.use('/api/auth/class', classRoutes)

app.listen(3333, function() {
    console.log('Server is running on port 3333');
})