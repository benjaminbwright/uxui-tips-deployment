const diagnostics = require("express").Router();
const { v4: uuid4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");
const diagnisticsData = require("../db/diagnostics.json");

// GET Route for retrieving diagnostic information
diagnostics.get("/", (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  res.json(diagnisticsData);
});

// POST Route for a error logging
diagnostics.post("/", (req, res) => {
  const errors = req.body;
  const newDiagnostic = {
    time: Date.now(),
    error_id: uuid4(),
    errors,
  };
  res.json(newDiagnostic);
});

module.exports = diagnostics;
