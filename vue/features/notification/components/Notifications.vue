<script setup lang="ts">
import { useNotification } from '../notificationStore';

// biome-ignore lint/correctness/noUnusedVariables: used in template
const store = useNotification();
// biome-ignore lint/correctness/noUnusedVariables: used in template
const removeNotificationHandler = (id?: string) => {
	if (id) store.remove(id);
};
</script>

<template>
  <div class="notifications">
    <div class="z-50 position-top-right default-position-style-top-right">
      <div v-for="n in store.notifications.value" :key="n.id"
        class="z-50 notification default-notification-style"
        :class="`default-notification-${n.type}`"
        role="status" aria-live="polite">
        <div class="z-50 notification-content default-notification-style-content"
          :class="`default-notification-${n.type}`">
          <slot>
            <pre>{{ n.message }}</pre>
          </slot>
        </div>
        <button class="z-50 notification-button default-notification-style-button"
          :class="`default-notification-${n.type}`" @click="removeNotificationHandler(n.id)"
          aria-label="delete notification">
          &times;
        </button>
      </div>
    </div>
  </div>
</template>


