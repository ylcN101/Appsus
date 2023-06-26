import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const note_KEY = 'noteDB'

export const noteService = {
  createNoteVid,
  createNoteImg,
  createNoteList,
  saveNote,
  createNewNote,
  query,
  get,
  save,
  remove,
}
_createNotes()

function get(noteId) {
  return storageService.get(note_KEY, noteId)
}

function remove(noteId) {
  return storageService.remove(note_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(note_KEY, note)
  } else {
    return storageService.post(note_KEY, note)
  }
}

function createNewNote() {
  return {
    id: utilService.makeId(4),
    createdAt: 1112222,
    type: 'NoteTxt',
    isPinned: false,
    style: {
      backgroundColor: getColor(),
    },
    info: {
      title: '',
      txt: '',
    },
  }
}

function createNoteImg() {
  return {
    id: '',
    type: 'NoteImg',
    isPinned: false,
    info: {
      url: 'https://source.unsplash.com/random/200x200?sig=1',
      title: '',
      txt: '',
    },
    style: {
      backgroundColor: getColor(),
    },
  }
}

function createNoteVid() {
  return {
    id: '',
    type: 'NoteVid',
    isPinned: false,
    info: {
      url: '',
      title: '',
      txt: '',
    },
    style: {
      backgroundColor: getColor(),
    },
  }
}

function createNoteList() {
  return {
    id: '',
    type: 'NoteTodos',
    isPinned: false,
    style: {
      backgroundColor: getColor(),
    },
    info: {
      txt: '',
      title: '',
      todos: [],
    },
  }
}

function saveNote(note) {
  return storageService.post(note_KEY, note).then(note => {
    return note
  })
}

function _createNotes() {
  let notes = utilService.loadFromStorage(note_KEY)
  if (!notes || !notes.length) {
    notes = [
      {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
          backgroundColor: getColor(),
        },
        info: {
          title: 'Note title',
          txt: 'Fullstack Me Baby!',
        },
      },

      {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,
        info: {
          url: 'https://source.unsplash.com/random/240x240?sig=1',
          title: 'Random image',
          txt: 'Wow ahi',
        },
        style: {
          backgroundColor: getColor(),
        },
      },
      {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        style: {
          backgroundColor: getColor(),
        },
        info: {
          txt: 'This is a note',
          title: 'Get my stuff together',
          todos: [
            { txt: 'Driving license', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 },
          ],
        },
      },
      {
        id: 'n104',
        type: 'NoteTodos',
        isPinned: false,
        style: {
          backgroundColor: getColor(),
        },
        info: {
          txt: 'This is a note',
          title: 'Finish sprint 3',
          todos: [
            { txt: 'Driving license', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 },
          ],
        },
      },
      {
        id: 'n105',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
          backgroundColor: getColor(),
        },
        info: {
          title: 'Go to the gym',
          txt: 'gym at 17:00',
        },
      },
      {
        id: 'n106',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
          backgroundColor: getColor(),
        },
        info: {
          title: 'Watch UFC',
          txt: 'i have to watch Jones vs Gane at ufc 285',
        },
      },
      {
        id: 'n107',
        type: 'NoteVid',
        isPinned: false,
        info: {
          url: 'https://www.youtube.com/embed/9zfwsjOX4n0',
          title: 'UFC 285 Weigh ins',
          txt: '',
        },
        style: {
          backgroundColor: getColor(),
        },
      },
      {
        id: 'n108',
        type: 'NoteTodos',
        isPinned: false,
        style: {
          backgroundColor: getColor(),
        },
        info: {
          txt: 'This is a note',
          title: 'Save money',
          todos: [
            { txt: 'No haircuts', doneAt: null },
            { txt: 'Less orders', doneAt: 187111111 },
          ],
        },
      },
      {
        id: 'n109',
        type: 'NoteTodos',
        isPinned: true,
        style: {
          backgroundColor: getColor(),
        },
        info: {
          txt: 'This is a note',
          title: 'Finish bootcamp',
          todos: [
            { txt: 'Survive bootcamp', doneAt: null },
            { txt: 'remain sane from bootcamp', doneAt: 187111111 },
            { txt: 'Go to gym', doneAt: 187111111 },
          ],
        },
      },
      {
        id: 'n110',
        type: 'NoteImg',
        isPinned: false,
        info: {
          url: 'https://source.unsplash.com/random/240x240?sig=1',
          title: 'Random image',
          txt: 'Wow ahi',
        },
        style: {
          backgroundColor: getColor(),
        },
      },
      {
        id: 'n111',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
          backgroundColor: getColor(),
        },
        info: {
          title: 'Feed dog',
          txt: 'gotta keep him well fed',
        },
      },
      {
        id: 'n112',
        type: 'NoteVid',
        isPinned: false,
        info: {
          url: 'https://www.youtube.com/embed/fRph5rtFiRQ',
          title: 'Attack on titan new season trailer',
          txt: '',
        },
        style: {
          backgroundColor: getColor(),
        },
      },
      {
        id: 'n113',
        type: 'NoteTodos',
        isPinned: false,
        style: {
          backgroundColor: getColor(),
        },
        info: {
          txt: 'This is a note',
          title: 'Keep in mind',
          todos: [
            { txt: 'Do the dishes', doneAt: null },
            { txt: 'Take dog for a walk', doneAt: 187111111 },
            { txt: 'Go to gym', doneAt: 187111111 },
            { txt: 'Play soccer', doneAt: 187111111 },
          ],
        },
      },
      {
        id: 'n114',
        type: 'NoteTodos',
        isPinned: false,
        style: {
          backgroundColor: getColor(),
        },
        info: {
          txt: 'This is a note',
          title: 'How to gain weight',
          todos: [
            { txt: 'Eat every 2 hrs', doneAt: null },
            { txt: 'Drink Gainer at 17:00', doneAt: 187111111 },
            { txt: 'Feel like throwing up', doneAt: 187111111 },
            { txt: 'Eat again', doneAt: 187111111 },
          ],
        },
      },
      {
        id: 'n115',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
          backgroundColor: getColor(),
        },
        info: {
          title: 'Make demos',
          txt: 'i have to make some demos for the presentation, or else it will look empty and dark in here',
        },
      },
      {
        id: 'n116',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
          backgroundColor: getColor(),
        },
        info: {
          title: 'Visit granny',
          txt: 'i have to visit granny, she is sick and i made her soup so she will feel better',
        },
      },
      {
        id: 'n117',
        type: 'NoteVid',
        isPinned: false,
        info: {
          url: 'https://www.youtube.com/embed/cv7xNUeDdbI',
          title: 'Standing there MENACINGLY',
          txt: '',
        },
        style: {
          backgroundColor: getColor(),
        },
      },
      {
        id: 'n118',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
          backgroundColor: getColor(),
        },
        info: {
          title: 'Final note demo',
          txt: 'this is the final note demo, this project took 10 years of my life, tal capped when she said its gonna fun as hell',
        },
      },
      {
        id: 'n119',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
          backgroundColor: getColor(),
        },
        info: {
          title: 'Go to sleep early',
          txt: 'i have to sleep early on friday, or else mom will take my phone away',
        },
      },
      {
        id: 'n120',
        type: 'NoteTodos',
        isPinned: false,
        style: {
          backgroundColor: getColor(),
        },
        info: {
          txt: 'This is a note',
          title: 'How to make money',
          todos: [
            { txt: 'Dont invest in crypto', doneAt: null },
            { txt: 'Make food dont buy', doneAt: 187111111 },
            { txt: 'Work 24/7', doneAt: 187111111 },
          ],
        },
      },
    ]

    utilService.saveToStorage(note_KEY, notes)
  }
}

function query(filterBy = {}) {
  return storageService.query(note_KEY).then(notes => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i')
      notes = notes.filter(note => regex.test(note.vendor))
    }
    if (filterBy.minSpeed) {
      notes = notes.filter(note => note.maxSpeed >= filterBy.minSpeed)
    }
    return notes
  })
}

function getColor() {
  var colors = [
    '#f28b82',
    '#fbbc04',
    '#fff475',
    '#ccff90',
    '#a7ffeb',
    '#cbf0f8',
    '#aecbfa',
    '#d7aefb',
    '#fdcfe8',
    '#e6c9a8',
    '#e8eaed',
  ]

  return colors[Math.floor(Math.random() * colors.length)]
}
