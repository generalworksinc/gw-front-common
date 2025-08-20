<template>
  <div v-if="visible" :class="['gw-loading', klass]" :style="style">
    <span class="gw-loading__spinner" />
  </div>
</template>

<script setup lang="ts">
import type { LoadingStore } from "./store.ts";

const props = defineProps<{
  store?: LoadingStore
  class?: string
  style?: string | Record<string, string>
  show?: boolean
}>();

const klass = props.class as string | undefined;
const visible = computed(() => props.show ?? props.store?.isLoading.value ?? false);
</script>

<style scoped>
.gw-loading {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(0,0,0,0.25);
  z-index: 9999;
}
.gw-loading__spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
