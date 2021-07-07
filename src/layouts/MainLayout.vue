<template>
  <q-layout
    view="lHh Lpr lFf"
    style="height: 400px"
    class="shadow-2 rounded-borders"
  >
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-space></q-space>
        <q-btn flat round dense icon="notifications" class="q-mr-xs" />
        <q-btn flat round dense icon="share" />
        <q-btn flat round dense icon="search" class="q-mr-xs" />
      </q-toolbar>
      <q-toolbar inset>
        <q-toolbar-title v-if="!isCreationActive">
          Owlie Todolist
        </q-toolbar-title>
        <AddTask v-if="currentUser" v-model="isCreationActive" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <Login />
    </q-drawer>
    <q-page-container>
      <router-view @openMenu="openLeftDrawer" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import firebase from 'firebase';
import Login from '../components/Login.vue';
import AddTask from '../components/AddTask.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    Login,
    AddTask,
  },
  data() {
    return {
      newTodoTaskTitle: '',
      isCreationActive: false,
      currentUser: null,
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.currentUser = user;
    });
  },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      password: ref(''),
      isPwd: ref(true),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      openLeftDrawer() {
        leftDrawerOpen.value = true;
      },
    };
  },
});
</script>
