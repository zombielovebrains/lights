<template>
  <ul class='screen-list'>
    <screen-list-item 
      :path='"/red"'
      :color='"red"'
      :counter='counter'
      :flicked='flicked'/>
    <screen-list-item
      :path='"/yellow" '
      :color='"yellow"'
      :counter='counter'
      :flicked='flicked'/>
    <screen-list-item
      :path="'/green' "
      :color='"green"'
      :counter='counter'
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
        counter: 10,
        flicked: false,
        nextScreenPath: ''    
      }
    },
    methods: {
      countDownTimer() {
        if(this.counter > 1) {
          setTimeout(() => {
            this.counter -= 1
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
        }, this.counter * 1000)
      },

      checkNextPath() {
        if (localStorage.getItem('nextPath') != null) {
          this.nextScreenPath = JSON.parse(localStorage.getItem('nextPath'))
        }
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

      this.checkNextPath()
      
      switch (this.$route.path) {
        case '/green':
          beginScreen = green
          break;
          
        case '/yellow' :
          if (this.nextScreenPath == '/red') {
            beginScreen = yellowToRed
          } else if(this.nextScreenPath == '/green') {
            beginScreen = yellowToGreen
          }          
          break;
        
        default:
          beginScreen = red
          break;
      }

      this.trigger(beginScreen, (screen) => {       
        this.counter = screen.timer 
        this.flicked = false
        this.$router.push({ path: screen.path })
        localStorage.setItem('nextPath', JSON.stringify(screen.next.path))
        setTimeout(this.countDownTimer, 0)
      })
    }
    ,
    watch: {
      counter(counter) {    
        localStorage.setItem('timer', JSON.stringify(counter))   
        this.checkFlickerTrigger(counter)
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



