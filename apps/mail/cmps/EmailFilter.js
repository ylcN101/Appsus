export default {
  props: ['txtFilter'],
  template: `
        <section class="email-filter">

            <div class="filter-subject">
            <input type="text" placeholder="Search by subject" v-model="filterBy.subject" @input="setFilter" />
            </div>
        </section>
    `,
  data() {
    return {
      filterBy: {
        subject: '',
      },
    }
  },
  methods: {
    setFilter() {
      this.$emit('filtered', this.filterBy)
    },
  },
}
