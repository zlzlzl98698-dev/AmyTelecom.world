import DefaultTheme from 'vitepress/theme'
import './custom.css'
import BrandCard from './components/BrandCard.vue'
import SpeedTestChart from './components/SpeedTestChart.vue'
import UnlockMatrix from './components/UnlockMatrix.vue'
import NetworkTopology from './components/NetworkTopology.vue'
import AffDisclaimer from './components/AffDisclaimer.vue'
import PagefindSearch from './components/PagefindSearch.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BrandCard', BrandCard)
    app.component('SpeedTestChart', SpeedTestChart)
    app.component('UnlockMatrix', UnlockMatrix)
    app.component('NetworkTopology', NetworkTopology)
    app.component('AffDisclaimer', AffDisclaimer)
    app.component('PagefindSearch', PagefindSearch)
  }
}
