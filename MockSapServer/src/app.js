const express = require('express');
const workOrderRoutes = require('./routes/workOrders');

const app = express();

app.use(express.json());
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
