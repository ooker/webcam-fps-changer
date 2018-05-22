
export default {
  props: ["fps"],
  data: function () {
    return { 
      framerate: this.fps,
      video: null,
      constraints : null
    }
  },
  mounted: function () {
     //*
    this.constraints = { audio: false, video: { width:1920, height:1080, frameRate: this.fps  } }; 
    this.video = document.querySelector('video');
    const vm = this;
    
    navigator.mediaDevices.getUserMedia(vm.constraints)
    .then(function(mediaStream) {
      vm.video.srcObject = mediaStream;
      vm.video.onloadedmetadata = function(e) {
        vm.video.play();
      };
    })
    .catch( function(err) { console.log(err.name + ": " + err.message); });
    //*/ 
   
  },
  watch: { 
    fps: function() { 
      this.constraints.video.frameRate = this.fps;
      this.video.srcObject.getVideoTracks()[0].applyConstraints( this.constraints.video );
    }
  },
  template: `
    <div>
      <video></video>
    </div>
  `
};
