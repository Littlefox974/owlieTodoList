<template>
  <q-page class="flex flex-center">
    <div class="text-center">
      A fin d'accèder à votre todo list, merci de vouloir vous identifier.
    </div>
    <q-btn color="secondary" label="M'authentifier"/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
});
</script>
