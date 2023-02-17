const app = require('./app');
const config = require('./app/config');
const PORT = config.app.port;
app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});
