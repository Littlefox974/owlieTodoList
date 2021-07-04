<template>
  <!--<q-layout view="lHh lpr lFf" container style="height: 400px" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-purple">
        <q-toolbar>
          <q-btn flat round dense icon="menu" class="q-mr-sm" />
          <q-space ></q-space>
          <q-btn flat round dense icon="search" class="q-mr-xs" />
          <q-btn flat round dense icon="group_add" />
        </q-toolbar>
        <q-toolbar inset>
          <q-toolbar-title>
            <strong>Quasar</strong> Framework
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="q-pa-md">
          <p v-for="n in 15" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Fugit nihil praesentium molestias a adipisci, dolore vitae odit,
             quidem consequatur optio voluptates asperiores pariatur
             eos numquam rerum delectus commodi perferendis voluptate?
          </p>
        </q-page>
      </q-page-container>
    </q-layout>-->
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
        <q-btn flat round dense icon="search" class="q-mr-xs" />
        <q-btn flat round dense icon="group_add" />
      </q-toolbar>
      <q-toolbar inset>
        <q-toolbar-title> Owlie Todolist </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <div>
        <span class="text-center text-h5">Me connecter</span>
        <br />
        <span class="text-center"
          >Entrez vos indentifiants pour vous connecter</span
        >
      </div>
      <form @submit.prevent="simulateSubmit" class="q-pa-md">
        <q-input v-model="email" outlined type="email" label="Email" />
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
        <div class="row justify-start">
          <q-btn
            type="submit"
            :loading="submitting"
            label="ME CONNECTER"
            class="q-mt-md"
            color="teal"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
          <q-btn color="white" text-color="black" label="CREER UN COMPTE" />
        </div>
      </form>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      password: ref(''),
      isPwd: ref(true),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
