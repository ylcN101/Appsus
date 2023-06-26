import { mailService } from '../services/mail.service.js'

import MailList from '../cmps/MailList.js'
import EmailFolderList from '../cmps/EmailFolderList.js'
import MobileHamburger from '../cmps/MobileHamburger.js'
import EmailFilter from '../cmps/EmailFilter.js'
import MailDetails from './MailDetails.js'
import MailCompose from './MailCompose.js'
import AppHeader from './../../../cmps/AppHeader.js'

import { utilService } from '../../../services/util.service.js'

export default {
  template: `
  <AppHeader/>
        <section class="mail-index" :class="{smallScreen: !largeScreen}">
          <MailCompose v-if="isCompose" @closeCompose="closeCompose" />
          <RouterView />
          <EmailFilter @filtered="setFilter" />
          <MailList
          v-if="mails"
          :mails= "filteredMails"
          @selected="selectMail"
          />
          <MobileHamburger  v-if="!largeScreen" @filtered="setFilter"/>
          <EmailFolderList  @filtered="setFilter" v-if="largeScreen"/>
        </section>

        
    `,
  data() {
    return {
      mails: null,
      filterBy: 'Inbox',
      mail: null,
      isCompose: null,
      largeScreen: true,
    }
  },
  created() {
    this.isLargeScreen()
    window.addEventListener('resize', this.isLargeScreen)
    console.log('this.isLargeScreen', this.largeScreen)
    this.loadMails()
  },

  watch: {
    $route(to) {
      if (to.path === '/mail') {
        this.isCompose = false
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
      mailService.query().then((mails) => {
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

    isLargeScreen() {
      if (window.innerWidth > 760) {
        this.largeScreen = true
      } else {
        this.largeScreen = false
      }
    },
  },
  computed: {
    filteredMails() {
      this.loadMails()
      const { subject } = this.filterBy
      if (subject) {
        return this.mails.filter((mail) => {
          return mail.subject.includes(subject)
        })
      } else if (!this.filterBy) return this.mails
      else if (this.filterBy === 'Trash') {
        return this.mails.filter((mail) => mail.isTrash)
      } else if (this.filterBy === 'Starred') {
        return this.mails.filter(
          (mail) => mail.isStared && !mail.isTrash && !mail.isSent
        )
      } else if (this.filterBy === 'Inbox') {
        return this.mails.filter(
          (mail) => !mail.isTrash && !mail.isSent && !mail.isDraft
        )
      } else if (this.filterBy === 'Sent') {
        return this.mails.filter(
          (mail) => mail.isSent && !mail.isTrash && !mail.isDraft
        )
      } else if (this.filterBy === 'Draft') {
        return this.mails.filter(
          (mail) => mail.isDraft && !mail.isTrash && !mail.isSent
        )
      } else if (subject === '') {
        return this.mails.filter(
          (mail) => !mail.isTrash && !mail.isSent && !mail.isDraft
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
    MobileHamburger,
  },
}
