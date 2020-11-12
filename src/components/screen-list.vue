<template>
  <ul class="screen-list">
    <screenListItem 
    v-for='(screen, index) in screens'
    :key='index'
    v-bind='screen'/>
  </ul>
</template>


<script>
import screenListItem from './screen-list-item'

export default {
  name: 'screenList',
  data() {
    return {
      screens: [
        {
          color: '#E32636',
          paleColor: '#ffbfb7',
          timer: 10,
          id: 'red'
        },
        {
          color: '#ffc61b',
          paleColor: '#ffebbb',
          timer: 3,
          id: 'yellow'
        },
        {
          color: '#8db600',
          paleColor: '#dde6b5',
          timer: 15,
          id: 'green'
        }                  
      ]
    }
  },
  components: {
    screenListItem
  }
}
</script>

<style>
  .screen-list {
    margin: 0 auto;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    list-style-type: none;
  }
</style>

