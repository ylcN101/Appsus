export default {
  props: ['note'],
  template: `
    
    <h4>{{ note.info.title }}</h4>
      <h3>{{ note.info.txt }}</h3>
    
    `,
}
