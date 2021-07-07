<template>
  <div>
    <q-btn
      v-if="!isCreationActive"
      class="glossy open-button"
      round
      color="secondary"
      icon="add"
      @click="isCreationActive = true"
    />
    <q-input
      label-color="secondary"
      v-else
      dark
      bottom-slots
      v-model="newTodoTaskTitle"
      label="Ajouter un élément"
      style="z-index=10000"
      @blur="isCreationActive = false"
    >
      <template v-slot:append>
        <!-- @blur="isCreationActive = false" -->
        <q-btn
          round
          dense
          flat
          text-color="white"
          color="secondary"
          icon="add"
          @click="addNewTodoTask"
          :disable="!newTodoTaskTitle"
        />
      </template>
    </q-input>
  </div>
</template>
<script>
import db from 'src/boot/firebase';
import firebase from 'firebase';

export default {
  name: 'AddTask',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  data() {
    return {
      newTodoTaskTitle: '',
      currentUser: null,
    };
  },
  computed: {
    isCreationActive: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.currentUser = user;
    });
  },
  methods: {
    addNewTodoTask() {
      const newTodoTask = {
        title: this.newTodoTaskTitle,
        content: '',
      };
      // this.qweets.unshift(newQweet)
      db.collection(`users/${this.currentUser.uid}/todoList`)
        .add(newTodoTask)
        .then((docRef) => {
          // eslint-disable-next-line no-console
          console.log('Document written with ID: ', docRef.id);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Error adding document: ', error);
        });
      this.newQweetContent = '';
    },
  },
};
</script>
<style lang="scss" scoped>
.open-todotask {
  z-index: 2000;
  position: relative;
  right: 18rem;
  top: 2em;
}
.add-todotask {
  z-index: 2000;
  position: relative;
  left: 15rem;
  top: 1em;
}
.open-button {
  position: absolute;
  bottom: 0;
  left: 20px;
  transform: translateY(50%);
}
</style>
