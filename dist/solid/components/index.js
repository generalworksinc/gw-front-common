import { createComponent } from 'solid-js/web';
import { createSignal, onMount, Show } from 'solid-js';

// solid/components_clientonly.tsx
var gwMod = () => import('../components_ssr/index.js');
function makeLazy(key) {
  return function LazyComponent(props) {
    const [Component, setComponent] = createSignal(null);
    onMount(async () => {
      const mod = await gwMod();
      setComponent(() => mod[key]);
    });
    return createComponent(Show, {
      get when() {
        return Component();
      },
      children: (component) => component({
        ...props
      })
    });
  };
}
var Notifications = makeLazy("Notifications");
var Modal = makeLazy("Modal");
var Loading = makeLazy("Loading");

export { Loading, Modal, Notifications };
