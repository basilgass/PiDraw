import DefaultTheme from 'vitepress/theme'
import type {Theme} from 'vitepress'
import PiDrawExample from './PiDrawExample.vue'
import Playground from './Playground.vue'
import AnimationControls from './AnimationControls.vue'
import ControlsPlayground from './ControlsPlayground.vue'
import ZoomControls from './ZoomControls.vue'
import SlidesControls from './SlidesControls.vue'

export default {
    extends: DefaultTheme,
    enhanceApp({app}) {
        app.component('PiDrawExample', PiDrawExample)
        app.component('Playground', Playground)
        app.component('AnimationControls', AnimationControls)
        app.component('ControlsPlayground', ControlsPlayground)
        app.component('ZoomControls', ZoomControls)
        app.component('SlidesControls', SlidesControls)
    },
} satisfies Theme
