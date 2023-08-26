const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);

// Define a custom PATCH route to handle updates
server.patch('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  // Update the data in the "data" collection in db.json
  router.db.get('data')
    .find({ id })
    .assign(updatedData)
    .write();

  res.json(updatedData);
});

server.use(router);

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
