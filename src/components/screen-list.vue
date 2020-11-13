<template>
  <ul class="screen-list">
    
    <!-- <li class="screen-list__item">
      <div class="screen-list_light screen-list_light--red" :class="{active: current=='red', flicker: flicked && current=='red'}" >
        <span class="screen-list__timer" v-if="current=='red'">{{timeoutCounter}}</span>
      </div>
    </li>
    <li class="screen-list__item">
      <div class="screen-list_light screen-list_light--yellow" :class="{active: current=='yellow', flicker: flicked && current=='yellow'}">
        <span class="screen-list__timer" v-if="current=='yellow'">{{timeoutCounter}}</span>
      </div>
    </li>
    <li class="screen-list__item">
      <div class="screen-list_light screen-list_light--green" :class="{active: current=='green', flicker: flicked && current=='green'}">
        <span class="screen-list__timer" v-if="current=='green'">{{timeoutCounter}}</span>
      </div>
    </li>         -->
  </ul>
</template>


<script>
class Screen {
  constructor(id, timer, next) {
    this.id = id
    this.timer = timer
    this.next = next
  }
}

class SwitchController { 
  trigger(screen, callback) {
    callback(screen)
    setTimeout(()=>{
      this.trigger(screen.next, callback)
    }, screen.timer * 1005)
  }
}

export default {
  name: 'screenList',
  data() {
    return {
      current: 'red',
      timeoutCounter: Number,
      flicked: false
    }
  },
  methods: {
    countDownTimer() {
      if(this.timeoutCounter > 1) {
        setTimeout(() => {
          this.timeoutCounter -= 1
          this.countDownTimer()
        }, 1000)
      }             
    }
  },
  mounted() {
    const controller = new SwitchController()
    
    let red = new Screen('red', 10)
    let yellowToGreen = new Screen('yellow', 3)
    let yellowToRed = new Screen('yellow', 3)    
    let green = new Screen('green', 15)

    red.next = yellowToGreen
    yellowToGreen.next = green
    green.next = yellowToRed
    yellowToRed.next = red

    controller.trigger(red, 
    (screen) => {
      this.timeoutCounter = screen.timer
      this.current = screen.id
      this.flicked = false
      setTimeout(this.countDownTimer, 0)      
    });

 
  },
  watch: {
    timeoutCounter() {
      if (this.timeoutCounter < 3) {
        this.flicked = true
      }
    }
  }
}
</script>

<style lang="sass">
  .screen-list 
    margin: auto
    padding: 0
    display: flex
    flex-direction: column
    justify-content: space-between
    list-style-type: none
  

  .screen-list__item 
    background-color: #f4f9fc
    display: flex
    justify-content: center
    align-items: center
    width: 200px
    height: 200px
    margin-bottom: 20px
    border-radius: 20%
  

  .screen-list_light
    border-radius: 20%
    width: 80%
    height: 80%
    display: flex
    opacity: 0.3
    
    &--red 
      background-color: red
    

    &--yellow 
      background-color: yellow
    

    &--green
      background-color: green
    

  .active 
    opacity: 1
  

  .screen-list__timer 
    font-size: 40px
    margin: auto
    color: #000
  
  .flicked
    opacity: 0.3

  @keyframes start_blink 
    from 
      opacity: 1;
    
    to 
      opacity: 0.2;
    
  .flicker
    animation: start_blink 0.4s linear infinite alternate
  
</style>



