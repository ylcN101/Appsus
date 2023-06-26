import MailPreview from './MailPreview.js'
import { mailService } from '../services/mail.service.js'
// import MailCompose from '../pages/MailCompose.js'

//we need to display the list of mails and the details of the mail but we need to know if we are on the details page or not

export default {
  props: ['mails'],
  template: `

    <section class="mail-list">
      <RouterView />
      <article  v-for="mail in mails" :key="mail.id" v-if="notOnDetailsPage()">
        <MailPreview :mail="mail" @selected="selectMail" @update="updateMail" @isStar="isStar"/>
      </article>
    </section>
    `,

  data() {
    return {
      selectedMailId: null,
      mail: null,
    }
  },
  watch: {
    $route(to) {
      if (to.path === '/mail') {
        // this.loadMails()
      }
    },
  },

  created() {
    this.loadMails()
  },

  computed: {
    mailId() {
      console.log('mailId', this.$route.params.mailId)
      return this.$route.params.mailId
    },
  },

  methods: {
    selectMail(mailId) {
      this.selectedMailId = mailId
      this.$emit('selected', mailId)
    },
    updateMail(mailId) {
      this.$emit('update', mailId)
      // this.loadMails()
    },
    isStar(mailId) {
      this.$emit('isStar', mailId)
      // this.loadMails()
    },
    loadMails() {
      mailService.query().then((mails) => {
        this.mail = mails
      })
    },

    notOnDetailsPage() {
      return (
        this.$route.path === '/mail' ||
        this.$route.path === `/mail/compose/${this.mailId}`
      )
    },
  },

  components: {
    MailPreview,
  },
}
