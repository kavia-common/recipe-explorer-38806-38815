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
    <Element w="1920" h="1080" :color="${theme.colors.background}">
      <Element x="0" y="0" w="1920" h="420" :src="$recipe && $recipe.image ? $recipe.image : 'assets/placeholder.jpg'" />
      <Element x="0" y="0" w="1920" h="420" :color="${theme.colors.overlay}" alpha="0.15" />

      <Element x="120" y="440" w="1680" h="80" :color="${theme.colors.surface}" radius="${theme.radii.lg}">
        <Text x="24" y="22" fontSize="36" :textColor="${theme.colors.text}" :content="$recipe && $recipe.title ? $recipe.title : 'Recipe'" />
      </Element>

      <Element x="120" y="540" w="800" h="440" :color="${theme.colors.surface}" radius="${theme.radii.lg}">
        <Text x="24" y="20" fontSize="28" :textColor="${theme.colors.text}" content="Ingredients" />
        <Element x="24" y="64" w="752" h="356">
          <Text :for="(ing, idx) in $recipe && $recipe.ingredients ? $recipe.ingredients : []" :key="$idx" :y="$idx * 32" fontSize="22" :textColor="${theme.colors.text}" :content="'• ' + $ing" />
        </Element>
      </Element>

      <Element x="940" y="540" w="860" h="440" :color="${theme.colors.surface}" radius="${theme.radii.lg}">
        <Text x="24" y="20" fontSize="28" :textColor="${theme.colors.text}" content="Steps" />
        <Element x="24" y="64" w="812" h="356">
          <Text :for="(st, idx) in $recipe && $recipe.steps ? $recipe.steps : []" :key="$idx" :y="$idx * 34" fontSize="22" :textColor="${theme.colors.text}" :content="($idx + 1) + '. ' + $st" />
        </Element>
      </Element>

      <Element x="860" y="440" w="200" h="200" :alpha="$loading ? 1 : 0">
        <Spinner label="Loading..." />
      </Element>
      <Element x="360" y="420" :alpha="$error ? 1 : 0">
        <ErrorState :message="$error" />
      </Element>

      <Text x="120" y="1000" fontSize="20" :textColor="${theme.colors.textMuted}" content="Press Back to return" />
    </Element>
  `,
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
