var express = require('express');
var router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'public/uploads/'})
const fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'File Sizifier' });
});

/* POST file */
router.post('/', upload.single('choose-file'), function(req, res, next) {

  let filePath = undefined
  let outputObj = {
    title: 'File Sizifier',
    fileSize: undefined
  }

  // check for file
  if (req.file) {
    filePath = req.file.path
    outputObj.fileSize = req.file.size + ' bytes'

    // delete file async
    fs.unlink(filePath, function(error) {
      if (error) {
        throw error
      }
      console.log('deleted ' + filePath)
    })

  } else {
    outputObj.fileSize = 'There was a problem reading your file. Please try again.'
  }

  // rerender the page so another file can be checked
  res.render('index', outputObj)
})

module.exports = router;
