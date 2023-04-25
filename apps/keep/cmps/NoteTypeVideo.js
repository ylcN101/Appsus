export default {
  props: ['note'],
  template: `

<iframe  width="150" height="250" :src="note.info.url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
<h2>{{ note.info.title }}</h2>

    
    `,
}
