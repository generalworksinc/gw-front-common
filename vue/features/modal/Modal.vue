<template>
  <div v-if="state.isOpen" class="gw-modal" :class="klass">
    <div class="gw-modal__panel">
      <div class="gw-modal__body">
        <slot>
          <div v-if="state.options.message">{{ state.options.message }}</div>
          <div v-else-if="state.options.html" v-html="state.options.html" />
        </slot>
      </div>
      <div class="gw-modal__actions">
        <button class="gw-modal__btn" @click="onYes">OK</button>
        <button class="gw-modal__btn" @click="onNo">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ModalStore } from "./store.ts";

const props = defineProps<{
  store: ModalStore
  class?: string
}>();

const klass = props.class as string | undefined;
const state = props.store.state.value;

const onYes = () => props.store.yes();
const onNo = () => props.store.no();
</script>

<style scoped>
.gw-modal {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(0,0,0,0.25);
  z-index: 9999;
}
.gw-modal__panel {
  background: #fff;
  width: 90%;
  max-width: 480px;
  border-radius: 8px;
  overflow: hidden;
}
.gw-modal__body {
  padding: 16px;
}
.gw-modal__actions {
  padding: 12px 16px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
.gw-modal__btn {
  padding: 6px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #f3f4f6;
}
</style>
