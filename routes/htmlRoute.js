const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
    //NEW ROUTES
router.get('/audio', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/audio.html'));
  });
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });


module.exports = router;