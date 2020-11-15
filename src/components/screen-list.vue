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
      :path='"/green"'
      :color='"green"'
      :counter='counter'
      :flicked='flicked'
/>            
  </ul>
</template>


<script>
  import screenListItem from './screen-list-item.vue'

  class ScreenState {
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
        nextScreenPath: '',
        rightPath: false
      }
    },
    methods: {
      getScreenStates() {        
        let red = new ScreenState('/red', 10)
        let yellowToGreen = new ScreenState('/yellow', 3)
        let yellowToRed = new ScreenState('/yellow', 3)    
        let green = new ScreenState('/green', 15)

        red.next = yellowToGreen
        yellowToGreen.next = green
        green.next = yellowToRed
        yellowToRed.next = red

        return {red, yellowToGreen, yellowToRed, green}
      },

      getBeginScreen({red, yellowToGreen, yellowToRed, green}) {
        switch (this.$route.path) {
          case '/green':
            return green
            
          case '/yellow' :
            if (this.nextScreenPath == '/red' || this.nextScreenPath == '') {
              return yellowToRed
            } else if(this.nextScreenPath == '/green') {
              return yellowToGreen
            }          
            break

          default:
            return red
        }
      }
      ,
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
          this.counter = screen.next.timer
          this.trigger(screen.next, callback)
        }, this.counter * 1000)
      },
      
      checkLocalStorage() {
        if (localStorage.getItem('nextPath') != null && JSON.parse(localStorage.getItem('path')) == this.$route.path) {
          this.nextScreenPath = JSON.parse(localStorage.getItem('nextPath'))
          this.counter = JSON.parse(localStorage.getItem('counter'))
          this.rightPath = true
        }
      },

      ifNeedToOverrideCounter(beginScreen) {
        if(!this.rightPath) {
          this.counter = beginScreen.timer
        }
      }
    },
    created() {    
      let screens = this.getScreenStates()  
      this.checkLocalStorage()
      let beginScreen = this.getBeginScreen(screens)
      this.ifNeedToOverrideCounter(beginScreen)
     
      this.trigger(beginScreen, (screen) => {       
        this.flicked = false
        this.$router.push({ path: screen.path })
        localStorage.setItem('nextPath', JSON.stringify(screen.next.path))
        localStorage.setItem('path', JSON.stringify(screen.path))
        setTimeout(this.countDownTimer, 0)
      })
    }
    ,
    watch: {
      counter(counter) {    
        localStorage.setItem('counter', JSON.stringify(counter))   
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



