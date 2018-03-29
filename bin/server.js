const config = require('../config');
const server = require('../server');
const log = require('../server/lib/log').create();

require('dotenv').config();

const port = config('port');

server.listen(port, () => {
    log.info(`Listening on port ${port}`);
});
