import { svgService } from '../../../services/svg-service.js'
export default {
  template: `
    <section class="mobile-hamburger">
    <div class="menuToggle" @click="toggleMenu">
    <input type="checkbox" :checked="isMenuOpen" />
    <span></span>
    <span></span>
    <span></span>
    
    <ul class="menu">
        <li @click= "setFilter('Inbox')"><i v-html="getMailSvg('inbox')"></i><h5>Inbox</h5></li>
        <li @click= "setFilter('Sent')"><i v-html="getMailSvg('sent')"></i><h5>Sent</h5></li>
        <li @click= "setFilter('Trash')"><i v-html="getMailSvg('trash')"></i><h5>Trash</h5></li>
        <li @click= "setFilter('Draft')"><i v-html="getMailSvg('drafts')"></i><h5>Draft</h5></li>
        <li @click= "setFilter('Starred')"><i v-html="getMailSvg('star')"></i><h5>Starred</h5></li>
    </ul>
  </div>
</section>
    `,

  data() {
    return {
      isMenuOpen: false,
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    getMailSvg(iconName) {
      return svgService.getMailSvg(iconName)
    },
    setFilter(filterBy) {
      this.$emit('filtered', filterBy)
    },
    closeMenu() {
      this.isMenuOpen = false
    },
  },
}
