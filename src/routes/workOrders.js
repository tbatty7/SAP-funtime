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

router.post('/CreateUpdate', (req, res) => {
  const { METHOD_TYPE, ORDERNO, IT_OPERATION, IT_OPERATION_UP } = req.body || {};

  if (METHOD_TYPE !== 'CHANGE') {
    return res.status(200).json(buildReturn('E', 'IW', '016',
      `METHOD_TYPE '${METHOD_TYPE}' is not supported — only CHANGE is allowed`,
      METHOD_TYPE || '', 'METHOD_TYPE'));
  }

  const paddedOrderNumber = (ORDERNO || '').padStart(12, '0');
  const order = workOrders[paddedOrderNumber];

  if (!order) {
    return res.status(200).json(buildReturn('E', 'IW', '161',
      `Order ${paddedOrderNumber} does not exist`,
      paddedOrderNumber, 'ORDERNO'));
  }

  const ALLOWED_FIELDS = [
    'CONTROL_KEY', 'WORK_CNTR', 'PLANT', 'DESCRIPTION', 'QUANTITY',
    'CURRENCY', 'CURRENCY_ISO', 'NUMBER_OF_CAPACITIES', 'PERCENT_OF_WORK',
    'GR_RCPT', 'PERS_NO',
    'EARL_SCHED_START_DATE', 'EARL_SCHED_FIN_DATE',
    'LATE_SCHED_START_DATE', 'LATE_SCHED_FIN_DATE'
  ];

  const indicators = (IT_OPERATION_UP && IT_OPERATION_UP.item) || [];
  const values     = (IT_OPERATION    && IT_OPERATION.item)    || [];

  for (const indicator of indicators) {
    const { ACTIVITY } = indicator;
    if (!ACTIVITY) {
      return res.status(200).json(buildReturn('E', 'IW', '017',
        'ACTIVITY is required on each IT_OPERATION_UP item', '', 'ACTIVITY'));
    }

    const op = order.ET_OPERATIONS.item.find(o => o.ACTIVITY === ACTIVITY);
    if (!op) {
      return res.status(200).json(buildReturn('E', 'IW', '018',
        `Operation ${ACTIVITY} not found on order ${paddedOrderNumber}`,
        ACTIVITY, 'ACTIVITY'));
    }

    const valueRow = values.find(v => v.ACTIVITY === ACTIVITY) || {};

    for (const field of ALLOWED_FIELDS) {
      if (indicator[field] === 'X') {
        op[field] = valueRow[field] !== undefined ? valueRow[field] : op[field];
      }
    }
  }

  return res.status(200).json(buildReturn('S', 'IW', '160',
    `Order ${paddedOrderNumber} updated successfully`,
    paddedOrderNumber, ''));
});

function buildReturn(type, id, number, message, messageV1, field) {
  return {
    RETURN: {
      TYPE: type,
      ID: id,
      NUMBER: number,
      MESSAGE: message,
      LOG_NO: '',
      LOG_MSG_NO: '000000',
      MESSAGE_V1: messageV1,
      MESSAGE_V2: '',
      MESSAGE_V3: '',
      MESSAGE_V4: '',
      PARAMETER: '',
      ROW: 0,
      FIELD: field,
      SYSTEM: 'MOCK_ECC'
    }
  };
}

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
