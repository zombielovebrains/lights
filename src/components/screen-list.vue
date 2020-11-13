<template>
  <ul class="screen-list">
    <screen-list-item 
      :id='"red"'
      :counter='counterProp'
      :flicked='flicked'
      :current='current'/>
    <screen-list-item 
      :id='"yellow"'
      :counter='counterProp'
      :flicked='flicked'
      :current='current'/>
    <screen-list-item 
      :id='"green"'
      :counter='counterProp'
      :flicked='flicked'
      :current='current'/>            
  </ul>
</template>


<script>
  import screenListItem from './screen-list-item'

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
      }, screen.timer * 1000)
    }
  }

  export default {
    name: 'screenList',
    components: {
      screenListItem
    },
    data() {
      return {
        current: 'red',
        timeoutCounter: Number,
        flicked: false,
        counterProp: Number                
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
        this.counterProp = this.timeoutCounter 
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
</style>



