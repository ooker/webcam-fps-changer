import Webcam from "./components/Webcam.js";

new Vue({
  el: "#app",
  components: { Webcam },
  data: () => ({ fps: 6 }),
  template: `
    <div>
      <Webcam :fps="fps"></Webcam>
      <input type="number" v-model="fps" class="fps-input"  />
    </div>
  `
});