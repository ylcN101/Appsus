import AppHeader from './../cmps/AppHeader.js'

export default {
  template: `
     <AppHeader/>
        <section class="home-page">
            <div class="welcome-container">
            <h1>Secure, smart, and easy to use our <br /> apps</h1>
            <h2>Get more done with Yuval's Mail or Save your thoughts, wherever you are with Guy's Keep</h2>
            <div className="welcome-btns">
            <router-link class="btn" to="/mail">Start Mail</router-link>
            <router-link class="btn" to="/noteIndex">Start Keep</router-link>
            </div>
          
            </div>
            <div class="welcome-img-container">
   <img src="./home-img.png" alt="" />
            </div>
           
        </section>
    `,

  components: {
    AppHeader,
  },
}
