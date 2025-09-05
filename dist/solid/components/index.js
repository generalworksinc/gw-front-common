import { createComponent, Dynamic, mergeProps } from 'solid-js/web';
import { createSignal, onMount } from 'solid-js';

// solid/components_clientonly.tsx
var gwMod = () => import('../components_ssr/index.js');
function makeLazy(key) {
  return function LazyComponent(props) {
    const [Component, setComponent] = createSignal(null);
    onMount(async () => {
      const mod = await gwMod();
      setComponent(() => mod[key]);
    });
    return createComponent(Dynamic, mergeProps({
      get component() {
        return Component();
      }
    }, props));
  };
}
var Notifications = makeLazy("Notifications");
var Modal = makeLazy("Modal");
var Loading = makeLazy("Loading");

export { Loading, Modal, Notifications };
