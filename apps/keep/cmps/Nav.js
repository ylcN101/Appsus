import { svgService } from '../../../services/svg-service.js'

export default {
  template: `
    <div className="fixed">
    <div class="icon light-bulb" v-html="getSvg('lightBolb')"></div>
    <div class="icon" v-html="getSvg('bell')"></div>
    <div class="icon" v-html="getSvg('tag')"></div>
    <div class="icon" v-html="getSvg('tag')"></div>
    <div class="icon" v-html="getSvg('tag')"></div>
    <div class="icon" v-html="getSvg('pencil')"></div>
    <div class="icon" v-html="getSvg('archive')"></div>
    <div class="icon" v-html="getSvg('trash')"></div>
    </div>
  

    
    `,

  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
  },
}
