import { svgService } from './../../../services/svg-service.js'
import NoteDetails from '../pages/NoteDetails.js'
import { noteService } from '../services/note-service.js'
import NoteText from './NoteText.js'
import NoteTypeList from './NoteTypeList.js'
import NoteTypeImg from './NoteTypeImg.js'
import NoteTypeVideo from './NoteTypeVideo.js'
import { utilService } from '../../../services/util.service.js'

export default {
  props: ['note', 'notes'],
  emits: ['unSetting'],
  template: `
   
        <section class="note-preview-section"  :style="bgColor"   @mouseout="showTools = false" @mouseover="showTools = true">
        
      <RouterLink :to="'/noteIndex/Details/'+note.id">
      <div @click="test" :class="note.type ==='NoteImg' || note.type === 'NoteVid' ? 'no-padding' : ''" class="note-preview-container">

     
            <NoteText  v-if="note.type === 'NoteTxt'" :note="note"/>
            <NoteTypeList v-if="note.type === 'NoteTodos'"  :note="note"/>
            <NoteTypeImg v-if="note.type === 'NoteImg'" :note="note" />
            <NoteTypeVideo v-if="note.type === 'NoteVid'" :note="note" /> 

      </div>
      </RouterLink>
      <div :class="opacity">
      <div @click="pinNote" class="tag icon" v-html="getSvg('pin')"></div>
      <div @click.prevenet="onRemoveNote(note.id)"  className="icon" v-html="getSvg('trash')"></div>
      <div className="color">
      <input  v-model="note.style.backgroundColor" type="color" id="color" />
      <div class="icon" v-html="getSvg('colorPallet')"></div>
    </div>
    <div @click="duplicateNote" class="icon" v-html="getSvg('duplicate')"></div>
      
      </div>

        </section>
      
       
    `,

  data() {
    return {
      showTools: false,
      isSelected: false,
    }
  },

  methods: {
    pinNote() {
      this.note.isPinned = !this.note.isPinned
    },

    duplicateNote() {
      this.$emit('unSetting', this.note)
      const copy = JSON.parse(JSON.stringify(this.note))
      copy.id = utilService.makeId()
      noteService.saveNote(copy).then(note => {
        this.notes.unshift(note)
      })
    },

    test() {
      document.querySelector('body').style.overflow = 'hidden'
      setTimeout(() => {
        document.querySelector('.note-details').style.opacity = '1'
      }, 300)
      this.isSelected = true
      document.querySelector('.backdrop').style.opacity = '0.6'
      document.querySelector('.backdrop').style.zIndex = '1'
    },

    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },

    onRemoveNote(noteId) {
      console.log('removing note')
      this.$emit('removeNote', noteId)
    },
  },

  computed: {
    imgSrc() {
      return `https://source.unsplash.com/random/200x200?sig=${Math.floor(
        Math.random() * 20
      )}`
    },

    opacity() {
      if (!this.showTools) return 'preview-tools noOpacity'
      else return 'preview-tools opacity'
    },

    bgColor() {
      return `background-color: ${this.note.style.backgroundColor}`
    },
  },

  created() {
    // console.log(this.note)
  },

  components: {
    NoteTypeVideo,
    NoteTypeImg,
    NoteTypeList,
    NoteText,
    NoteDetails,
  },
}
