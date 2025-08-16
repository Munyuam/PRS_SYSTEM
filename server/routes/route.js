const express = require('express').Router
const router = express()

router.get('/', function(req, res) {
    res.send('Hello World!')
});

router.get('/api', function(req, res){
    res.json({
    "data": [
        { "id": 1, "name": "Example" }
    ]
    }
    )
})

module.exports = router;