import Blits from '@lightningjs/blits'
import theme from '../theme/theme'

export default Blits.Component('EmptyState', {
  props: ['message'],
  template: `
    <Element w="1200" h="200" :color="${theme.colors.surface}" radius="${theme.radii.lg}" alpha="0.95">
      <Element x="-4" y="-4" w="1208" h="208" :color="${theme.colors.primary}" radius="${theme.radii.lg + 2}" alpha="0.2"/>
      <Text x="32" y="32" w="1136" h="136" fontSize="28" :textColor="${theme.colors.text}" :content="$msg" />
    </Element>
  `,
  computed: {
    msg() {
      return this.message || 'No recipes found. Try a different search.'
    },
  },
})
