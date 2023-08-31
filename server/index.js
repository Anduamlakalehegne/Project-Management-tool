const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser")

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
// createConnection
const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "password",
  database: "cruddatabase",
});

// ----------------------------- manager ------------------------------

app.get("/api/insert", (req, res) => {
  const sqlSelect = "SELECT * FROM cruddatabase.projects;";
  db.query(sqlSelect, (err, result) => {
    res.send(result)
  })
});

app.post("/api/insert", (req, res) => {
  const projectName = req.body.projectName;
  const projectId = req.body.projectId;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const description = req.body.description;

  const sqlInsert = "INSERT INTO projects (projectName, projectId, startDate, endDate, description) VALUES (?,?,?,?,?)";
  db.query(sqlInsert, [projectName, projectId, startDate, endDate, description], (err, result) => {
    if (result) {
      res.send(result)
    }
    else {
      res.send({ message: "Faield to add" })
    }
  })
});

// ----------------------------- employee ------------------------------

app.get("/api/employee", (req, res) => {
  const sqlSelect = "SELECT * FROM cruddatabase.users WHERE role = 'user' ";
  db.query(sqlSelect, (err, result) => {
    res.send(result)
  })
});

app.post("/api/employee", (req, res) => {
  const employeeName = req.body.employeeName;
  const employeeId = req.body.employeeId;
  const employeeEmail = req.body.employeeEmail;
  const password = req.body.password;
  const Position = req.body.Position;
  const sqlInsert = "INSERT INTO users (employeeName, employeeId, employeeEmail, password, Position) VALUES (?,?,?,?,?)";
  db.query(sqlInsert, [employeeName, employeeId, employeeEmail, password, Position], (err, result) => {
    if (result) {
      res.send(result)
    }
    else {
      res.send({ message: "Faield to add" })
    }
  })
});


// ----------------------------- employee ------------------------------

app.get("/api/actionplan", (req, res) => {
  const sqlSelect = "SELECT * FROM cruddatabase.actionplan;"
  db.query(sqlSelect, (err, result) => {
    res.send(result)
  })
});

app.get("/api/actionplan/detail/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id)
  db.query("SELECT * FROM cruddatabase.actionplan where id = ?", id, (err, result) => {
    res.send(result)
  })
});

app.get("/api/employee/actionplan/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id)
  db.query("SELECT * FROM cruddatabase.actionplan where employeeId = ?", id, (err, result) => {
    res.send(result)
  })
});

app.post("/api/actionplan", (req, res) => {
  const projectStartDate = req.body.projectStartDate;
  const projectEndDate = req.body.projectEndDate;
  const documentationStartDate = req.body.documentationStartDate;
  const documentationEndDate = req.body.documentationEndDate;
  const databasStartDate = req.body.databasStartDate;
  const databasEndDate = req.body.databasEndDate;
  const codeStartDate = req.body.codeStartDate;
  const codeEndDate = req.body.codeEndDate;
  const testStartDate = req.body.testStartDate;
  const testEndDate = req.body.testEndDate;
  const deployStartDate = req.body.deployStartDate;
  const deployEndDate = req.body.deployEndDate;
  const projectId = req.body.projectId;
  const employeeId = req.body.employeeId;
  console.log(projectStartDate)
  console.log(projectEndDate)
  console.log(projectId)
  console.log(employeeId)
  const sqlInsert = "INSERT INTO actionplan (projectStartDate, projectEndDate, documentationStartDate, documentationEndDate, databasStartDate, databasEndDate, codeStartDate, codeEndDate, testStartDate, testEndDate, deployStartDate, deployEndDate, projectId, employeeId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(sqlInsert, [projectStartDate, projectEndDate, documentationStartDate, documentationEndDate, databasStartDate, databasEndDate, codeStartDate, codeEndDate, testStartDate, testEndDate, deployStartDate, deployEndDate, projectId, employeeId], (err, result) => {
    if (result) {
      res.send(result)
    }
    else {
      res.send({ message: "Faield to add" })
    }
  })
});

// ----------------------------- Login ------------------------------
app.post("/api/employee/login", (req, res) => {
  const employeeEmail = req.body.username;
  const password = req.body.password;
  const sqlSelect = "SELECT * FROM cruddatabase.users WHERE employeeEmail = ? AND password = ?";
  db.query(sqlSelect, [employeeEmail, password], (err, result) => {
    if (result.length > 0) {
      res.send(result);
    }
    else {
      res.send({ error: "User Does Not Exit" })
    }
  })
});

// ----------------------------- manager ------------------------------

app.get("/api/employee/project/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id)
  db.query("SELECT * FROM cruddatabase.projects where employeId = ?", id, (err, result) => {
    res.send(result)
  })
});


app.put("/update", (req, res) => {
  const id = req.body.projectTd;
  const employeId = req.body.employid;
  db.query(
    "UPDATE projects SET employeId = ? WHERE id = ?",
    [employeId, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/actionplan/update", (req, res) => {
  const employid = req.body.employid;
  const approval = req.body.approval;
  // console.log(id)
  console.log(employid)
  console.log(approval)
  db.query(
    "UPDATE actionplan SET approval = ? WHERE employeeId = ?",
    [approval, employid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
// ---------- Delete User -----------
app.delete("/api/employee/delete/:id", (req, res) => {
  const id = req.params.id;
  console.log(id)
  db.query("DELETE FROM cruddatabase.users where id = ?", id, (err, result) => {
    res.send(result)
  })
});

// ---------- Detail User -----------
app.get("/api/employee/detail/:id", (req, res) => {
  const id = req.params.id;
  console.log(id)
  db.query("SELECT * FROM cruddatabase.users where id = ?", id, (err, result) => {
    res.send(result)
  })
});


// ---------- Delete Project -----------
app.delete("/api/project/delete/:id", (req, res) => {
  const id = req.params.id;
  console.log(id)
  db.query("DELETE FROM cruddatabase.projects where id = ?", id, (err, result) => {
    res.send(result)
  })
});


// ----------------------------- manager ------------------------------
app.put("/employee/update", (req, res) => {
  const id = req.body.projectTd;
  const employeeName = req.body.employeeName;
  const employeeId = req.body.employeeId;
  const employeeEmail = req.body.employeeEmail;
  const password = req.body.password;
  const Position = req.body.Position;
  db.query(
    "UPDATE projects SET employeeName = ? , employeeId = ? , employeeEmail = ? , password = ? , Position = ?  ,  WHERE id = ?",
    [employeeName, employeeId, employeeEmail, password, Position, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});




app.listen(3006, () => {
  console.log("The server is running on port 3006");
});
