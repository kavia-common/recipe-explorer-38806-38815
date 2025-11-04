import Blits from '@lightningjs/blits'
import theme from '../theme/theme'

export default Blits.Component('RecipeCard', {
  props: ['item', 'w', 'h'],
  state() {
    return {
      hovered: false,
    }
  },
  template: `
    <Element :w="$w" :h="$h" :color="$surfaceColor" radius="$radiusLg" :alpha="$alphaValue" >
      <Element x="-3" y="-3" :w="$wPlus" :h="$hPlus" :color="$primaryColor" radius="$radiusLgOutline" :alpha="$hoverAlpha" />
      <Element x="0" y="0" :w="$w" h="160" :src="$imageSrc" />
      <Text x="16" y="176" :content="$titleText" fontSize="24" :textColor="$textColor" />
      <Text x="16" y="210" :content="$desc" fontSize="20" :textColor="$textMuted" alpha="0.9" />
    </Element>
  `,
  computed: {
    surfaceColor() { return theme.colors.surface },
    primaryColor() { return theme.colors.primary },
    textColor() { return theme.colors.text },
    textMuted() { return theme.colors.textMuted },
    radiusLg() { return theme.radii.lg },
    radiusLgOutline() { return theme.radii.lg + 2 },
    wPlus() { return (this.w || 0) + 6 },
    hPlus() { return (this.h || 0) + 6 },
    alphaValue() { return this.hovered ? 1 : 0.98 },
    hoverAlpha() { return this.hovered ? 0.35 : 0 },
    imageSrc() {
      const it = this.item
      return it && it.image ? it.image : 'assets/placeholder.jpg'
    },
    titleText() {
      const it = this.item
      return it && it.title ? it.title : ''
    },
    desc() {
      const t = (this.item?.description || '').trim()
      if (t.length <= 48) return t
      return t.slice(0, 48) + '…'
    },
  },
  input: {
    enter() {
      if (this.item && this.item.id) {
        this.$router.to(`/details/${this.item.id}`)
      }
    },
  },
  focus() {
    this.hovered = true
  },
  unfocus() {
    this.hovered = false
  },
})
