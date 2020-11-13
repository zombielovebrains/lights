<template>
  <li class="screen-list__item">
    <div class="screen-list__light screen-list__light--{{id}}" :class="{active: current==id}" >
      <screenListTimer :counter='counter' :isActive='isActive' />
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
      isActive: Boolean,
      current: String,
      color: String
    }
  }
</script>

<style lang="sass">
  .screen-list__item 
    background-color: #f4f9fc;
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
</style>