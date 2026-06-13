module.exports = {
  "000004000001": {
    ES_HEADER: {
      AUFNR: "000004000001",
      AUART: "PM01",
      KTEXT: "Replace bearing assembly - Pump P-101",
      OBJNR: "IE000000000023",
      WERKS: "1000",
      IWERK: "1000",
      ERDAT: "20250310",
      ERNAM: "JSMITH",
      GSTRP: "20250315",
      GLTRP: "20250317",
      FKDAT: "",
      ARBPL: "MECH-TEAM",
      KOSTL: "100010",
      STATUS: "REL GMPS MANC",
      SSYST: "GMPS"
    },
    ET_OPERATIONS: {
      item: [
        {
          ACTIVITY: "0010",
          CONTROL_KEY: "PM01",
          WORK_CNTR: "MECH-TEAM",
          PLANT: "1000",
          DESCRIPTION: "Isolate and lock out pump P-101",
          QUANTITY: "2.0",
          CURRENCY: "AUD",
          CURRENCY_ISO: "AUD",
          NUMBER_OF_CAPACITIES: "1",
          PERCENT_OF_WORK: "100.0",
          GR_RCPT: "",
          PERS_NO: "",
          EARL_SCHED_START_DATE: "20250315",
          EARL_SCHED_FIN_DATE: "20250317",
          LATE_SCHED_START_DATE: "20250315",
          LATE_SCHED_FIN_DATE: "20250317"
        },
        {
          ACTIVITY: "0020",
          CONTROL_KEY: "PM01",
          WORK_CNTR: "MECH-TEAM",
          PLANT: "1000",
          DESCRIPTION: "Remove and inspect bearing housing",
          QUANTITY: "4.0",
          CURRENCY: "AUD",
          CURRENCY_ISO: "AUD",
          NUMBER_OF_CAPACITIES: "1",
          PERCENT_OF_WORK: "100.0",
          GR_RCPT: "",
          PERS_NO: "",
          EARL_SCHED_START_DATE: "20250315",
          EARL_SCHED_FIN_DATE: "20250317",
          LATE_SCHED_START_DATE: "20250315",
          LATE_SCHED_FIN_DATE: "20250317"
        },
        {
          ACTIVITY: "0030",
          CONTROL_KEY: "PM01",
          WORK_CNTR: "MECH-TEAM",
          PLANT: "1000",
          DESCRIPTION: "Install new bearing and reassemble",
          QUANTITY: "3.0",
          CURRENCY: "AUD",
          CURRENCY_ISO: "AUD",
          NUMBER_OF_CAPACITIES: "1",
          PERCENT_OF_WORK: "100.0",
          GR_RCPT: "",
          PERS_NO: "",
          EARL_SCHED_START_DATE: "20250315",
          EARL_SCHED_FIN_DATE: "20250317",
          LATE_SCHED_START_DATE: "20250315",
          LATE_SCHED_FIN_DATE: "20250317"
        }
      ]
    },
    DOCUMENTS: {
      item: [
        {
          DOKAR: "DOC",
          DOKNR: "0000000000002301",
          DOKVR: "00",
          DOKTL: "000",
          DKTXT: "Maintenance procedure MP-023 - Bearing replacement",
          FILENAME: "MP-023-bearing-replacement.pdf"
        }
      ]
    },
    NOTIFICATION: {
      QMNUM: "000010023456",
      QMTXT: "Bearing failure detected on Pump P-101",
      QMART: "M2",
      STRMN: "20250315",
      LTRMN: "20250317",
      PRIOK: "2",
      OBJNR: "IE000000000023",
      TPLNR: "AUS-PLT1-PUMP-AREA",
      EQUNR: "000000000010",
      QMNAM: "JSMITH",
      ERDAT: "20250310"
    },
    RETURN: {
      TYPE: "S",
      ID: "IW",
      NUMBER: "160",
      MESSAGE: "Order 000004000001 read successfully",
      LOG_NO: "",
      LOG_MSG_NO: "000000",
      MESSAGE_V1: "000004000001",
      MESSAGE_V2: "",
      MESSAGE_V3: "",
      MESSAGE_V4: "",
      PARAMETER: "",
      ROW: 0,
      FIELD: "",
      SYSTEM: "MOCK_ECC"
    }
  },

  "000004000002": {
    ES_HEADER: {
      AUFNR: "000004000002",
      AUART: "PM02",
      KTEXT: "Annual inspection - Conveyor CV-205",
      OBJNR: "IE000000000047",
      WERKS: "1000",
      IWERK: "1000",
      ERDAT: "20260601",
      ERNAM: "KWILLIAMS",
      GSTRP: "20260620",
      GLTRP: "20260621",
      FKDAT: "",
      ARBPL: "INSP-TEAM",
      KOSTL: "100020",
      STATUS: "CRTD",
      SSYST: "GMPS"
    },
    ET_OPERATIONS: {
      item: [
        {
          ACTIVITY: "0010",
          CONTROL_KEY: "PM01",
          WORK_CNTR: "INSP-TEAM",
          PLANT: "1000",
          DESCRIPTION: "Visual inspection of belt and rollers",
          QUANTITY: "3.0",
          CURRENCY: "AUD",
          CURRENCY_ISO: "AUD",
          NUMBER_OF_CAPACITIES: "1",
          PERCENT_OF_WORK: "100.0",
          GR_RCPT: "",
          PERS_NO: "",
          EARL_SCHED_START_DATE: "20260620",
          EARL_SCHED_FIN_DATE: "20260621",
          LATE_SCHED_START_DATE: "20260620",
          LATE_SCHED_FIN_DATE: "20260621"
        },
        {
          ACTIVITY: "0020",
          CONTROL_KEY: "PM01",
          WORK_CNTR: "INSP-TEAM",
          PLANT: "1000",
          DESCRIPTION: "Check motor alignment and lubrication",
          QUANTITY: "2.0",
          CURRENCY: "AUD",
          CURRENCY_ISO: "AUD",
          NUMBER_OF_CAPACITIES: "1",
          PERCENT_OF_WORK: "100.0",
          GR_RCPT: "",
          PERS_NO: "",
          EARL_SCHED_START_DATE: "20260620",
          EARL_SCHED_FIN_DATE: "20260621",
          LATE_SCHED_START_DATE: "20260620",
          LATE_SCHED_FIN_DATE: "20260621"
        }
      ]
    },
    DOCUMENTS: {
      item: []
    },
    NOTIFICATION: {},
    RETURN: {
      TYPE: "S",
      ID: "IW",
      NUMBER: "160",
      MESSAGE: "Order 000004000002 read successfully",
      LOG_NO: "",
      LOG_MSG_NO: "000000",
      MESSAGE_V1: "000004000002",
      MESSAGE_V2: "",
      MESSAGE_V3: "",
      MESSAGE_V4: "",
      PARAMETER: "",
      ROW: 0,
      FIELD: "",
      SYSTEM: "MOCK_ECC"
    }
  },

  "000004000003": {
    ES_HEADER: {
      AUFNR: "000004000003",
      AUART: "PM01",
      KTEXT: "Emergency repair - Gearbox GBX-07",
      OBJNR: "IE000000000091",
      WERKS: "1000",
      IWERK: "1000",
      ERDAT: "20260605",
      ERNAM: "MBROWN",
      GSTRP: "20260605",
      GLTRP: "20260606",
      FKDAT: "",
      ARBPL: "MECH-TEAM",
      KOSTL: "100030",
      STATUS: "PCNF REL GMPS",
      SSYST: "GMPS"
    },
    ET_OPERATIONS: {
      item: [
        {
          ACTIVITY: "0010",
          CONTROL_KEY: "PM01",
          WORK_CNTR: "ELEC-TEAM",
          PLANT: "1000",
          DESCRIPTION: "Isolate and de-energise gearbox GBX-07",
          QUANTITY: "1.0",
          CURRENCY: "AUD",
          CURRENCY_ISO: "AUD",
          NUMBER_OF_CAPACITIES: "1",
          PERCENT_OF_WORK: "100.0",
          GR_RCPT: "",
          PERS_NO: "",
          EARL_SCHED_START_DATE: "20260605",
          EARL_SCHED_FIN_DATE: "20260606",
          LATE_SCHED_START_DATE: "20260605",
          LATE_SCHED_FIN_DATE: "20260606"
        },
        {
          ACTIVITY: "0020",
          CONTROL_KEY: "PM01",
          WORK_CNTR: "MECH-TEAM",
          PLANT: "1000",
          DESCRIPTION: "Drain oil and remove gearbox cover",
          QUANTITY: "2.5",
          CURRENCY: "AUD",
          CURRENCY_ISO: "AUD",
          NUMBER_OF_CAPACITIES: "1",
          PERCENT_OF_WORK: "100.0",
          GR_RCPT: "",
          PERS_NO: "",
          EARL_SCHED_START_DATE: "20260605",
          EARL_SCHED_FIN_DATE: "20260606",
          LATE_SCHED_START_DATE: "20260605",
          LATE_SCHED_FIN_DATE: "20260606"
        },
        {
          ACTIVITY: "0030",
          CONTROL_KEY: "PM01",
          WORK_CNTR: "MECH-TEAM",
          PLANT: "1000",
          DESCRIPTION: "Inspect and replace damaged gear set",
          QUANTITY: "6.0",
          CURRENCY: "AUD",
          CURRENCY_ISO: "AUD",
          NUMBER_OF_CAPACITIES: "1",
          PERCENT_OF_WORK: "100.0",
          GR_RCPT: "",
          PERS_NO: "",
          EARL_SCHED_START_DATE: "20260605",
          EARL_SCHED_FIN_DATE: "20260606",
          LATE_SCHED_START_DATE: "20260605",
          LATE_SCHED_FIN_DATE: "20260606"
        },
        {
          ACTIVITY: "0040",
          CONTROL_KEY: "PM01",
          WORK_CNTR: "MECH-TEAM",
          PLANT: "1000",
          DESCRIPTION: "Refill oil and functional test",
          QUANTITY: "1.5",
          CURRENCY: "AUD",
          CURRENCY_ISO: "AUD",
          NUMBER_OF_CAPACITIES: "1",
          PERCENT_OF_WORK: "100.0",
          GR_RCPT: "",
          PERS_NO: "",
          EARL_SCHED_START_DATE: "20260605",
          EARL_SCHED_FIN_DATE: "20260606",
          LATE_SCHED_START_DATE: "20260605",
          LATE_SCHED_FIN_DATE: "20260606"
        }
      ]
    },
    DOCUMENTS: {
      item: [
        {
          DOKAR: "DOC",
          DOKNR: "0000000000004412",
          DOKVR: "00",
          DOKTL: "000",
          DKTXT: "Emergency repair checklist - Gearbox",
          FILENAME: "emergency-repair-checklist-gearbox.pdf"
        }
      ]
    },
    NOTIFICATION: {
      QMNUM: "000010034812",
      QMTXT: "Gearbox GBX-07 seized - production stopped",
      QMART: "M2",
      STRMN: "20260605",
      LTRMN: "20260606",
      PRIOK: "1",
      OBJNR: "IE000000000091",
      TPLNR: "AUS-PLT1-CONV-AREA",
      EQUNR: "000000000091",
      QMNAM: "MBROWN",
      ERDAT: "20260605"
    },
    RETURN: {
      TYPE: "S",
      ID: "IW",
      NUMBER: "160",
      MESSAGE: "Order 000004000003 read successfully",
      LOG_NO: "",
      LOG_MSG_NO: "000000",
      MESSAGE_V1: "000004000003",
      MESSAGE_V2: "",
      MESSAGE_V3: "",
      MESSAGE_V4: "",
      PARAMETER: "",
      ROW: 0,
      FIELD: "",
      SYSTEM: "MOCK_ECC"
    }
  },

  "000004000004": {
    ES_HEADER: {
      AUFNR: "000004000004",
      AUART: "PM03",
      KTEXT: "Planned overhaul - Air compressor AC-12",
      OBJNR: "IE000000000112",
      WERKS: "1000",
      IWERK: "1000",
      ERDAT: "20260101",
      ERNAM: "RDAVIS",
      GSTRP: "20260301",
      GLTRP: "20260305",
      FKDAT: "20260310",
      ARBPL: "MECH-TEAM",
      KOSTL: "100010",
      STATUS: "TECO GMPS",
      SSYST: "GMPS"
    },
    ET_OPERATIONS: {
      item: [
        {
          ACTIVITY: "0010",
          CONTROL_KEY: "PM01",
          WORK_CNTR: "ELEC-TEAM",
          PLANT: "1000",
          DESCRIPTION: "Shutdown and isolate compressor AC-12",
          QUANTITY: "1.0",
          CURRENCY: "AUD",
          CURRENCY_ISO: "AUD",
          NUMBER_OF_CAPACITIES: "1",
          PERCENT_OF_WORK: "100.0",
          GR_RCPT: "",
          PERS_NO: "",
          EARL_SCHED_START_DATE: "20260301",
          EARL_SCHED_FIN_DATE: "20260305",
          LATE_SCHED_START_DATE: "20260301",
          LATE_SCHED_FIN_DATE: "20260305"
        },
        {
          ACTIVITY: "0020",
          CONTROL_KEY: "PM01",
          WORK_CNTR: "MECH-TEAM",
          PLANT: "1000",
          DESCRIPTION: "Disassemble compressor and clean internals",
          QUANTITY: "8.0",
          CURRENCY: "AUD",
          CURRENCY_ISO: "AUD",
          NUMBER_OF_CAPACITIES: "1",
          PERCENT_OF_WORK: "100.0",
          GR_RCPT: "",
          PERS_NO: "",
          EARL_SCHED_START_DATE: "20260301",
          EARL_SCHED_FIN_DATE: "20260305",
          LATE_SCHED_START_DATE: "20260301",
          LATE_SCHED_FIN_DATE: "20260305"
        },
        {
          ACTIVITY: "0030",
          CONTROL_KEY: "PM01",
          WORK_CNTR: "MECH-TEAM",
          PLANT: "1000",
          DESCRIPTION: "Replace valves, rings and gaskets",
          QUANTITY: "6.0",
          CURRENCY: "AUD",
          CURRENCY_ISO: "AUD",
          NUMBER_OF_CAPACITIES: "1",
          PERCENT_OF_WORK: "100.0",
          GR_RCPT: "",
          PERS_NO: "",
          EARL_SCHED_START_DATE: "20260301",
          EARL_SCHED_FIN_DATE: "20260305",
          LATE_SCHED_START_DATE: "20260301",
          LATE_SCHED_FIN_DATE: "20260305"
        },
        {
          ACTIVITY: "0040",
          CONTROL_KEY: "PM01",
          WORK_CNTR: "MECH-TEAM",
          PLANT: "1000",
          DESCRIPTION: "Reassemble, commission and load test",
          QUANTITY: "4.0",
          CURRENCY: "AUD",
          CURRENCY_ISO: "AUD",
          NUMBER_OF_CAPACITIES: "1",
          PERCENT_OF_WORK: "100.0",
          GR_RCPT: "",
          PERS_NO: "",
          EARL_SCHED_START_DATE: "20260301",
          EARL_SCHED_FIN_DATE: "20260305",
          LATE_SCHED_START_DATE: "20260301",
          LATE_SCHED_FIN_DATE: "20260305"
        }
      ]
    },
    DOCUMENTS: {
      item: [
        {
          DOKAR: "DOC",
          DOKNR: "0000000000001105",
          DOKVR: "00",
          DOKTL: "000",
          DKTXT: "Overhaul procedure OP-105 - Air compressor",
          FILENAME: "OP-105-air-compressor-overhaul.pdf"
        },
        {
          DOKAR: "DOC",
          DOKNR: "0000000000001106",
          DOKVR: "00",
          DOKTL: "000",
          DKTXT: "Completion report - AC-12 overhaul March 2026",
          FILENAME: "completion-report-AC12-2026-03.pdf"
        }
      ]
    },
    NOTIFICATION: {
      QMNUM: "000010041200",
      QMTXT: "Scheduled overhaul due - Air compressor AC-12",
      QMART: "M1",
      STRMN: "20260301",
      LTRMN: "20260305",
      PRIOK: "3",
      OBJNR: "IE000000000112",
      TPLNR: "AUS-PLT1-UTIL-AREA",
      EQUNR: "000000000112",
      QMNAM: "RDAVIS",
      ERDAT: "20260101"
    },
    RETURN: {
      TYPE: "S",
      ID: "IW",
      NUMBER: "160",
      MESSAGE: "Order 000004000004 read successfully",
      LOG_NO: "",
      LOG_MSG_NO: "000000",
      MESSAGE_V1: "000004000004",
      MESSAGE_V2: "",
      MESSAGE_V3: "",
      MESSAGE_V4: "",
      PARAMETER: "",
      ROW: 0,
      FIELD: "",
      SYSTEM: "MOCK_ECC"
    }
  }
};
