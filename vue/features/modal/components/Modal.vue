<script setup lang="ts">
import type { ClassLike } from '../../../types';
import { useModal } from '../modalStore';

const props = defineProps<{ class?: ClassLike }>();
const store = useModal();
</script>

<template>
  <div v-if="store.state.value.isOpen" :class="['gw-modal', props.class]">
    <div class="gw-modal__panel">
      <div class="gw-modal__body">
        <div v-if="store.state.value.message">{{ store.state.value.message }}</div>
        <div v-else-if="store.state.value.html" v-html="store.state.value.html as any" />
      </div>
      <div class="gw-modal__actions">
        <button type="button" class="gw-modal__btn" @click="store.yes()">OK</button>
        <button type="button" class="gw-modal__btn" @click="store.no()">Cancel</button>
      </div>
    </div>
  </div>
  </template>


