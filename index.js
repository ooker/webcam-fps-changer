import Webcam from "./components/Webcam.js";

new Vue({
  el: "#app",
  components: { Webcam },
  data: () => ({ fps: 6, cams: null, device:undefined }),
  methods: {
    getWebcams : function() {

      return new Promise((resolve, reject) => {
    
        // Filter found devices to only keep "videoinput" devices
        navigator.mediaDevices.enumerateDevices()
          .then(devices => {
    
            let filtered = devices.filter((device) => {
              return device.kind === "videoinput"
            });
    
            resolve(filtered);
            this.cams = filtered;
          })
    
      });
    
    },
    swapCams : function(i){
     this.device = this.cams[i].deviceId;
    }
  },
  mounted : function(){
    this.getWebcams();
  },
  template: `
    <div>
      <Webcam v-if="device" :fps="fps" :device="device"></Webcam>
      <div class="toolbar">
        <button v-for="(cam, index) in cams" @click="swapCams(index)">Cam {{index}}</button>
        <input  v-if="device"  type="number" v-model="fps" class="fps-input"  />
      </div>
      
    </div>
  `
});