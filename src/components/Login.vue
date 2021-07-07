<template>
  <div>
    <template v-if="currentUser">
      <span> Bonjour </span> {{ currentUser.email }}
      <q-btn
        label="Me déconnecter"
        @click="logout"
        class="btn btn-lg btn-primary q-mt-md"
        color="secondary"
      >
      </q-btn>
    </template>
    <form v-else>
      <h5 class="mb-3 fw-normal">Me connecter</h5>
      <span class="text-center">
        Entrez vos indentifiants pour vous connecter
      </span>
      <div class="form-floating">
        <q-input v-model="email" outlined type="email" label="Email" />
      </div>
      <div class="form-floating">
        <q-input
          v-model="password"
          outlined
          :type="isPwd ? 'password' : 'text'"
          label="Password"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div class="row">
        <q-btn
          label="Me connecter"
          @click="login"
          class="btn btn-lg btn-primary q-mt-md"
          color="secondary"
        >
        </q-btn>
      </div>
      <div class="row">
        <q-btn
          label="Créer un compte"
          @click="register"
          class="btn btn-lg btn-primary q-mt-md"
          color="white"
          text-color="black"
        >
        </q-btn>
      </div>
    </form>
  </div>
</template>
<script>
import firebase from 'firebase';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      isPwd: true,
      currentUser: null,
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.currentUser = user;
    });
  },
  methods: {
    login(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          this.currentUser = userCredential.user;
          this.$router.push('/todoList');
        });
      e.preventDefault();
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.currentUser = null;
          this.$router.go({ path: '/' });
        });
    },
    register(e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
      e.preventDefault();
    },
  },
};
</script>
