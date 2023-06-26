export default {
  props: ['txt', 'length'],
  template: `
    <section class="long-txt">
        <h4 v-if="!isLong">{{displayTxt}}</h4>
        <h4 v-else>{{txt}}</h4>
    </section>
    `,
  data() {
    return {
      isLong: false,
    }
  },
  computed: {
    displayTxt() {
      return this.txt.substring(0, this.length) + '...'
    },
  },
  methods: {
    toggleTxt() {
      this.isLong = !this.isLong
    },
  },
}
