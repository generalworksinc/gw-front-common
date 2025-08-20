import { createLoadingStore } from "../solid/mod.ts";
import { createModalStore } from "../solid/mod.ts";
import { createNotificationStore } from "../solid/mod.ts";

describe("solid stores (no runtime dep)", () => {
  test("createLoadingStore toggles state", () => {
    const s = createLoadingStore();
    expect(s.isLoading).toBe(false);
    s.startLoading();
    expect(s.isLoading).toBe(true);
    s.stopLoading();
    expect(s.isLoading).toBe(false);
  });

  test("createLoadingStore setLoading direct call", () => {
    const s = createLoadingStore();
    s.setLoading(true);
    expect(s.isLoading).toBe(true);
    s.setLoading(false);
    expect(s.isLoading).toBe(false);
  });

  test("createModalStore open/confirm/yes/no/close/reset", () => {
    const m = createModalStore();
    expect(m.state.isOpen).toBe(false);
    m.open({ message: "hello" });
    expect(m.state.isOpen).toBe(true);
    expect(m.state.isConfirm).toBe(false);

    let called = 0;
    m.confirm({ yesFunc: () => (called += 1) });
    expect(m.state.isConfirm).toBe(true);
    m.yes();
    expect(called).toBe(1);
    expect(m.state.isOpen).toBe(false);

    m.confirm({ noFunc: () => (called += 2) });
    m.no();
    expect(called).toBe(3);

    m.reset();
    expect(m.state.isOpen).toBe(false);
    expect(m.state.isConfirm).toBe(false);
  });

  test("createNotificationStore add/remove/clear + auto-remove", async () => {
    const n = createNotificationStore();
    expect(n.state.items.length).toBe(0);

    n.add({ type: "info", message: "hi", removeAfter: 30 });
    expect(n.state.items.length).toBe(1);

    const id = n.state.items[0].id;
    n.remove(id);
    expect(n.state.items.length).toBe(0);

    n.add({ type: "success", message: "bye", removeAfter: 10 });
    expect(n.state.items.length).toBe(1);
    await new Promise((r) => setTimeout(r, 25));
    expect(n.state.items.length).toBe(0);

    n.add({ type: "danger", message: "x" });
    n.add({ type: "warning", message: "y" });
    n.clear();
    expect(n.state.items.length).toBe(0);
  });
});
