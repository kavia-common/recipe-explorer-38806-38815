import Blits from '@lightningjs/blits'
import theme from '../theme/theme'
import Spinner from '../components/Spinner'
import ErrorState from '../components/ErrorState'
import { getRecipeById } from '../data/dataService'

export default Blits.Component('Details', {
  props: ['id'],
  components: { Spinner, ErrorState },
  state() {
    return {
      loading: true,
      error: '',
      recipe: null,
    }
  },
  template: `
    <Element w="1920" h="1080" :color="$bgColor">
      <Element x="0" y="0" w="1920" h="420" :src="$heroSrc" h="420" />
      <Element x="0" y="0" w="1920" h="420" :color="$overlayColor" alpha="0.15" />

      <Element x="120" y="440" w="1680" h="80" :color="$surfaceColor" radius="$radiusLg">
        <Text x="24" y="22" fontSize="36" :textColor="$textColor" :content="$titleText" />
      </Element>

      <Element x="120" y="540" w="800" h="440" :color="$surfaceColor" radius="$radiusLg">
        <Text x="24" y="20" fontSize="28" :textColor="$textColor" content="Ingredients" />
        <Element x="24" y="64" w="752" h="356">
          <Text :for="(ing, idx) in $ingredients" :key="$idx" :y="$idx * 32" fontSize="22" :textColor="$textColor" :content="$bullet(ing)" />
        </Element>
      </Element>

      <Element x="940" y="540" w="860" h="440" :color="$surfaceColor" radius="$radiusLg">
        <Text x="24" y="20" fontSize="28" :textColor="$textColor" content="Steps" />
        <Element x="24" y="64" w="812" h="356">
          <Text :for="(st, idx) in $steps" :key="$idx" :y="$idx * 34" fontSize="22" :textColor="$textColor" :content="$stepNum(idx, st)" />
        </Element>
      </Element>

      <Element x="860" y="440" w="200" h="200" :alpha="$loading ? 1 : 0">
        <Spinner label="Loading..." />
      </Element>
      <Element x="360" y="420" :alpha="$error ? 1 : 0">
        <ErrorState :message="$error" />
      </Element>

      <Text x="120" y="1000" fontSize="20" :textColor="$textMuted" content="Press Back to return" />
    </Element>
  `,
  computed: {
    bgColor() { return theme.colors.background },
    surfaceColor() { return theme.colors.surface },
    overlayColor() { return theme.colors.overlay },
    textColor() { return theme.colors.text },
    textMuted() { return theme.colors.textMuted },
    radiusLg() { return theme.radii.lg },
    heroSrc() {
      const r = this.recipe
      return r && r.image ? r.image : 'assets/placeholder.jpg'
    },
    titleText() {
      const r = this.recipe
      return r && r.title ? r.title : 'Recipe'
    },
    ingredients() {
      const r = this.recipe
      return Array.isArray(r?.ingredients) ? r.ingredients : []
    },
    steps() {
      const r = this.recipe
      return Array.isArray(r?.steps) ? r.steps : []
    },
  },
  methods: {
    bullet(ing) {
      return `• ${ing}`
    },
    stepNum(idx, st) {
      return `${idx + 1}. ${st}`
    },
  },
  async onMounted() {
    try {
      this.loading = true
      this.error = ''
      const data = await getRecipeById(this.id)
      if (!data) {
        this.error = 'Recipe not found.'
      } else {
        this.recipe = data
      }
    } catch (e) {
      this.error = e?.message || 'Failed to load recipe.'
    } finally {
      this.loading = false
    }
  },
  input: {
    back() {
      this.$router.back()
    },
  },
})
