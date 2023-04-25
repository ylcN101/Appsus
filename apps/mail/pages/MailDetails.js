import { eventBusService } from '../../../services/event-bus.service.js'
import { mailService } from '../services/mail.service.js'
import { svgService } from '../../../services/svg-service.js'

export default {
  template: `
        <section class="mail-details" v-if="mail">
          <div class="mail-details-btns">
            <RouterLink :to="'/mail'"><span class="details-arrow">&#8592;</span></RouterLink>
            <i class="fa-regular fa-trash-can" @click="remove(mail.id)"></i>
          </div>
          <div class="mail-details-header">
            <h3>To: {{mail.to}}</h3>
            <h3>From: {{mail.from}}</h3>
            <h3>Subject: {{mail.subject}}</h3>
          </div>
            <p class="mail-p">{{mail.body}}</p>
        </section>
    `,
  data() {
    return {
      mail: null,
    }
  },
  created() {
    const { mailId } = this.$route.params
    mailService.get(mailId).then((mail) => (this.mail = mail))
  },
  methods: {
    remove(mailId) {
      this.mail.isTrash = true
      mailService.removeToTrash(mailId)
      eventBusService.emit('show-msg', {
        txt: 'Mail Removed!',
        type: 'success',
      })
      this.$router.push('/mail')
    },
    saveLabel(mail) {
      console.log(mail)
      mailService.save(mail)
    },

    getMailSvg(iconName) {
      return svgService.getMailSvg(iconName)
    },
  },
}
