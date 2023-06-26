export default {
  props: ['note'],
  template: `
 <h4>{{ note.info.title }}</h4>
<ul class="note-todos">

<li :class="note.info.todos[index].isDone ? 'line-through': ''" v-for="(todo,index) in note.info.todos">{{ todo.txt }}</li>

</ul>


    
    `,
}
