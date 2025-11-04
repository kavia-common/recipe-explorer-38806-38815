import Blits from '@lightningjs/blits'
import theme, { applyTheme } from '../theme/theme'
import SearchBar from '../components/SearchBar'
import RecipeCard from '../components/RecipeCard'
import Spinner from '../components/Spinner'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'
import { getRecipes } from '../data/dataService'

export default Blits.Component('HomeScreen', {
  components: { SearchBar, RecipeCard, Spinner, ErrorState, EmptyState },
  state() {
    return {
      loading: true,
      error: '',
      recipes: [],
      query: '',
      focusIndex: 0,
      cols: 3,
      gap: 24,
      cardW: 420,
      cardH: 280,
    }
  },
  template: `
    <Element w="1920" h="1080" :color="$bgColor">
      <Text x="120" y="64" fontSize="44" textColor="0x000000ff" content="Recipe Explorer" />
      <Element x="120" y="120">
        <SearchBar placeholder="Search recipes, tags, ingredients..." :onSearch="$onSearch" />
      </Element>

      <Element x="120" y="240" w="1680" h="760">
        <Element :alpha="$loadingAlpha" x="740" y="280">
          <Spinner label="Loading recipes..." />
        </Element>

        <Element :alpha="$errorAlpha" x="240" y="200">
          <ErrorState :message="$error" />
        </Element>

        <Element :alpha="$emptyAlpha" x="240" y="200">
          <EmptyState message="No recipes found. Try another search." />
        </Element>

        <Element :alpha="$gridAlpha" w="1680" h="760">
          <Element 
            :for="(item, idx) in $recipesWithPos" 
            :key="$item.id"
            :x="$item.x" 
            :y="$item.y"
          >
            <RecipeCard :item="$item" :w="$cardW" :h="$cardH" />
          </Element>
        </Element>
      </Element>

      <Text x="120" y="1020" fontSize="20" textColor="0x000000ff" content="Use arrows to focus, Enter to open. Back to exit." />
    </Element>
  `,
  computed: {
    bgColor() { return theme.colors.background },
    loadingAlpha() { return this.loading ? 1 : 0 },
    errorAlpha() { return this.error ? 1 : 0 },
    emptyAlpha() { return (!this.loading && !this.error && this.recipes.length === 0) ? 1 : 0 },
    gridAlpha() { return (!this.loading && !this.error && this.recipes.length > 0) ? 1 : 0 },
    recipesWithPos() {
      const arr = Array.isArray(this.recipes) ? this.recipes : []
      const out = []
      for (let i = 0; i < arr.length; i++) {
        const r = arr[i]
        const c = i % this.cols
        const rIdx = Math.floor(i / this.cols)
        out.push({
          id: r && r.id ? r.id : String(i),
          title: r && r.title ? r.title : '',
          description: r && r.description ? r.description : '',
          image: r && r.image ? r.image : 'assets/placeholder.jpg',
          tags: r && r.tags ? r.tags : [],
          x: c * (this.cardW + this.gap),
          y: rIdx * (this.cardH + this.gap),
        })
      }
      return out
    },
  },
  methods: {
    // PUBLIC_INTERFACE
    async onSearch(q) {
      this.query = q || ''
      await this._load()
    },
    renderCard({ item, w = 420, h = 280 }) {
      const onSelect = (it) => this.$router.to(`/details/${it.id}`)
      return this.$render(RecipeCard, { item, w, h, onSelect })
    },
    xPos(i) {
      const c = i % this.cols
      return c * (this.cardW + this.gap)
    },
    yPos(i) {
      const r = Math.floor(i / this.cols)
      return r * (this.cardH + this.gap)
    },
    async _load() {
      try {
        this.loading = true
        this.error = ''
        const data = await getRecipes(this.query)
        this.recipes = Array.isArray(data) ? data : []
        this.focusIndex = 0
      } catch (e) {
        this.error = (e && e.message) ? e.message : 'Failed to load recipes.'
      } finally {
        this.loading = false
      }
    },
  },
  async onMounted() {
    applyTheme(this.app)
    await this._load()
  },
  input: {
    left() {
      if (!this.recipes.length) return
      this.focusIndex = Math.max(0, this.focusIndex - 1)
    },
    right() {
      if (!this.recipes.length) return
      this.focusIndex = Math.min(this.recipes.length - 1, this.focusIndex + 1)
    },
    up() {
      if (!this.recipes.length) return
      this.focusIndex = Math.max(0, this.focusIndex - this.cols)
    },
    down() {
      if (!this.recipes.length) return
      this.focusIndex = Math.min(this.recipes.length - 1, this.focusIndex + this.cols)
    },
  },
})
