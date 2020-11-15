<template>
  <span class='screen-list__timer' v-if="isActive">{{counter}}</span>
</template>

<script>
export default {
  name: 'screenListTimer',
  props: {
    counter: Number,
    isActive: Boolean
  }
}
</script>

<style lang='sass'>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron&display=swap')

  .screen-list__timer
    font-family: 'Orbitron', sans-serif;
    font-size: 45px
    margin: auto
    color: #000
    display: flex
    justify-content: center
    align-items: center
  
</style>