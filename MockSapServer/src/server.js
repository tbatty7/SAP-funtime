const app = require('./app');

const PORT = process.env.PORT || 3054;

app.listen(PORT, () => {
  console.log(`SAP mock running on http://localhost:${PORT}`);
  console.log(`Try: GET http://localhost:${PORT}/RESTAdapter/WO/GetDetails/000004000001`);
});
