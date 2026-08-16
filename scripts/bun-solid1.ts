import { mock } from 'bun:test';

mock.module('solid-js', async () => import('solid-js-v1'));
mock.module('solid-js/store', async () => import('solid-js-v1/store'));
mock.module('solid-js/web', async () => import('solid-js-v1/web'));
