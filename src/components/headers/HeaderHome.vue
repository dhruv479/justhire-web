<template>
  <div>
    <header>
      <span class="header-title">JustHire</span>
      <div v-if="!isAuth" class="log-button">
        <button class="btn btn-success" type="button" @click="openLogin">Log In</button>
        <button class="btn btn-success" type="button" @click="openSignup">Sign Up</button>
      </div>
      <button v-else class="btn btn-danger" type="button" @click="logout">Log Out</button>
    </header>

    <!-- Modal for User SignUp -->
    <VuexplosionModal :visible="showSignup" @close="closeSignup">
      <div slot="title">Register</div>
      <div slot="body">
        <div class="register-modal">
          <form @submit="handleSignup">
            <label>
              Select:
              <input type="radio" v-model="modalUser.userType" value="0" />
              Student
              <input type="radio" v-model="modalUser.userType" value="1" />
              Recruiter
            </label>
            <br />
            <label>
              Name:
              <input type="text" v-model="modalUser.name" class="form-control" required />
            </label>
            <label>
              Email Address:
              <input
                type="email"
                v-model="modalUser.email"
                class="form-control"
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                v-model="modalUser.password"
                class="form-control"
                required
              />
            </label>
            <label v-if="modalUser.userType === '1'">
              Company Name:
              <input
                type="text"
                v-model="modalUser.company"
                class="form-control"
                required
              />
            </label>
            <br />
            <br />
            <div align="center">
              <button type="submit" class="btn btn-success">Register</button>
            </div>
          </form>
        </div>
      </div>
    </VuexplosionModal>

    <!-- Modal for User LogIn -->
    <VuexplosionModal :visible="showLogin" @close="closeLogin">
      <div slot="title">Log In</div>
      <div slot="body">
        <div class="register-modal">
          <form @submit="handleLogin">
            <br />
            <label>
              Email Address:
              <input
                type="email"
                v-model="modalUser.email"
                class="form-control"
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                v-model="modalUser.password"
                class="form-control"
                required
              />
            </label>
            <br />
            <br />
            <div align="center">
              <button type="submit" class="btn btn-success">Log In</button>
            </div>
          </form>
        </div>
      </div>
    </VuexplosionModal>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import VuexplosionModal from './../custom/VueModal';

export default {
  name: 'HeaderHome',
  components: {
    VuexplosionModal
  },
  data() {
    return {
      showSignup: false,
      showLogin: false,
      modalUser: {
        userType: '0'
      }
    };
  },
  computed: {
    ...mapGetters({
      isAuth: 'getUserAuth'
    })
  },
  methods: {
    handleSignup(e) {
      e.preventDefault();
      this.$store.dispatch('registerUser', this.modalUser);
      this.closeSignup();
    },
    handleLogin(e) {
      e.preventDefault();
      this.$store.dispatch('loginUser', this.modalUser).then(userType => {
        if (userType === 0) {
          this.$router.push({path: '/jobs'});
        } else {
          this.$router.push({path: '/recruit'});
        }
      });
      this.closeLogin();
    },
    openLogin() {
      this.showLogin = !this.showLogin;
    },
    closeLogin() {
      this.showLogin = false;
      this.modalUser = {userType: '0'};
    },
    openSignup() {
      this.showSignup = !this.showSignup;
    },
    closeSignup() {
      this.showSignup = false;
      this.modalUser = {userType: '0'};
    },
    logout() {
      this.$store.dispatch('logout');
    }
  }
};
</script>

<style scoped>
header {
  background-color: rgb(52, 28, 58);
  height: 70px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
}
.register-modal {
  width: 350px;
}
.log-button {
  width: 180px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
