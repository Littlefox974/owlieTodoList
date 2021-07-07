<template>
  <div class="wrapper">
    <textarea
      ref="textarea"
      class="taskContent"
      v-model="taskContent"
      :class="{ 'reduced-content': !isExpanded }"
      placeholder="Pas de contenu"
      :rows="isExpanded ? '' : '1'"
      @input="mixin_autoResize_resize"
      @blur="$emit('blur', $event.target.value)"
      @focus="
        isExpanded = true;
        mixin_autoResize_resize($event);
      "
    ></textarea>
  </div>
</template>
<script>
import mixinAutoResize from '../mixins/autoResize.js';

export default {
  name: 'ResizeByMixin',
  mixins: [mixinAutoResize],
  props: ['content', 'expanded'],
  emits: ['update:content', 'update:expanded', 'blur'],
  mounted() {
    // Si la tache est ouverte,
    // on déclanche la mixin afin de redimensionner la textarea
    // car autrement elle n'est déclanchée qu'au premier input
    if (this.isExpanded) {
      this.mixin_autoResize_resize({ target: this.$refs.textarea });
    }
  },
  computed: {
    taskContent: {
      get() {
        return this.content;
      },
      set(value) {
        this.$emit('update:content', value);
      },
    },
    isExpanded: {
      get() {
        if (this.expanded) {
          this.mixin_autoResize_resize({ target: this.$refs.textarea });
        } else if (this.$refs.textarea) {
          this.unsetTextareaHeight();
        }
        return this.expanded;
      },
      set(value) {
        this.$emit('update:expanded', value);
      },
    },
  },
  methods: {
    unsetTextareaHeight() {
      this.$refs.textarea.style = '';
    },
  },
};
</script>
<style scoped lang="scss">
.taskContent {
  border: none;
  resize: none;
  outline: none !important;
  width: 100%;
  overflow-y: hidden;
  max-height: 18rem;
  min-width: 15rem;
  appearance: none;
}
.reduced-content {
  text-overflow: ellipsis;
  white-space: initial;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
