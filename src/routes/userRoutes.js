const { Router, request, response } = require('express');

const router = Router();

router.get("/", (req = request, res = response) => {
    res.status(200).json({
        message: 'Hello World!'
    });
});

module.exports = router;
