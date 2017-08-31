var express = require('express');
var router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'public/uploads/'})
// const alert = require('alert-node')
const fs = require('fs')
const path = process.cwd()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'File Sizifier' });
});

/* POST file */
router.post('/', upload.single('choose-file'), function(req, res, next) {
  let filePath = req.file.path

  // alert('File Size: ' + req.file.size, 'window')

  // delete file async
  fs.unlink(filePath, function(error) {
    if (error) {
      throw error
    }
    console.log('deleted ' + filePath)
  })

  // rerender the landing page so another file can be checked
  // res.render('index', { title: 'File Sizifier' });
  res.render('index', {
    fileSize: req.file.size + ' bytes',
    title: 'File Sizifier'
  })
})


module.exports = router;
