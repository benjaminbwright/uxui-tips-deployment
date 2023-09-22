const diagnostics = require("express").Router();
const { v4: uuid4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");
const diagnisticsData = require("../db/diagnostics.json");

// GET Route for retrieving diagnostic information
diagnostics.get("/", (req, res) => {
  readFromFile("./db/diagnostics.json").then((data) =>
    res.json(JSON.parse(data))
  );
});

// POST Route for a error logging
diagnostics.post("/", (req, res) => {
  const errors = req.body;
  const newDiagnostic = {
    time: Date.now(),
    error_id: uuid4(),
    errors,
  };
  // write the new diagnostic to the file
  readAndAppend(newDiagnostic, "./db/diagnostics.json");
  res.json(newDiagnostic);
});

module.exports = diagnostics;
