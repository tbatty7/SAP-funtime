# SAP Funtime

A mock SAP ECC server and BDD test suite for Plant Maintenance work order integration.

```
MockSapServer/    Node.js mock of the SAP ECC REST adapter
SapBddTests/      C# Reqnroll BDD tests running against the mock server
```

---

## MockSapServer

### Prerequisites

- Node.js (any recent LTS)

### Install and start

```bash
cd MockSapServer
npm install
node src/server.js
```

The server starts on **http://localhost:3054**.

### Available mock work orders

| Order number   | Description                        | Operations |
|----------------|------------------------------------|------------|
| 000004000001   | Replace bearing assembly – Pump P-101     | 3 |
| 000004000002   | Annual inspection – Conveyor CV-205       | 2 |
| 000004000003   | Emergency repair – Gearbox GBX-07         | 4 |
| 000004000004   | Planned overhaul – Air compressor AC-12   | 4 |

---

## Endpoints

### GET /RESTAdapter/WO/GetDetails/:orderNumber

Retrieves a work order by order number. The number is left-padded to 12 digits automatically.

```bash
curl http://localhost:3054/RESTAdapter/WO/GetDetails/000004000001
```

**Success response** — `RETURN.TYPE` is `"S"`:

```json
{
  "ES_HEADER": { "AUFNR": "000004000001", "KTEXT": "Replace bearing assembly - Pump P-101", ... },
  "ET_OPERATIONS": {
    "item": [
      {
        "ACTIVITY": "0010",
        "CONTROL_KEY": "PM01",
        "WORK_CNTR": "MECH-TEAM",
        "PLANT": "1000",
        "DESCRIPTION": "Isolate and lock out pump P-101",
        "QUANTITY": "2.0",
        "CURRENCY": "AUD",
        "CURRENCY_ISO": "AUD",
        "NUMBER_OF_CAPACITIES": "1",
        "PERCENT_OF_WORK": "100.0",
        "GR_RCPT": "",
        "PERS_NO": "",
        "EARL_SCHED_START_DATE": "20250315",
        "EARL_SCHED_FIN_DATE": "20250317",
        "LATE_SCHED_START_DATE": "20250315",
        "LATE_SCHED_FIN_DATE": "20250317"
      },
      ...
    ]
  },
  "DOCUMENTS": { "item": [...] },
  "NOTIFICATION": { ... },
  "RETURN": { "TYPE": "S", "MESSAGE": "Order 000004000001 read successfully", ... }
}
```

**Error response** (unknown order) — `RETURN.TYPE` is `"E"`:

```json
{
  "RETURN": { "TYPE": "E", "MESSAGE": "Order 000099999999 does not exist", ... }
}
```

---

### POST /RESTAdapter/WO/CreateUpdate

Updates operations on an existing work order. Mirrors the SAP `BAPI_ALM_ORDER_MAINTAIN` pattern:

- **`IT_OPERATION`** — contains the new field values
- **`IT_OPERATION_UP`** — contains `"X"` flags for each field that should be written; blank means leave unchanged

Only `METHOD_TYPE: "CHANGE"` is supported. Changes are held in memory for the lifetime of the server process and are immediately visible on subsequent GET calls.

**Top-level request fields:**

| Field | Type | Description |
|-------|------|-------------|
| `METHOD_TYPE` | string | Must be `"CHANGE"` |
| `OBJECT_TYPE` | string | Object type (informational) |
| `ORDERNO` | string | Work order number |
| `KEY` | string | Key (informational) |
| `IT_METHODS` | object | Method table `{ item: [...] }` (informational) |
| `IT_OPERATION` | object | Operation values `{ item: [...] }` |
| `IT_OPERATION_UP` | object | Update indicators `{ item: [...] }` |
| `IT_RELATION` | object | Relation table (informational) |
| `IT_RELATION_UP` | object | Relation update indicators (informational) |
| `IT_USERSTATUS` | object | User status table (informational) |

**Operation item fields** (used in both `IT_OPERATION` and `IT_OPERATION_UP`):

| Field | Description |
|-------|-------------|
| `ACTIVITY` | Operation number — used as the key to match operations (e.g. `"0010"`) |
| `CONTROL_KEY` | Control key (e.g. `"PM01"`) |
| `WORK_CNTR` | Work centre |
| `PLANT` | Plant code |
| `DESCRIPTION` | Operation description |
| `QUANTITY` | Work quantity |
| `CURRENCY` | Currency key |
| `CURRENCY_ISO` | ISO currency code |
| `NUMBER_OF_CAPACITIES` | Number of capacities |
| `PERCENT_OF_WORK` | Percentage of work |
| `GR_RCPT` | Goods receipt indicator |
| `PERS_NO` | Personnel number |
| `EARL_SCHED_START_DATE` | Earliest scheduled start date (`YYYYMMDD`) |
| `EARL_SCHED_FIN_DATE` | Earliest scheduled finish date (`YYYYMMDD`) |
| `LATE_SCHED_START_DATE` | Latest scheduled start date (`YYYYMMDD`) |
| `LATE_SCHED_FIN_DATE` | Latest scheduled finish date (`YYYYMMDD`) |

**Example — update DESCRIPTION and QUANTITY on operation 0020:**

```bash
curl -X POST http://localhost:3054/RESTAdapter/WO/CreateUpdate \
  -H "Content-Type: application/json" \
  -d '{
    "METHOD_TYPE": "CHANGE",
    "ORDERNO": "000004000001",
    "IT_OPERATION": {
      "item": [
        {
          "ACTIVITY": "0020",
          "DESCRIPTION": "Remove, inspect and measure bearing housing",
          "QUANTITY": "5.0"
        }
      ]
    },
    "IT_OPERATION_UP": {
      "item": [
        {
          "ACTIVITY": "0020",
          "DESCRIPTION": "X",
          "QUANTITY": "X"
        }
      ]
    }
  }'
```

**Success response** — `RETURN.TYPE` is `"S"`:

```json
{
  "RETURN": { "TYPE": "S", "MESSAGE": "Order 000004000001 updated successfully", ... }
}
```

**Error cases:**

| Condition | `RETURN.TYPE` | `RETURN.FIELD` |
|-----------|---------------|----------------|
| `METHOD_TYPE` is not `"CHANGE"` | `"E"` | `"METHOD_TYPE"` |
| Order not found | `"E"` | `"ORDERNO"` |
| `ACTIVITY` missing from an `IT_OPERATION_UP` item | `"E"` | `"ACTIVITY"` |
| Operation `ACTIVITY` not found on order | `"E"` | `"ACTIVITY"` |

---

## SapBddTests

### Prerequisites

- .NET 10 SDK

### Run the tests

```bash
dotnet test SapBddTests/SapBddTests.sln
```

The test hooks will automatically start `MockSapServer` before the test run if it is not already running, and shut it down afterwards. If the server is already running, the hooks leave it alone.

### Scenarios covered

| Scenario | Endpoint |
|----------|----------|
| Retrieve an existing work order | GET |
| Request a non-existent work order returns an error | GET |
| Update an operation field using CHANGE method type | POST → GET |
| CreateUpdate only updates fields marked with X | POST → GET |
| Reject CreateUpdate with a non-CHANGE method type | POST |
| Reject CreateUpdate for a non-existent order | POST |
| Reject CreateUpdate for a non-existent operation | POST |

### Project structure

```
SapBddTests/
  SapBddTests.sln
  SapBddTests/
    SapBddTests.csproj
    Features/
      WorkOrders.feature      Gherkin scenarios
    StepDefinitions/
      WorkOrderSteps.cs       Step implementations (HttpClient against localhost:3054)
    Support/
      Hooks.cs                BeforeTestRun/AfterTestRun server lifecycle
```

---

## Notes

- Work order data is held in memory. Restarting the server resets all changes made via `CreateUpdate`.
- The server always returns HTTP 200, including for error cases, matching SAP ECC REST adapter behaviour where the error is communicated through `RETURN.TYPE = "E"`.
- Dates are in SAP format: `YYYYMMDD` (e.g. `"20250315"`).
