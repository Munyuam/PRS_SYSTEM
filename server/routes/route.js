const express = require('express').Router
const router = express()

router.get('/', function(req, res) {
    res.send('Hello World!')
});

router.get('/api', function(req, res){
    res.json({
    "data": [
        { "id": 500, "name": "This site is under constructions" }
    ]
    }
    )
})

router.get('/login', function(req, res){
    res.json()
    
})

module.exports = router;