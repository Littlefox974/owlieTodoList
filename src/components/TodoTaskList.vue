<template>
  <q-list bordered padding>
    <q-item
      tag="label"
      v-ripple
      v-for="todoTask in todoTasks"
      :key="todoTask.id"
    >
      <q-item-section side top>
        <q-checkbox
          v-model="todoTask.isChecked"
          v-on:click="toggleCheck(todoTask)"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ todoTask.title }}</q-item-label>
        <q-item-label caption>
          {{ todoTask.content }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { defineComponent } from 'vue';
import db from 'src/boot/firebase';

export default defineComponent({
  name: 'TodoTaskEl',
  data() {
    return {
      todoTasks: [],
    };
  },
  methods: {
    toggleCheck(todoTask) {
      db.collection('todoTask')
        .doc(todoTask.id)
        .update({
          isChecked: todoTask.isChecked,
        })
        .then(() => {
          // eslint-disable-next-line no-console
          console.log('Document successfully updated!');
        })
        .catch((error) => {
          // The document probably doesn't exist.
          // eslint-disable-next-line no-console
          console.error('Error updating document: ', error);
        });
    },
  },
  mounted() {
    db.collection('todoTask').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const todoTaskChange = change.doc.data();
        todoTaskChange.id = change.doc.id;
        if (change.type === 'added') {
          // eslint-disable-next-line no-console
          console.log('New todoTask: ', change.doc.data());
          this.todoTasks.push(todoTaskChange);
        }
        if (change.type === 'modified') {
          // eslint-disable-next-line no-console
          console.log('Modified todoTask: ', change.doc.data());
          const index = this.todoTasks.findIndex(
            (todoTask) => todoTask.id === todoTaskChange.id,
          );
          Object.assign(this.todoTasks[index], todoTaskChange);
        }
        if (change.type === 'removed') {
          // eslint-disable-next-line no-console
          console.log('Removed todoTask: ', change.doc.data());
          const index = this.todoTasks.findIndex(
            (todoTask) => todoTask.id === todoTaskChange.id,
          );
          this.todoTasks.splice(index, 1);
        }
      });
    });
  },
});
</script>
