const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function logRequest(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`

  console.time(logLabel)
  
  next();
  
  console.timeEnd(logLabel)
}

function validateRepositoryId(request, response, next) {
  const { id } = request.params;

  if(!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid project ID'})
  }

  return next();
}

function findRepository(request, response, next) {
  const { id } = request.params;

  const index = repositories.findIndex(repository => repository.id === id);

  if (index < 0) return response.status(400).json({ error: "Repository not found" })

  request.repoIndex = index;

  return next();
}

app.use(logRequest);
app.use('/repositories/:id', validateRepositoryId);
app.use('/repositories/:id', findRepository);

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: request.params.id,
    title,
    url,
    techs,
    likes: repositories[request.repoIndex].likes,
  }

  repositories[request.repoIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  repositories.splice(request.repoIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  repositories[request.repoIndex].likes += 1;

  return response.json(repositories[request.repoIndex]);
});

module.exports = app;
