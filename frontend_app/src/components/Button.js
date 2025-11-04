import Blits from '@lightningjs/blits'

export default Blits.Component('Button', {
  template: `
      <Element>
          <Text :content="$labelText" />
      </Element>
    `,
  computed: {
    labelText() {
      return this.isFavorited ? this.unfavoriteText : this.favoriteText
    },
  },
  state() {
    return {
      isFavorited: false,
      favoriteText: 'Press Enter',
      unfavoriteText: 'Press Enter Again',
    }
  },
  input: {
    enter() {
      this.isFavorited = !this.isFavorited
    },
  },
})
