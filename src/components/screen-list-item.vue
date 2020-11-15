<template>
  <li class='screen-list__item'>
    <div class='screen-list__light' :class="[getFullClassName, {active: isActive, flickering: flicked && isActive}]">
      <screen-list-timer :counter='counter' :isActive='isActive' />
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
      flicked: Boolean,
      color: String,
      path: String,
      counter: Number
      
    },
    computed: {
      isActive() {
        return this.$route.path === this.path
      },
      
      getFullClassName() {
        return `screen-list__light--${this.color}`
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
    border-radius: 15%   

  .screen-list__light
    border-radius: 10%
    width: 80%
    height: 80%
    display: flex
    opacity: 0.3

    &--red 
      background-color: #F9462B
    

    &--yellow 
      background-color: #FFCE46
    

    &--green
      background-color: #03CE78  
  
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