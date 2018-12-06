var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/createusr", function (req, res) {
  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(
    url, {
      useNewUrlParser: true
    },
    function (err, db) {
      if (err) throw err;
      var dbo = db.db("SDL");
      var myobj = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        privilage: false
      };
      dbo.collection("users").insertOne(myobj, function (err, resp) {
        if (err) console.log("error");
        else {
          //res.writeHead(200,{"Content-Type": "text/plain"});
          res.render("./");
          console.log("insert success");
          db.close();
        }
      });
    }
  );
});

router.post("/newpatient", function (req, res) {
  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(
    url, {
      useNewUrlParser: true
    },
    function (err, db) {
      if (err) throw err;
      var dbo = db.db("SDL");
      var myobj = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        privilage: false
      };
      dbo.collection("patient").insertOne(myobj, function (err, resp) {
        if (err) console.log("error");
        else {
          //res.writeHead(200,{"Content-Type": "text/plain"});
          res.render("./");
          console.log("insert success");
          db.close();
        }
      });
    }
  );
});

router.post("/auth", function (req, res) {
  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(
    url, {
      useNewUrlParser: true
    },
    function (err, db) {
      if (err) throw err;
      var dbo = db.db("SDL");
      var query = {
        username: req.body.username
      };

      dbo
        .collection("users")
        .find({
          $and: [{
              username: req.body.username
            },
            {
              password: req.body.password
            }
          ]
        })
        .toArray(function (err, docs) {
          if (err) console.log(err);
          else {
            var rs = JSON.stringify(docs);
            if (rs.length < 4) {
              // res.render("./");
              return res.redirect('/');
              console.log(docs);
            } else {
              res.render("./admindash", {
                username: req.body.username
              });
              //console.log(docs);
            }
          }
        });
    }
  );
});

router.post("/priv", function (req, res) {
  console.log("i am in users/priv");
  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("SDL");
    var myquery = {
      username: req.body.username
    };
    var newvalues = {
      $set: {
        "privilage": true
      }
    };
    dbo.collection("users").updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      else {
        console.log("1 document updated");
        db.close();
      }
    });
  });
  res.render("./admindash", {
    username: req.body.username
  });
});

module.exports = router;