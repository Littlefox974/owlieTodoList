<template>
  <q-page class="flex flex-center">
    <div class="row justify-center">
      <div class="text-center col-12">
        A fin d'accèder à votre todo list, merci de vouloir vous identifier.
      </div>
      <q-btn
        color="secondary"
        label="M'authentifier"
        @click="$emit('openMenu')"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
});
</script>
