import NoteList from '../cmps/NoteList.js'
import { noteService } from '../../keep/services/note-service.js'
import NoteHeader from '../cmps/NoteHeader.js'
import TakeANote from '../cmps/TakeANote.js'
import Nav from '../cmps/Nav.js'

export default {
  template: `
 
   <NoteHeader @setFilter="settingFilter" />
 
   <section className="keep-app">

<section className="left-nav">
  <Nav/>
</section>

   <section className="keep-flex">

<TakeANote @changeNoteType="settingsNoteType"  :notes="notes" :note="note"/>

<section className="note-list">

<NoteList @unSetFinal="unSettingFinal"  @setNote="settingsNote" :note="note" :notes="filteredNotes" />
<RouterView @unset="unSetNote"  v-if="selectedNote" :notes="notes" :note="selectedNote" />

</section>


</section>
<RouterLink to="/NoteIndex"><div class="backdrop" @click="closeModal()"></div></RouterLink>

   </section>

  





 
`,

  watch: {
    notes: {
      handler() {
        this.note = noteService.createNewNote()
      },
      deep: true,
    },
  },

  data() {
    return {
      note: noteService.createNewNote(),
      notes: null,
      selectedNote: null,
      filterBy: {},
    }
  },

  methods: {
    unSettingFinal() {
      // this.unSetNote()
      // this.note = null
    },

    closeModal() {
      document.querySelector('body').style.overflow = ''
      document.querySelector('.note-details').style.opacity = '0'
      document.querySelector('.backdrop').style.opacity = '0'
      document.querySelector('.backdrop').style.zIndex = '-1'
    },

    unSetNote() {
      this.selectedNote = null
      console.log('note is null')
    },

    settingsNote(note) {
      this.selectedNote = note
      console.log(note)
    },

    settingFilter(filterBy) {
      this.filterBy = filterBy
    },

    settingsNoteType(type) {
      console.log(type)
      if (type === 'list') {
        this.note = noteService.createNoteList()
      } else if (type === 'text') {
        this.note = noteService.createNewNote()
      } else if (type === 'img') {
        this.note = noteService.createNoteImg()
      } else {
        this.note = noteService.createNoteVid()
      }
      console.log(this.note)
    },
  },

  created() {
    noteService.query().then(notes => (this.notes = notes))
    setTimeout(() => console.log(this.notes), 1500)
  },

  computed: {
    filteredNotes() {
      if (!this.filterBy.text) return this.notes

      const searchStr = this.filterBy.text.toLowerCase()
      const searchStrTitle = this.filterBy.title.toLowerCase()
      const filteredNotes = this.notes.filter(note => {
        return (
          note.info.txt.toLowerCase().includes(searchStr) ||
          note.info.title.toLowerCase().includes(searchStrTitle)
        )
      })
      return filteredNotes
    },
  },

  components: {
    Nav,
    TakeANote,
    NoteHeader,
    NoteList,
  },
}
