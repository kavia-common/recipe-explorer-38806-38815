import Blits from '@lightningjs/blits'
import HomeScreen from './pages/HomeScreen'
import Details from './pages/Details'

export default Blits.Application({
  template: `
    <Element>
      <RouterView />
    </Element>
  `,
  routes: [
    { path: '/', component: HomeScreen },
    { path: '/details/:id', component: Details, options: { props: ['id'] } },
  ],
})
