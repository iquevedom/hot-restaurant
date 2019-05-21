// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var tables = [
  {
    id: "afsldfjlsdnf",
    name: "Ahmed",
    email: "ahmed@example.com",
    phone: 000-000-0000,
  },
  {
    id: "rt4t4gdgr",
    name: "Ashley",
    email: "ahmed@example.com",
    phone: 000-000-0000,
  },
  {
    id: "afsldfjlsdnf",
    name: "Isidro",
    email: "ahmed@example.com",
    phone: 000-000-0000,
  },
  
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays all characters
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Displays a single character, or returns false
app.get("/api/tables/:tables", function(req, res) {
  var chosen = req.params.tables;

  console.log(chosen);

  for (var i = 0; i < tables.length; i++) {
    if (chosen === tables[i].routeName) {
      return res.json(tables[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newRes = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newRes.id = newRes.name.replace(/\s+/g, "").toLowerCase();

  console.log(newRes);

  tables.push(newRes);

  res.json(newRes);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});