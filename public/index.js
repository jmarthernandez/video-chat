var Peer = require('simple-peer')
navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

navigator.getUserMedia({ video: true, audio: true }, function (stream) {
  function createMessage (text, className) {
    var message = document.createElement('div')
    message.textContent = text
    message.setAttribute('class', className)
    return message
  }

  var peer = new Peer({
    initiator: location.hash === '#init',
    trickle: false,
    stream: stream
  })

  peer.on('signal', function (data) {
    document.getElementById('yourId').value = JSON.stringify(data)
  })

  document.getElementById('connect').addEventListener('click', function () {
    var otherId = JSON.parse(document.getElementById('otherId').value)
    peer.signal(otherId)
  })

  document.getElementById('send').addEventListener('click', function () {
    var text = document.getElementById('yourMessage').value
    var outgoing = createMessage(text, 'outgoing')
    outgoing.setAttribute('class', 'right-align')
    document.getElementById('messages').appendChild(outgoing)
    peer.send(outgoing.textContent)
  })

  peer.on('data', function (data) {
    var incoming = createMessage(data, 'incoming')
    incoming.setAttribute('class', 'left-align')
    document.getElementById('messages').appendChild(incoming)
  })

  peer.on('stream', function (stream) {
    var video = document.getElementById('video')
    video.src = window.URL.createObjectURL(stream)
    video.play()
  })
}, function (err) {
  console.error(err)
})