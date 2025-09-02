// @ts-nocheck
import { defineNuxtPlugin } from 'nuxt/app';
import { setPinia } from '../../pinia';

export default defineNuxtPlugin((nuxtApp) => {
	if (nuxtApp.$pinia) {
		setPinia(nuxtApp.$pinia);
	}
});
