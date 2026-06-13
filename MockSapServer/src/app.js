const express = require('express');
const workOrderRoutes = require('./routes/workOrders');

const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER || 'sapuser';
const BASIC_AUTH_PASS = process.env.BASIC_AUTH_PASS || 'Passw0rd!';

function basicAuth(req, res, next) {
  const header = req.headers['authorization'];
  if (!header || !header.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="SAP Mock"');
    return res.status(401).json({ MESSAGE: 'Unauthorized' });
  }
  const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
  const colonIdx = decoded.indexOf(':');
  const user = decoded.slice(0, colonIdx);
  const pass = decoded.slice(colonIdx + 1);
  if (user !== BASIC_AUTH_USER || pass !== BASIC_AUTH_PASS) {
    res.setHeader('WWW-Authenticate', 'Basic realm="SAP Mock"');
    return res.status(401).json({ MESSAGE: 'Unauthorized' });
  }
  next();
}

const app = express();

app.use(express.json());
app.use(basicAuth);
app.use('/RESTAdapter/WO', workOrderRoutes);

app.use((req, res) => {
  res.status(404).json({
    ERROR: {
      TYPE: 'E',
      ID: 'SY',
      NUMBER: '002',
      MESSAGE: `No handler found for path: ${req.path}`,
      LOG_NO: '',
      LOG_MSG_NO: '000000',
      MESSAGE_V1: req.path,
      MESSAGE_V2: '',
      MESSAGE_V3: '',
      MESSAGE_V4: '',
      PARAMETER: '',
      ROW: 0,
      FIELD: '',
      SYSTEM: 'MOCK_ECC'
    }
  });
});

module.exports = app;
