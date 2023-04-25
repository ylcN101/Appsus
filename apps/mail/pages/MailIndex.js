import { mailService } from '../services/mail.service.js'

import MailList from '../cmps/MailList.js'
import EmailFolderList from '../cmps/EmailFolderList.js'
import EmailFilter from '../cmps/EmailFilter.js'
import MailDetails from './MailDetails.js'
import MailCompose from './MailCompose.js'
import AppHeader from './../../../cmps/AppHeader.js'

import { utilService } from '../../../services/util.service.js'

export default {
  template: `
  <AppHeader/>
        <section class="mail-index">
          <div class="mail-nav">
          <i class="fa-solid fa-pencil"></i>
            <a @click="OpenCompose">Compose</a>
          </div>
          <MailCompose v-if="isCompose" @closeCompose="closeCompose" />
          <RouterView />
          <EmailFilter @filtered="setFilter" />
          <MailList
          v-if="mails"
          :mails= "filteredMails"
          @selected="selectMail"
          />
          <EmailFolderList @filtered="setFilter"/>


        </section>
        
        
    `,
  data() {
    return {
      mails: null,
      filterBy: 'Inbox',
      mail: null,
      isCompose: null,
    }
  },
  created() {
    this.loadMails()
  },

  watch: {
    $route(to) {
      if (to.path === '/mail') {
        this.isCompose = false
        // this.loadMails()
      }
    },
  },

  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy
      console.log('filterBy', filterBy)
    },
    selectMail(mailId) {
      mailService.updateIsRead(mailId)
    },
    loadMails() {
      mailService.query().then(mails => {
        this.mails = mails
      })
    },
    closeCompose() {
      this.isCompose = false
      console.log('this.isCompose', this.isCompose)
      this.$router.push('/mail')
    },

    OpenCompose(newId) {
      this.isCompose = !this.isCompose
      if (!this.isCompose) {
        this.isCompose = false
        this.$router.push('/mail')
      } else {
        const newId = utilService.makeId()
        this.$router.push('/mail/compose/' + newId)
      }
    },
  },
  computed: {
    filteredMails() {
      this.loadMails()
      const { subject } = this.filterBy
      if (subject) {
        return this.mails.filter(mail => {
          return mail.subject.includes(subject)
        })
      } else if (!this.filterBy) return this.mails
      else if (this.filterBy === 'Trash') {
        return this.mails.filter(mail => mail.isTrash)
      } else if (this.filterBy === 'Starred') {
        return this.mails.filter(
          mail => mail.isStared && !mail.isTrash && !mail.isSent
        )
      } else if (this.filterBy === 'Inbox') {
        return this.mails.filter(
          mail => !mail.isTrash && !mail.isSent && !mail.isDraft
        )
      } else if (this.filterBy === 'Sent') {
        return this.mails.filter(
          mail => mail.isSent && !mail.isTrash && !mail.isDraft
        )
      } else if (this.filterBy === 'Draft') {
        return this.mails.filter(
          mail => mail.isDraft && !mail.isTrash && !mail.isSent
        )
      } else if (subject === '') {
        return this.mails.filter(
          mail => !mail.isTrash && !mail.isSent && !mail.isDraft
        )
      }
    },
  },

  components: {
    AppHeader,
    MailList,
    EmailFolderList,
    EmailFilter,
    MailDetails,
    MailCompose,
  },
}
