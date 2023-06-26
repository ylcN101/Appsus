import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'
import UserMsg from '../../../cmps/UserMsg.js'

export default {
  template: `
        <section class="mail-compose" >
            <div class="mail-compose-header">
                <h4 ref="composeHeader">New Message</h4>
                <a @click="closeCompose">x</a>
            </div>
            <form @submit.prevent="sendMail(mail.id)">
              
                <div class="mail-compose-inputs">
                  <input type="text" v-model="mail.to" placeholder="Recipients" required>
                  <input type="text" v-model="mail.subject" placeholder="Subject" required>
                </div>
                <textarea @focusout="saveToDraft(mail.id)"  class="text-area" v-model="mail.body"   required></textarea>
                <button class="compose-btn">Send</button>
              </form>
        </section>
    `,
  data() {
    return {
      mail: {
        to: '',
        subject: '',
        body: '',
        removedAt: null,
        from: '',
      },
    }
  },

  created() {
    //we need to check if the mail is a reply or a new mail
    if (this.$route.params.mailId) {
      mailService.get(this.$route.params.mailId).then((mail) => {
        //if the mail already have id we need to save the current id and not to create a new one
        this.mail.id = mail.id
        this.mail.to = mail.from
        this.mail.subject = mail.subject
        this.mail.body = mail.body
      })
    }
  },

  methods: {
    sendMail(mailId) {
      mailService.sendMail(this.mail)
      this.$router.push('/mail')
      eventBusService.emit('show-msg', { txt: 'Mail Sent!', type: 'success' })
    },
    loadMails() {
      mailService.query().then((mails) => {
        this.mails = mails
      })
    },

    closeCompose() {
      this.$emit('closeCompose')
      // this.loadMails()
      console.log('closeCompose')
      this.$router.push('/mail')
    },

    saveToDraft(mailId) {
      if (!this.mail.body) return
      if (this.mail.id) return
      mailService.saveToDraft(this.mail)
      this.$refs.composeHeader.innerText = 'Draft Saved!'
    },
  },
}
