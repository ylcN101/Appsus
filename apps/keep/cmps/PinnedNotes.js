import NotePreview from './NotePreview.js'

export default {
  props: ['note', 'notes'],
  template: `

<section className="pinned-notes container">
    <span class="pinned">PINNED</span>
  <ul class="notes-list">
                <li class="note" v-for="note in pinnedNotes" :key="note.id">
            
                    <notePreview @removeNote="removeNote"  @click="setSelectedNote(note)"  :notes="pinnedNotes" :note="note" />
          
                </li>
            </ul>


  </section>
    
    `,

  data() {
    return {
      pinnedNotes: null,
    }
  },

  created() {
    setTimeout(() => {
      this.pinnedNotes = this.notes.filter(n => n.isPinned)
      console.log(this.notes)
    }, 800)
  },

  methods: {
    setSelectedNote(note) {
      this.$emit('setNote', note)
    },
    removeNote(noteId) {
      console.log(noteId)
      noteService.remove(noteId).then(() => {
        const idx = this.notes.findIndex(note => note.id === noteId)
        this.notes.splice(idx, 1)
      })

      console.log('Note Removed')
    },
  },

  components: {
    NotePreview,
  },
}
