## M.E.T. Robot API
Node.js, Express, SQLite3

**Install dependencies:** `npm install`
**Start server:** `node app.js`

Set port with environment variable `$PORT` (default: 3000)

### API Endpoints
**POST /add_instruction**
Adds an instruction to the queue.
```json
{
	"action": "movement",
	"parameters": {
		"direction": "forward",
		"speed": 4.0
	}
}
```

**GET /get_instructions**
Gets all instructions not completed yet.
```
 No data needed.
```

**POST /remove_instruction**
Marks instruction as done.
```json
{
	"id": 4
}
```