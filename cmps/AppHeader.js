import AppsModal from './AppsModal.js'

export default {
  template: `
        <header class="app-header">
            <RouterLink to="/"><h1>Appsus</h1></RouterLink>
            
            <img @click="openModal" class="apps-icon" src="../assets/img/apps-icon.png" alt="" />
            <AppsModal v-show="showModal" />
        </header>
    `,

  data() {
    return {
      showModal: false,
    }
  },

  methods: {
    openModal() {
      this.showModal = !this.showModal
    },
  },

  components: {
    AppsModal,
  },
}
