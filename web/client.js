
/*
This file handles interface with microphone using chrome's built in extension.

Once a transcript (whatever user has spoken into mic) is available, it is sent to 
localhost server for parsing and appropriate action is taken on server.

Server then responds with appropriate message, which then is read back to the user.
*/


showInfo('info_start');

var create_email = false;
var final_transcript = '';
var recognizing = true;
var ignore_onend;
var start_timestamp;



if (!('webkitSpeechRecognition' in window)) {
  upgrade();  
} 

  start_button.style.display = 'inline-block';
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() {
    console.log('triggering recognition onstart event');
    recognizing = true;
    showInfo('info_speak_now');
    start_img.src = 'mic-animate.gif';
  };

  recognition.onerror = function(event) {
    console.log('triggering recognition onerror event');
    if (event.error == 'no-speech') {
      start_img.src = 'mic.gif';
      showInfo('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      start_img.src = 'mic.gif';
      showInfo('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        showInfo('info_blocked');
      } else {
        showInfo('info_denied');
      }
      ignore_onend = true;
    }
  };

  recognition.onend = function() {
    console.log('triggering recognition onend event');
    startButton({})
    /*recognizing = false;
    if (ignore_onend) {
      return;
    }
    start_img.src = 'mic.gif';
    if (!final_transcript) {
      showInfo('info_start');
      return;
    }
    showInfo('');
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(document.getElementById('final_span'));
      window.getSelection().addRange(range);
    }*/
  };

  recognition.onresult = function(event) {
    console.log('triggering recognition onresult event');
    var interim_transcript = '';
    console.log(event);
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);

    if(final_transcript) {

      // FIXME: Transcript is sent to server many times though the text is repeatatively same, we need to fix this.

      server.parse(final_transcript, function(data) {
      console.log('server reply is', data);
      var msg = new SpeechSynthesisUtterance(data.msg);
      window.speechSynthesis.speak(msg);
      final_transcript = '';
    });

    }
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);
  }.bind(this);

  console.log('now starting the recognition service....');
  startButton({});


function upgrade() {
  start_button.style.visibility = 'hidden';
  showInfo('info_upgrade');
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

function startButton(event) {
  console.log('inside startButton', recognizing);
  /*if (recognizing) {
    recognition.stop();
    return;
  }*/
  final_transcript = '';

  // Hard coded the language setting to remove select_dialect and select_language dropdwons.
  recognition.lang = 'en-US';
  
  console.log('starting to recognise');
  recognition.start();
  ignore_onend = false;
  final_span.innerHTML = '';
  interim_span.innerHTML = '';
  start_img.src = 'mic-slash.gif';
  showInfo('info_allow');
  start_timestamp = event.timeStamp;
}

function showInfo(s) {
  if (s) {
    for (var child = info.firstChild; child; child = child.nextSibling) {
      if (child.style) {
        child.style.display = child.id == s ? 'inline' : 'none';
      }
    }
    info.style.visibility = 'visible';
  } else {
    info.style.visibility = 'hidden';
  }
}
