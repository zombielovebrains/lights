<template>
  <div id='app'>
    <screenList/>
  </div>
</template>

<script>
import screenList from './components/screen-list.vue'

export default {
  name: 'App',
  components: {
    screenList
  }
}
</script>

<style lang='sass'>
  #app 
    display: flex
    align-items: center
    height: 100vh
</style>
