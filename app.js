// const express = require('express');
// const cors = require('cors');
// const contactsRouter = require('./app/routes/contact.route');
// const loginRouter = require('./app/routes/login.route');
// const app = express();
// const ApiError = require('./app/api-error');
// app.use(cors());
// app.use(express.json());
// app.use("/api/contacts", contactsRouter);
// app.use('/auth', loginRouter);
// app.get('/', function (req, res) {
//     res.json({ message: "Welcome to contact book application." });
// });
// app.use((req, res, next) => {
//     return next(new ApiError(404, "Resource not found"));
// });
// app.use((err, req, res, next) => {
//     return res.status(err.statusCode || 500).json({
//         message: err.message || "Internal Server Error",
//     });
// });
// module.exports = app;
const express = require('express');
const cors = require('cors');
const contactsRouter = require('./app/routes/contact.route');
const loginRouter = require('./app/routes/login.route');
const app = express();
const ApiError = require('./app/api-error');

app.use(cors());
app.use(express.json());



// Routes
app.use('/api/contacts', contactsRouter);
app.use('/auth', loginRouter);

app.get('/', function (req, res) {
    res.json({ message: "Welcome to contact book application." });
});

// Error handling middleware
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;
