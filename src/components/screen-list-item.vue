<template>
  <li class='screen-list__item'>
    <div class='screen-list__light' :class="[getFullClassName, {active: isCurrent, flickering: flicked && isCurrent}]">
      <screenListTimer :counter='counter' :isActive='isCurrent' />
    </div>
  </li>
</template>

<script>
  import screenListTimer from './screen-list-timer'

  export default {
    name: 'screenListItem',
    components: {
      screenListTimer
    },
    props: {
      id: String,
      counter: Number,
      current: String,
      flicked: Boolean
    },
    computed: {
      isCurrent() {
        return this.current==this.id
      },
      
      getFullClassName() {
        return `screen-list__light--${this.id}`
      }
    }
  }
</script>

<style lang='sass'>
  .screen-list__item 
    background-color: #f4f9fc;
    display: flex
    justify-content: center
    align-items: center
    width: 200px
    height: 200px
    margin-bottom: 20px
    border-radius: 20%   

  .screen-list__light
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

  @keyframes blink 
    from 
      opacity: 1;
    
    to 
      opacity: 0.2;
  
  .flickering
    animation: blink 0.4s linear infinite alternate  
</style>