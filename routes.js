import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import MailIndex from './apps/mail/pages/MailIndex.js'
import NoteDetails from './apps/keep/pages/NoteDetails.js'
import MailDetails from './apps/mail/pages/MailDetails.js'
import EmailTrash from './apps/mail/cmps/EmailTrash.js'
import NoteIndex from './apps/keep/pages/NoteIndex.js'
import MailCompose from './apps/mail/pages/MailCompose.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
    },

    {
      path: '/about',
      component: AboutUs,
    },

    {
      path: '/mail',
      component: MailIndex,
      children: [
        {
          path: 'details/:mailId?',
          component: MailDetails,
        },
        {
          path: 'compose/:mailId?',
          component: MailCompose,
        },
      ],
    },

    {
      path: '/noteIndex',
      component: NoteIndex,
      children: [
        {
          path: 'Details/:noteId',
          component: NoteDetails,
        },
      ],
    },

    {
      path: '/mail/:mailId',
      component: MailDetails,
    },
  ],
}

export const router = createRouter(routerOptions)
