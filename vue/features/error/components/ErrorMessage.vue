<script setup lang="ts">
import type { ClassLike } from '../../../types';

const { field, classObj, id } = defineProps<{
	field?: { validator?: { message?: string }; id?: string };
	classObj?: ClassLike;
	id?: string;
}>();
</script>

<template>
  <div
    v-if="field?.validator?.message"
    :key="field?.id"
    :id="id ?? field?.id"
    :class="['text-red-500', classObj]"
  >
    {{ field?.validator?.message }}
  </div>
</template>


