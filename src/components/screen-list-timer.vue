<template>
  <span class="screen-list__timer" v-if="isActive">{{counter}}</span>
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

<style lang="sass">
  .screen-list__timer 
    font-size: 40px
    margin: auto
    color: #000
    width: 60px
    height: 60px
    display: flex
    justify-content: center
    align-items: center
  
</style>