const express = require('express').Router
const router = express()

router.get('/', function(req, res) {
    res.send('Hello World!')
});

router.get('/api', function(req, res){
    res.json({
        message: "response is working",
        data: [1,3,3]
    }
    )
})

module.exports = router;