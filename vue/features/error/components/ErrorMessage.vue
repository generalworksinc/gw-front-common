<script setup lang="ts">
import type { ClassLike } from '../../../types';

// biome-ignore lint/correctness/noUnusedVariables: used in template
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


