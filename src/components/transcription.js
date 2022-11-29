AFRAME.registerComponent("transcription", {
  init: function () {
    console.log("xd");
    
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    var recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    var diagnostic = document.querySelector('.output');

    this.el.addEventListener('click', function (evt) {
        recognition.start();
        console.log('Ready to receive a color command.');
      });

      recognition.onresult = function(event) {
        // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
        // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
        // It has a getter so it can be accessed like an array
        // The first [0] returns the SpeechRecognitionResult at the last position.
        // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
        // These also have getters so they can be accessed like arrays.
        // The second [0] returns the SpeechRecognitionAlternative at position 0.
        // We then return the transcript property of the SpeechRecognitionAlternative object
        var color = event.results[0][0].transcript;
        diagnostic.textContent = 'Result received: ' + color + '.';
        bg.style.backgroundColor = color;
        console.log('Confidence: ' + event.results[0][0].confidence);
        
        this.el.addEventListener('click', function (evt) {
            if(active == true){
              navigator.vibrate(100)
              soundFX.play()
              active = false;
      
              socket.send("Button pressed");
            
              this.emit(`push`, null, false);
              setTimeout(() => active = true, 2000)
            }
          });
      }

      recognition.onspeechend = function() {
        recognition.stop();
      }

      recognition.onerror = function(event) {
        diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
      }
      
  },
});
