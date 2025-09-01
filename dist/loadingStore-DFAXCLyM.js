function e() {
  const t = { value: !1 }, o = (a) => {
    t.value = a;
  };
  return { isLoading: t, setLoading: o, startLoading: () => o(!0), stopLoading: () => o(!1) };
}
export {
  e as u
};
