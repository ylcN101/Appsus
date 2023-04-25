export default {
  props: ['info'],
  template: `
        <section class="mail-list">
            //we use v-for to loop over the mails array
            <ul>
                <li v-for="mail in mails" :key="mail.id" @click="selectMail(mail)">
                    <h3>{{mail.subject}}</h3>
                    <p>{{mail.body}}</p>
                    <p>{{mail.sentAt}}</p>
                </li>
            </ul>
        </section>
    `,
  data() {
    return {
      mails: null,
      selectedMail: null,
    }
  },
  created() {
    mailService.query().then((mails) => (this.mails = mails))
  },
  methods: {
    selectMail(mail) {
      this.selectedMail = mail
      console.log('selectedMail', mail)
    },
  },
  components: {
    InboxMail,
    StarMail,
    TrashMail,
  },
}
