const express = require("express");
const sqlite3 = require("sqlite3").verbose();

app = express();
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); 
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(express.urlencoded({extended: true}));
app.use(express.json());

port = process.env.PORT || 3000; 

var db = new sqlite3.Database("./instructions.db", (err) => {
  if (err) { console.error(err.message); }
  else { console.log("Connected to database!"); }
});

app.post('/add_instruction', function (req, res) {
	var jsonData = JSON.stringify(req.body);
	db.run(`INSERT INTO instructions VALUES(NULL, ?, ?)`, [jsonData, 0], function(err){
		if(err) { console.log(err.message); }
		else {
			console.log('Instruction inserted!');
			res.status(200).send({
				"status": "200",
				"message": "Instruction inserted!"
			});
		}
	});
});

app.get('/get_instructions', function(req, res) {
	db.all(`SELECT * FROM instructions WHERE done=0`, [],  function(err, rows) {
		if(err) { console.log(err.message); }
		else {
			res.status(200).send(rows);
		}
	});
});

app.post('/remove_instruction', function(req, res) {
	db.run(`UPDATE instructions SET done=1 WHERE id=?`, [req.body.id], function(err){
		if(err) { console.log(err.message); }
		else {
			console.log("Instruction completed!");
			res.status(200).send({
				"status": "200",
				"message": "Instruction marked as done!"
			});
		}
	});
});

app.listen(port, function (){
	console.log("server started on port " + port);
});