<template>
  <ul class="screen-list">
    <li class="screen-list__item">
      <div class="screen-list_light screen-list_light--red" :class="{active: current=='red'}">
        <span class="screen-list__timer" v-if="current=='red'">{{timeoutCounter}}</span>
      </div>
    </li>
    <li class="screen-list__item">
      <div class="screen-list_light screen-list_light--yellow" :class="{active: current=='yellow'}">
        <span class="screen-list__timer" v-if="current=='yellow'">{{timeoutCounter}}</span>
      </div>
    </li>
    <li class="screen-list__item">
      <div class="screen-list_light screen-list_light--green" :class="{active: current=='green'}">
        <span class="screen-list__timer" v-if="current=='green'">{{timeoutCounter}}</span>
      </div>
    </li>        
    <!-- <li 
    class="screen-list__item" 
    v-for='index in screens' 
    :key='index'>
    <div class="screen-list__light">
      <span class="screen-list__timer" v-if="currentActive">{{currentTimer}}</span>
    </div>
  </li>    
    <screenListItem 
    v-for='(screen, index) in screens'
    :key='index'
    v-bind='screen'/> -->
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
      timeoutCounter: Number
    }
  },
  methods: {
    countDownTimer() {
      console.log(this.timeoutCounter);
      if(this.timeoutCounter > 0) {
          setTimeout(() => {
            this.timeoutCounter -= 1
            this.countDownTimer()
          }, 1000)
      }
    }
  },
  mounted() {
    const controller = new SwitchController()
    
    let red = new Screen('red', 5)
    let yellowToGreen = new Screen('yellow', 3)
    let yellowToRed = new Screen('yellow', 3)    
    let green = new Screen('green', 5)

    red.next = yellowToGreen
    yellowToGreen.next = green
    green.next = yellowToRed
    yellowToRed.next = red

    controller.trigger(red, 
    (screen) => {
      this.timeoutCounter = screen.timer
      this.current = screen.id      
    });
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
  
</style>



