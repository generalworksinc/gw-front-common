<script setup lang="ts">
import type { ClassLike, StyleLike } from '../../../types';
import { useLoading } from '../loadingStore';

const props = defineProps<{
	class?: ClassLike;
	style?: StyleLike;
	store?: any;
}>();
const loadingStore = props.store ?? useLoading();
</script>

<template>
  <Transition name="loading-transition">
    <div>loading: {{ loadingStore.isLoading }}</div>
    <div v-if="loadingStore.isLoading" :class="['loading-page-manual element-animation', props.class]" :style="props.style as any">
      <div class="element-animation__inner">
        <div class="loader"></div>
      </div>
    </div>
  </Transition>
</template>

<style>
.loading-transition-enter-active,
.loading-transition-leave-active {
  transition: opacity 0.2s ease;
  transition-delay: 0.2s;
}
.loading-transition-enter-from,
.loading-transition-leave-to {
  opacity: 0;
}
</style>


