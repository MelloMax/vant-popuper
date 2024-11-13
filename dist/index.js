import { defineComponent as b, onMounted as w, createVNode as m, mergeProps as i, ref as P, computed as U, unref as j, createApp as k } from "vue";
import { Popup as T, DatePicker as h, Picker as A, Calendar as O, PickerGroup as M, showToast as N } from "vant";
const S = () => {
}, f = Object.assign;
function F(e) {
  return e !== null && typeof e == "object";
}
function G(e) {
  return typeof e == "function";
}
function I(e) {
  return F(e) && typeof e.then == "function" && typeof e.catch == "function";
}
const x = (e, o = document.body) => {
  const t = k(e), n = document.createElement("div");
  return o.appendChild(n), {
    instance: t.mount(n),
    unmount() {
      t.unmount(), o.removeChild(n);
    }
  };
}, V = () => {
  const e = P(!1), o = (u) => {
    e.value = u;
  };
  return {
    show: e,
    toggle: o,
    open: () => o(!0),
    close: () => o(!1)
  };
}, y = /^on([A-Z].?)/, z = /^Update:/, B = (e, o) => (...t) => {
  const n = e(...t);
  n == null || typeof n == "boolean" && n ? o() : I(n) && n.then((u) => {
    u && o();
  });
}, E = (e, o) => {
  const t = i(e ?? {});
  return f(t, Object.keys(t).reduce((n, u) => {
    const a = y.exec(u);
    if (a) {
      const [, l] = a, r = t[u];
      !z.test(l) && G(r) && (n[u] = B(r, o));
    }
    return n;
  }, {})), t;
}, d = (e, o) => f(o.reduce((t, n) => (y.test(n) && (t[n] = S), t), {}), e ?? {}), g = (e, o, t) => {
  const {
    unmount: n
  } = x(/* @__PURE__ */ b({
    setup() {
      const {
        show: u,
        toggle: a,
        open: l,
        close: r
      } = V();
      w(() => l());
      const p = () => {
        const c = i({
          position: "bottom",
          round: !0,
          closeOnPopstate: !0,
          lazyRender: !1
        });
        return c.position === "bottom" ? c.safeAreaInsetBottom = !0 : c.position === "top" && (c.safeAreaInsetTop = !0), f(c, i(c, (t == null ? void 0 : t.popupProps) ?? {}, {
          show: u.value,
          "onUpdate:show": a,
          onClosed: () => n()
        })), c;
      };
      return () => m(T, p(), {
        default: () => [m(e, E(o, r), null)]
      });
    }
  }), t == null ? void 0 : t.mount);
}, $ = (...e) => {
  g(h, d(e[0], ["onConfirm", "onCancel"]), e[1]);
}, q = (...e) => {
  g(A, d(e[0], ["onConfirm", "onCancel"]), e[1]);
}, H = (...e) => {
  const [o, t] = e, {
    unmount: n
  } = x(/* @__PURE__ */ b({
    setup() {
      const {
        show: u,
        toggle: a,
        open: l,
        close: r
      } = V();
      return w(() => l()), () => m(O, i(E(d(o, ["onConfirm"]), r), {
        show: u.value,
        poppable: !0,
        "onUpdate:show": a,
        onClosed: () => n()
      }), null);
    }
  }), t == null ? void 0 : t.mount);
}, J = (...e) => {
  g(/* @__PURE__ */ b({
    emits: ["confirm"],
    setup(o, {
      emit: t
    }) {
      const n = P(), u = P(), {
        defaultDate: a,
        minDate: l,
        maxDate: r,
        ...p
      } = e[0] ?? {};
      if (a)
        n.value = a[0], u.value = a[1];
      else {
        const s = /* @__PURE__ */ new Date();
        n.value = u.value = [s.getFullYear(), s.getMonth(), s.getDate()].map(String);
      }
      const c = U(() => {
        const s = j(n);
        if (!s)
          return;
        const [v, C, D] = s.map(Number);
        return new Date(v, C - 1, D);
      });
      return () => m(M, f({
        title: "请选择时间",
        tabs: ["开始时间", "结束时间"],
        nextStepText: "下一步"
      }, p, {
        onConfirm(...s) {
          if (p.maxRange) {
            const [v] = s, [C, D] = v.map((R) => new Date(R.selectedValues.join("/")));
            if ((D.getTime() - C.getTime()) / (1e3 * 60 * 60 * 24) + 1 > +p.maxRange) {
              N(`最多选择 ${p.maxRange} 天`);
              return;
            }
          }
          t("confirm", ...s);
        }
      }), {
        default: () => [m(h, {
          modelValue: n.value,
          "onUpdate:modelValue": (s) => n.value = s,
          "min-date": l,
          "max-date": r
        }, null), m(h, {
          modelValue: u.value,
          "onUpdate:modelValue": (s) => u.value = s,
          "min-date": c.value,
          "max-date": r
        }, null)]
      });
    }
  }), d(e[0], ["onConfirm", "onCancel"]), e[1]);
};
export {
  d as propsDefaultEventNoop,
  H as useVantCalendar,
  $ as useVantDatePicker,
  J as useVantDatePickerGroup,
  q as useVantPicker,
  g as useVantPopup
};
