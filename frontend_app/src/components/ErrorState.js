import Blits from '@lightningjs/blits'
import theme from '../theme/theme'

export default Blits.Component('ErrorState', {
  props: ['message'],
  template: `
    <Element w="1200" h="200" :color="$surfaceColor" radius="$radiusLg" alpha="0.95">
      <Element x="-4" y="-4" w="1208" h="208" :color="$errorColor" radius="$radiusLgOutline" alpha="0.25"/>
      <Text x="32" y="32" w="1136" h="136" fontSize="28" :textColor="$textColor" :content="$msg" />
    </Element>
  `,
  computed: {
    surfaceColor() { return theme.colors.surface },
    errorColor() { return theme.colors.error },
    textColor() { return theme.colors.text },
    radiusLg() { return theme.radii.lg },
    radiusLgOutline() { return theme.radii.lg + 2 },
    msg() {
      return this.message || 'Something went wrong. Please try again.'
    },
  },
})
