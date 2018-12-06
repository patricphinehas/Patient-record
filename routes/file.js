var express = require('express');
var router = express.Router();
//var dialog = require('dialog');


/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/

router.post('/hello', function (req, res) {
  console.log("i am in file");
  const mongodb = require('mongodb');
  const {
    MongoCLient
  } = mongodb;

  async function main() {
    const client = await MongoCLient.connect("mongodb://localhost:27017");
    const db = client.db("SDL");
    var newval = {
      $set: {
        "privilage": true
      }
    };
    var myquery = {
      "username": req.body.username
    };
    const docs = await db.collection("users").updateOne(myquery, newval, function (err, ress) {
      if (err) throw err;
      else {
        console.log("successfully updated");
        res.render('./');
      }
    });

    console.log("success");
    client.close();
    main()
  }

})







module.exports = router;