import VueRouter from 'vue-router'
import screenListItem from '../components/screen-list-item'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {

  return originalPush.call(this, location).catch(err => err)

}

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/red',
      component: screenListItem
    },
    {
      path: '/yellow',
      component: screenListItem
    },
    {
      path: '/green',
      component: screenListItem
    }
  ]
})