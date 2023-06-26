import NotePreview from './NotePreview.js'
import { noteService } from '../services/note-service.js'
import PinnedNotes from '../cmps/PinnedNotes.js'

export default {
  props: ['notes', 'note'],
  emits: ['setNote', 'unSetFinal'],
  template: `

  <section className="pinned-notes container">
    <span class="pinned">PINNED</span>
  <ul class="notes-list-pinned">
                <li v-show="note.isPinned" class="note" v-for="note in notes" :key="note.id">
            
                    <notePreview @unSetting="unsettingsNote"  v-if="note.isPinned"  @removeNote="removeNote"  @click="setSelectedNote(note)"  :notes="notes" :note="note" />
            
                </li>
            </ul>

  </section>


     <div class="container">
      <span class="others">OTHERS</span>

     <section class="notes">
   
            <ul class="notes-list">
                <li v-show="!note.isPinned"  class="note" v-for="note in notes" :key="note.id">
            
                    <notePreview @unSetting="unsettingsNote"  v-if="!note.isPinned" @removeNote="removeNote" @click="setSelectedNote(note)" :notes="notes" :note="note" />
            
                </li>
            </ul>
         
        </section>
        </div>  
    
    `,

  methods: {
    unsettingsNote(note) {
      this.$emit('unSetFinal', note)
    },

    setSelectedNote(note) {
      console.log(note)
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

  computed: {},

  components: {
    PinnedNotes,
    NotePreview,
  },
}
