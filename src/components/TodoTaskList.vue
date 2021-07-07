<template>
  <q-page class="full-width">
    <q-scroll-area class="absolute full-width full-height">
      <q-list class="column q-pa-md">
        <div class="col-12" v-for="todoTask in todoTasks" :key="todoTask.id">
          <div
            class="
              row
              q-px-sm
              justify-between
              bg-grey-3
              rounded-top
              items-center
            "
          >
            <div
              class="col-11 text-subtitle1 text-bold"
              @click="todoTask.expanded = !todoTask.expanded"
            >
              {{ todoTask.title }}
            </div>
            <div class="col-1">
              <q-checkbox
                v-model="checked"
                v-on:click="removeTodoTask(todoTask)"
              />
            </div>
          </div>
          <div>
            <!--  -->
            <TaskContent
              v-model:content="todoTask.content"
              v-model:expanded="todoTask.expanded"
              @blur="editTodoTask(todoTask)"
            ></TaskContent>
          </div>
        </div>
      </q-list>
      <div v-if="!todoTasks.length">
        <p class="text-body1 absolute-center">Aucun élément</p>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import firebase from 'firebase';
import db from 'src/boot/firebase';
import TaskContent from './TaskContent.vue';

export default defineComponent({
  name: 'TodoTaskList',
  components: {
    TaskContent,
  },
  data() {
    return {
      todoTasks: [],
      isCreationActive: false,
      currentUser: null,
    };
  },
  methods: {
    editTodoTask(todoTask) {
      db.collection(`users/${this.currentUser.uid}/todoList`)
        .doc(todoTask.id)
        .update({
          content: todoTask.content,
        })
        .then(() => {})
        .catch(() => {});
    },
    removeTodoTask(todoTask) {
      db.collection(`users/${this.currentUser.uid}/todoList`)
        .doc(todoTask.id)
        .delete()
        .then(() => {})
        .catch(() => {});
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.currentUser = user;
      if (this.currentUser) {
        db.collection(`users/${this.currentUser.uid}/todoList`).onSnapshot(
          (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              const todoTaskChange = change.doc.data();
              todoTaskChange.id = change.doc.id;
              if (change.type === 'added') {
                this.todoTasks.push(todoTaskChange);
              }
              if (change.type === 'modified') {
                const index = this.todoTasks.findIndex(
                  (todoTask) => todoTask.id === todoTaskChange.id,
                );
                Object.assign(this.todoTasks[index], todoTaskChange);
              }
              if (change.type === 'removed') {
                const index = this.todoTasks.findIndex(
                  (todoTask) => todoTask.id === todoTaskChange.id,
                );
                this.todoTasks.splice(index, 1);
              }
            });
          },
        );
      }
    });
  },
  computed: {
    checked: {
      get() {
        return false;
      },
      set() {},
    },
  },
});
</script>
<style lang="scss" scoped>
.rounded-top {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
