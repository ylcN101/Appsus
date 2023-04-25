import LongText from '../../../cmps/LongTxt.js'
import { eventBusService } from '../../../services/event-bus.service.js'
import { svgService } from '../../../services/svg-service.js'
import { mailService } from '../services/mail.service.js'

export default {
  props: ['mail'],
  template: `

<article class="mail-preview" @click="renderDetails(mail.id)" :class="read">
      <div class="mail-header">
        <i v-if="mail.isStared" className="icon" v-html="getMailSvg('starFill')" @click.stop="isStar"></i>
        <i v-else  className="icon" v-html="getMailSvg('star')" @click.stop="isStar"></i> 
        <h4 >{{mail.from}}</h4>
      </div>
      <h4 class="subject-mail"> {{mail.subject}}</h4>
      <div class="mail-content">
        <LongText :txt="mail.body" :length="80" class="mail-body">
          </LongText>
        </div>
        <div class="mail-footer">
          <i class="envelope fa-sharp fa-solid fa-envelope-open" @click.stop="markAsRead(mail.id)"></i>
          <i className="icon" v-html="getMailSvg('trash')" @click.stop="deleteMail(mail.id)"></i>
        <h5 class="mail-date">{{formatDate}}</h5>
        </div>
      </article>
    `,

  components: {
    LongText,
  },

  methods: {
    mailSelected(mailId) {
      this.mail.isRead = true
      this.$router.push(`/mail/details/${mailId}`)
      this.$emit('selected', mailId)
    },
    isStar() {
      this.mail.isStared = !this.mail.isStared
      mailService.save(this.mail)
    },

    renderDetails(mailId) {
      const currMail = this.mail
      if (currMail.isDraft) {
        this.$router.push(`/mail/compose/${mailId}`)
      } else {
        this.mailSelected(mailId)
      }
    },
    getMailSvg(iconName) {
      return svgService.getMailSvg(iconName)
    },
    deleteMail(mailId) {
      this.mail.isTrash = true
      mailService.removeToTrash(mailId)
      this.$emit('deleted', mailId)
      eventBusService.emit('show-msg', {
        txt: 'Mail Removed!',
        type: 'success',
      })
    },
    markAsRead(mailId) {
      this.mail.isRead = !this.mail.isRead
      mailService.save(this.mail)
    },
  },
  computed: {
    formatDate() {
      const date = new Date(this.mail.sentAt)
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      if (date.toDateString() === today.toDateString()) {
        //show the hours
        const option = {
          hour: 'numeric',
          minute: 'numeric',
        }
        const formattedDate = new Intl.DateTimeFormat('en-US', option).format(
          date
        )
        return formattedDate
      } else if (date.toDateString() === yesterday.toDateString()) {
        //show date by day and month
        const option = {
          month: 'short',
          day: 'numeric',
        }
        const formattedDate = new Intl.DateTimeFormat('en-US', option).format(
          date
        )
        return formattedDate
      } else {
        //if its more than year ago show the year
        const option = {
          month: 'short',
          day: 'numeric',
        }
        const formattedDate = new Intl.DateTimeFormat('en-US', option).format(
          date
        )
        return formattedDate
      }
    },
    read() {
      if (this.mail.isRead) return 'read'
      else return ''
    },
  },
}
