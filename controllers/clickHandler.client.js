function() {

  var uploadButton = document.querySelector('#upload-form')

  function ajaxRequest(method, url, callback) {
    var xmlhttp = new XMLHttpRequest()
    var fd = new FormData()

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        callback(xmlhttp.response)
      }
    }

    fd.append('file', document.getElementById('file').files[0])

    xmlhttp.open(method, url, true)
    xmlhttp.send(fd)
  }

  uploadButton.addEventListener('submit', function(event) {

    event.stopPropagation()
    event.preventDefault()

    ajaxRequest('POST', window.location + 'file-size', function(data) {
      alert('File Size: ' + data)
    })
  })

}
