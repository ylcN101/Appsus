export default {
  props: ['note'],
  template: `
<div class="note-img-container">
  <img :src="note.info.url" alt="" />
     </div>
<h2>{{ note.info.title }}</h2>
    
   

   
    
    `,
}
