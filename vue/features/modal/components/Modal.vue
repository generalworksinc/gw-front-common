<script setup lang="ts">
import { computed } from 'vue';
import { useModal } from '../modalStore';

const emit = defineEmits(['yes', 'no', 'close']);
const store = useModal();

const containerStyle = computed(() => {
	const s = store.state.value;
	const width = s.width;
	const height = s.height;
	const maxWidth = s.maxWidth;
	const maxHeight = s.maxHeight;
	const minWidth = s.minWidth;
	const minHeight = s.minHeight;
	const isScrollY = s.isScrollY;
	const styleStr =
		(width ? `width:${width};` : '') +
		(height ? ` height:${height};` : '') +
		(maxWidth ? `max-width:${maxWidth};` : '') +
		(maxHeight ? ` max-height:${maxHeight};` : '') +
		(minWidth ? `min-width:${minWidth};` : '') +
		(minHeight ? ` min-height:${minHeight};` : '') +
		(isScrollY ? 'overflow-y: scroll;' : '');
	return styleStr;
});
</script>

<template>
  <transition name="modal">
    <div v-if="store.state.value.isOpen" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" :style="containerStyle">
          <div class="modal-header">
            <slot name="header"> </slot>
          </div>

          <div class="modal-body is-size-6">
            <slot name="body">
              <div v-if="store.state.value.html" v-html="store.state.value.html as any"></div>
              <div v-if="store.state.value.message" style="white-space: pre-wrap;" v-text="store.state.value.message"></div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <div v-if="store.state.value.isConfirm">
                <a class="cursor-pointer modal-default-button is-right" @click="emit('yes')">
                  <span style="cursor: pointer;">はい</span>
                </a>
                <a class="cursor-pointer modal-default-button is-left" @click="emit('no')">
                  <span style="cursor: pointer;">キャンセル</span>
                </a>
              </div>
              <div v-if="!store.state.value.isConfirm">
                <a class="cursor-pointer modal-default-button is-right" @click="emit('close')" id="modal_component_OK">
                  <span style="cursor: pointer;">OK</span>
                </a>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
  </template>


