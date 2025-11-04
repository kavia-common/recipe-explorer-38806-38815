import Blits from '@lightningjs/blits'
import theme from '../theme/theme'

export default Blits.Component('Tag', {
  props: ['label', 'x', 'y'],
  template: `
    <Element 
      :x="$x" 
      :y="$y" 
      w="140" 
      h="40" 
      :color="${theme.colors.secondary}"
      radius="${theme.radii.sm}"
      alpha="0.9"
    >
      <Text
        x="16"
        y="10"
        :content="$label"
        :textColor="${theme.colors.text}"
        fontFace="Regular"
        fontSize="18"
      />
    </Element>
  `,
})
