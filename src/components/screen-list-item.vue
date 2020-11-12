<template>
  <li class="screen-list__item">
    <div class="screen-list__light" :class="{active: current=='red'}">
      <span class="screen-list__timer" v-if="currentActive">{{currentTimer}}</span>
    </div>
  </li>
</template>

<script>
export default {
  name: 'screenListItem',
  props: {
    color: String,
    paleColor: String,
    timer: Number,
    id: String,
    isActive: Boolean,
    timeout: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentColor: this.color,
      currentActive: this.isActive,
      currentTimer: this.timer,
      isTimeouted: this.timeout
    }    
  },
  mounted() {
    this.countDownTimer();
  },
  methods: {
    changeColorIsActive() {
      return this.currentActive ?  this.currentColor = this.color : this.currentColor = this.paleColor
    },
    countDownTimer() {
      if (this.currentActive) {
        if(this.currentTimer > 0) {
          setTimeout(() => {
            this.currentTimer -= 1
            this.countDownTimer()
            }, 1000)
        } else {
          this.currentActive = false
          this.isTimeouted = true
          this.changeColorIsActive()
        }        
      }
    },
    changeScreen() {
      this.changeColor();
      this.countDownTimer();
    }
  },
  // watch: {
  //   currentActive() {
  //     this.countDownTimer()
  //   }
  // }
}
</script>

<style>
  .screen-list__item {
    background-color: #f4f9fc;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
    border-radius: 20%;
  }

  .screen-list__light {
    border-radius: 20%;
    width: 80%;
    height: 80%;
    display: flex;
  }

  .screen-list__timer {
    font-size: 40px;
    margin: auto;
    color: #fff;
  }
</style>