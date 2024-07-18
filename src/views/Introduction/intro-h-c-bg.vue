<template>
  <router-link to="/"><img src="../../assets/logo1.png" class="logo"  alt="1"/></router-link>
  <div id="particle-container">
  </div>
</template>

<script >
import { ref, onMounted, onUnmounted } from 'vue';
import {PersonCircleSharp} from "@vicons/ionicons5";



export default {
  components: {PersonCircleSharp},
  setup() {
    const particles = ref([]);
    const maxParticles = 800; // 设置最大粒子数量
    const frequency = 50;
    let tela;
    let canvas;



    class Particle {
      x;
      y;
      s;
      a;
      radius;
      color;
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.s = 0.5 + Math.random();
        this.a = 0;
        this.radius = 0.5 + Math.random() * 10;
        setTimeout(() => {
          if (this.radius > 0.5 && particles.value.length < maxParticles) {
            particles.value.push(new Particle(this.x, this.y));
            particles.value.push(new Particle(tela.width-this.x, tela.height-this.y));
          }
        }, 300);
        setTimeout(() => {
          // 5秒后自毁
          const index = particles.value.indexOf(this);
          if (index !== -1) {
            particles.value.splice(index, 1);
          }
        }, 300);
      }

      render() {
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        canvas.lineWidth = 2;
        canvas.fillStyle = this.color;
        canvas.fill();
        canvas.closePath();
      }

      move() {// 根据中线左右确定颜色
        this.color = this.x < tela.width / 2 ? '#d6433b' : '#36fcfa';
        this.render();
        this.x += Math.cos(this.a) * this.s;
        this.y += Math.sin(this.a) * this.s;
        this.a += Math.random() - 0.5;

        // const container = document.getElementById('particle-container');
        // let c_width = container.clientWidth;
        // let c_height = container.clientHeight;
        // // 判断是否越界，越界则返回 false
        // if (
        //     this.x < c_width*0.25 ||
        //     this.x > c_width*0.75 ||
        //     this.y < c_height*0.25 ||
        //     this.y > c_height*0.75
        // ) {// 移除该粒子
        //   const index = particles.value.indexOf(this);
        //   if (index !== -1) {
        //     particles.value.splice(index,1)
        //   }
        // }

        return true;
      }
    }

    function popolate() {
      if (particles.value.length < maxParticles) {
        particles.value.push(new Particle(tela.width / 2, tela.height / 2));
      }
    }

    function clear() {
      canvas.globalAlpha = 0.04;
      // canvas.fillStyle = '#000042';
      canvas.fillStyle = '#000042';
      canvas.fillRect(0, 0, tela.width, tela.height);
      canvas.globalAlpha = 1;
    }

    function update() {
      particles.value = particles.value.filter(particle => particle.move());
      clear();
      particles.value.forEach(particle => particle.render()); // 渲染移除后的粒子
      requestAnimationFrame(update);
    }

    onMounted(() => {
      tela = document.createElement('canvas');
      canvas = tela.getContext('2d');
      const container = document.getElementById('particle-container');
      tela.width = container?.clientWidth;
      tela.height = container?.clientHeight;
      container?.appendChild(tela);
      setInterval(() => {
        popolate();
      }, frequency);

      update();
    });

    onUnmounted(() => {
      // Cleanup code, if needed
    });

    return {};
  },
};
</script>

<style scoped>
#particle-container {
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.logo{
  position: absolute;
  left: 60px;
  height: 60px;
  top: 30px;
}
</style>
