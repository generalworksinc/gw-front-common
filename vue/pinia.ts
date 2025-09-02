import type { Pinia } from 'pinia';
import { getActivePinia } from 'pinia';

let providedPinia: Pinia | null = null;

export function setPinia(pinia: Pinia): void {
	providedPinia = pinia;
}

export function resolvePinia(): Pinia {
	if (providedPinia) return providedPinia;
	const active = getActivePinia() as Pinia | undefined;
	if (active) return active;
	throw new Error(
		'[gw-front-common] Pinia instance is not available. Call setPinia(pinia) once on app init or enable the Nuxt module.',
	);
}
