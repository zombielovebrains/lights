<template>
  <ul class='screen-list'>
    <screen-list-item 
      :path='"/red"'
      :color='"red"'
      :counter='timeoutCounter'
      :flicked='flicked'/>
    <screen-list-item
      :path='"/yellow" '
      :color='"yellow"'
      :counter='timeoutCounter'
      :flicked='flicked'/>
    <screen-list-item
      :path="'/green' "
      :color='"green"'
      :counter='timeoutCounter'
      :flicked='flicked'
/>            
  </ul>
</template>


<script>
  import screenListItem from './screen-list-item'

  class Screen {
    constructor(path, timer, next) {
      this.timer = timer
      this.path = path
      this.next = next      
    }
  }

  export default {
    name: 'screenList',
    components: {
      screenListItem
    },
    data() {
      return {
        timeoutCounter: 10,
        flicked: false,
        lastBoundaryScreenPath: '/red'     
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
      },

      checkFlickerTrigger(currentTime) {
        if (currentTime < 3) {
          this.flicked = true
        }
      },

      trigger(screen, callback) {
        callback(screen)
        setTimeout(()=>{
          this.trigger(screen.next, callback)
        }, this.timeoutCounter * 1000)
      }

    },
    created() {
      let beginScreen 
      let red = new Screen('/red', 10)
      let yellowToGreen = new Screen('/yellow', 3)
      let yellowToRed = new Screen('/yellow', 3)    
      let green = new Screen('/green', 15)

      red.next = yellowToGreen
      yellowToGreen.next = green
      green.next = yellowToRed
      yellowToRed.next = red
      
      switch (this.$route.path) {
        case '/green':
          beginScreen = green
          break;
          
        case '/yellow' :
          beginScreen = yellowToRed
          // if (this.lastBoundaryScreenPath == '/green') {
          //   beginScreen = yellowToRed
          // } else if(this.lastBoundaryScreenPath == '/red') {
          //   beginScreen = yellowToGreen
          // }          
          break;
        
        default:
          beginScreen = red
          break;
      }

      this.trigger(beginScreen, (screen) => {        
        this.timeoutCounter = screen.timer
        this.flicked = false
        this.$router.push({ path: screen.path })
        setTimeout(this.countDownTimer, 0)
      })
    }
    ,
    watch: {
      timeoutCounter(timeoutCounter) {
        this.checkFlickerTrigger(timeoutCounter)
      }
    }
    
  }
</script>

<style lang='sass'>
  .screen-list 
    margin: auto
    padding: 0
    display: flex
    flex-direction: column
    list-style-type: none  
</style>



