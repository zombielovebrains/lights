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
        nextScreenPath: '',
        isSaved: false
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
          this.counter = screen.next.timer
          this.trigger(screen.next, callback)
        }, this.counter * 1000)
      },
      
      checkLocalStorage() {
        if (localStorage.getItem('nextPath') != null && JSON.parse(localStorage.getItem('path')) == this.$route.path) {
          this.nextScreenPath = JSON.parse(localStorage.getItem('nextPath'))
          this.counter = JSON.parse(localStorage.getItem('counter'))
          this.isSaved = true
        }
      },

      // checkNextPath() {
      //   if (localStorage.getItem('nextPath') != null) {
      //     this.nextScreenPath = JSON.parse(localStorage.getItem('nextPath'))
      //   }
      // },

      // checkCounter() {
      //   if (localStorage.getItem('counter') != null) {
      //     this.counter = JSON.parse(localStorage.getItem('counter'))
      //   }
      // }
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

      console.log(JSON.parse(localStorage.getItem('path')) == this.$route.path)
      console.log(this.$route.path)

      this.checkLocalStorage()
      
      switch (this.$route.path) {
        case '/green':
          beginScreen = green
          break;
          
        case '/yellow' :
          console.log(this.nextScreenPath)
          if (this.nextScreenPath == '/red' || this.nextScreenPath == '') {
            beginScreen = yellowToRed
          } else if(this.nextScreenPath == '/green') {
            beginScreen = yellowToGreen
          }          
          break;
        
        default:
          beginScreen = red
          break;
      }

      if(!this.isSaved) {
        this.counter = beginScreen.timer
      }
      
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



