export default {
  template: `
      <div className="apps-modal-container">
                <div className="modal-tip"></div>
        <ul class="flex">
        <li>
            <router-link to="/"><i class="fa-solid fa-house"></i></router-link>
            </li>
            <li>
            <router-link to="/mail"><img class="logo" src='././assets/style/apps/mail/imgs/mail.png' alt="" /></router-link>
            </li>
            <li>
            <router-link to="/noteIndex"><img class="logo" src='././assets/style/apps/keep/imgs/keep.png' alt="" /></router-link>
            </li>
           
       
        </ul>
    </div>
      `,
}
