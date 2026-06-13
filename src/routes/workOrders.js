const express = require('express');
const router = express.Router();
const workOrders = require('../data/workOrders');

router.get('/GetDetails/:orderNumber', (req, res) => {
  const paddedOrderNumber = req.params.orderNumber.padStart(12, '0');
  const order = workOrders[paddedOrderNumber];

  if (!order) {
    return res.status(200).json(buildSapError(paddedOrderNumber));
  }

  return res.status(200).json(order);
});

function buildSapError(orderNumber) {
  return {
    ES_HEADER: {},
    ET_OPERATIONS: { item: [] },
    DOCUMENTS: { item: [] },
    NOTIFICATION: {},
    RETURN: {
      TYPE: 'E',
      ID: 'IW',
      NUMBER: '161',
      MESSAGE: `Order ${orderNumber} does not exist`,
      LOG_NO: '',
      LOG_MSG_NO: '000000',
      MESSAGE_V1: orderNumber,
      MESSAGE_V2: '',
      MESSAGE_V3: '',
      MESSAGE_V4: '',
      PARAMETER: 'AUFNR',
      ROW: 0,
      FIELD: 'AUFNR',
      SYSTEM: 'MOCK_ECC'
    }
  };
}

module.exports = router;
