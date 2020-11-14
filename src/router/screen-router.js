import VueRouter from 'vue-router'
import screenListItem from '../components/screen-list__item'

export default new VueRouter({
  routes: [
    {
        path: '/:color',
        template: screenListItem
    }
  ]
})