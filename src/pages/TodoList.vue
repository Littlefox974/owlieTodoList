<template>
  <q-page class="flex flex-center">
    <!--<div class="text-center">
      A fin d'accèder à votre todo list, merci de vouloir vous identifier.
    </div>
    <q-btn color="secondary" label="M'authentifier" />-->
    <todo-task-list></todo-task-list>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import TodoTaskList from '../components/TodoTaskList.vue';

export default defineComponent({
  name: 'TodoList',
  data() {
    return {};
  },
  components: {
    TodoTaskList,
  },
});
</script>
