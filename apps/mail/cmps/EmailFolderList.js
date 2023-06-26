import { svgService } from '../../../services/svg-service.js'

export default {
  template: `
        <section class="mail-folders">
        <div @click="OpenCompose" class="mail-nav">
          <i class="fa-solid fa-pencil"></i>
            <a >Compose</a>
          </div>
          <article v-for="folder in folders" :key="folder.id" class="folder-preview-container" >
          <i v-if="folder.name === 'Inbox'" className="icon-folder" v-html="getMailSvg('inbox')"></i>
           <i v-else-if="folder.name === 'Sent'" className="icon-folder" v-html="getMailSvg('sent')"></i>
           <i v-else-if="folder.name === 'Trash'" className="icon-folder" v-html="getMailSvg('trash')"></i>
           <i v-else-if="folder.name === 'Draft'" className="icon-folder" v-html="getMailSvg('drafts')"></i>     
           <i v-else-if="folder.name === 'Starred'" className="icon-folder" v-html="getMailSvg('star')"></i>

            <span @click="setFilter(folder.name)">{{folder.name}}</span>
          </article>
        </section>
    `,
  data() {
    return {
      folders: [
        {
          id: 1,
          name: 'Inbox',
        },
        {
          id: 2,
          name: 'Sent',
        },
        {
          id: 3,
          name: 'Trash',
        },
        {
          id: 4,
          name: 'Draft',
        },
        {
          id: 5,
          name: 'Starred',
        },
      ],
    }
  },

  methods: {
    setFilter(filterBy) {
      this.$emit('filtered', filterBy)
    },

    getMailSvg(iconName) {
      return svgService.getMailSvg(iconName)
    },

    howManyUnreadMails() {
      this.$emit('howManyUnreadMails')
    },
  },
}
