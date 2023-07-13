import { svgService } from '../../../services/svg-service.js'
import NoteFilter from './NoteFilter.js'
import AppsModal from '../../../cmps/AppsModal.js'

export default {
  template: `
          <header class="app-header">
              <div className="logo-keep">
                <div class='burger' style="padding-top:5px"  v-html="getSvg('bars')" ></div>
                <img class="logo" src='./assets/style/apps/keep/imgs/keep.png' alt="" />
                <RouterLink to="/"><h1>Appsus</h1></RouterLink>
           
            <div  class="glass-icon" v-html="getSvg('search')" ></div>
           <NoteFilter @filter="setFilterBy" />
            </div>

           <img @click="openModal" class="apps-icon" src="./assets/img/apps-icon.png" alt="" />
           <AppsModal v-show="showModal" />
            
          </header>
      `,

  data() {
    return {
      showModal: false,
    }
  },

  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },

    setFilterBy(filterBy) {
      this.$emit('setFilter', filterBy)
    },
    openModal() {
      this.showModal = !this.showModal
    },
  },

  components: {
    NoteFilter,
    AppsModal,
  },
}
