<template>
  <li class="screen-list__item">
    <div class="screen-list__light" :style='this.color'></div>
  </li>
</template>

<script>
export default {
  name: 'screenListItem',
  props: ['color', 'paleColor', 'timer', 'id']
}
</script>

<style>
  .screen-list__item {
    background-color: #f4f9fc;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
  }

  .screen-list__light {
    border-radius: 50%;
    width: 50px;
    height: 50px
  }
</style>