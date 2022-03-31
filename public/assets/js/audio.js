let constraintObj = { 
    audio: true, 
    video: false 
    // { 
    //     facingMode: "user", 
    //     width: { min: 640, ideal: 1280, max: 1920 },
    //     height: { min: 480, ideal: 720, max: 1080 } 
    // } 
}; 
// width: 1280, height: 720  -- preference only
// facingMode: {exact: "user"}
// facingMode: "environment"

//handle older browsers that might implement getUserMedia in some way
if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
    navigator.mediaDevices.getUserMedia = function(constraintObj) {
        let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
        return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraintObj, resolve, reject);
        });
    }
 } else{
    navigator.mediaDevices.enumerateDevices()
    .then(devices => {
        devices.forEach(device=>{
            console.log(device.kind.toUpperCase(), device.label);
            //, device.deviceId
        })
    })
    .catch(err=>{
        console.log(err.name, err.message);
    })
}

navigator.mediaDevices.getUserMedia(constraintObj)
.then(function(mediaStreamObj) {
    //connect the media stream to the first video element
    let audio = document.querySelector('audio');
    if ("srcObject" in audio) {
        audio.srcObject = mediaStreamObj;
    } else {
        //old version
        audio.src = window.URL.createObjectURL(mediaStreamObj);
    }
    

    // this function played the audio when the page was loaded
    //audio.onloadedmetadata = function(ev) {
        //show in the audio element what is being captured by the webcam 
      //  audio.play();
   // };
    
    //add listeners for saving video/audio
    let start = document.getElementById('start-btn');
    let stop = document.getElementById('stop-btn');
    let vidSave = document.getElementById('vid2');
    let audio1 = document.getElementById('audio-1');
    let voiceNoteText = document.getElementById('voice-note-text');
    let recordingFlasher = document.getElementById('recording-icon');
    let mediaRecorder = new MediaRecorder(mediaStreamObj);
    let chunks = [];
    let newAudio = document.getElementById('audio-capture-thom');

   
    start.addEventListener('click', (ev)=>{
       // audio.play();
        mediaRecorder.start();
        recordingFlasher.classList.remove('hide');
        voiceNoteText.classList.add('hide');
        //console.log(mediaRecorder.state);
    })
    stop.addEventListener('click', (ev)=>{
      //  audio.pause();
        mediaRecorder.stop();
        audio1.classList.add('hide');
        vidSave.classList.remove('hide');
        recordingFlasher.classList.add('hide');
       // console.log(mediaRecorder.state);
       newAudio.innerHTML = videoURL;
    });
    mediaRecorder.ondataavailable = function(ev) {
        chunks.push(ev.data);
    }
    mediaRecorder.onstop = (ev)=>{
        let blob = new Blob(chunks, { 'type' : 'audio/wav;' });
        chunks = [];
        let videoURL = window.URL.createObjectURL(blob);
        vidSave.src = videoURL;
        chunks.push(videoURL);


    }
})
.catch(function(err) { 
    //console.log(err.name, err.message); 
});


