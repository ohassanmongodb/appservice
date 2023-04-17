const constraints = {
    video: true,
    audio: true
  };
  
  let recorder;
  let stream;
  let videoPreview = document.getElementById('video-preview');
  
  document.getElementById('open-camera').addEventListener("click", () => {
    navigator.mediaDevices.getUserMedia(constraints)
      .then(mediaStream => {
        stream = mediaStream;
        videoPreview.srcObject = mediaStream;
        videoPreview.play();
        recorder = new MediaRecorder(mediaStream);
        recorder.start();
      })
      .catch(error => console.log("Error occurred: ", error));
  });
  
  document.getElementById('stop-video').addEventListener("click", () => {
    recorder.stop();
    stream.getTracks().forEach(track => {
      track.stop();
    });
  });
  
  recorder.addEventListener("dataavailable", event => {
    const videoFile = new Blob([event.data], { type: "video/webm" });
    const videoURL = URL.createObjectURL(videoFile);
    const anchor = document.createElement("a");
    anchor.href = videoURL;
    anchor.download = "video.webm";
    document.body.appendChild(anchor)
    anchor.click();
  });