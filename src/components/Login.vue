<template>
  <div class="q-pa-sm">
    <template v-if="currentUser">
      <p class="text-h6">Bonjour {{ currentUser.email }}</p>
      <q-btn
        label="Me déconnecter"
        @click="logout"
        class="btn btn-lg btn-primary q-mt-md"
        color="secondary"
      >
      </q-btn>
    </template>
    <form v-else>
      <p class="text-h6">Me connecter</p>
      <p class="text-body1">Entrez vos indentifiants pour vous connecter</p>
      <div class="form-floating">
        <q-input
          class="q-mt-md"
          v-model="email"
          filled
          type="email"
          label="Email"
        />
        <q-input
          class="q-mt-md"
          v-model="password"
          filled
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
