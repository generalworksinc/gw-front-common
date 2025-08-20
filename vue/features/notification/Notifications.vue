<template>
  <div class="gw-notifications" :class="positionClass">
    <div v-for="n in store.notifications.value" :key="n.id" class="gw-notification" :data-type="n.type">
      {{ n.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NotificationStore } from "./store.ts";

const props = defineProps<{
  store: NotificationStore
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}>();

const positionClass = computed(() => `pos-${props.position ?? 'top-right'}`);
</script>

<style scoped>
.gw-notifications {
  position: fixed;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.pos-top-right { top: 12px; right: 12px; }
.pos-top-left { top: 12px; left: 12px; }
.pos-bottom-right { bottom: 12px; right: 12px; }
.pos-bottom-left { bottom: 12px; left: 12px; }

.gw-notification {
  background: #111827;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
}
</style>
