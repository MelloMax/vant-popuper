import {createApp, mergeProps, onMounted, defineComponent, computed, unref, ref} from 'vue';
import type {Component} from 'vue';
import {
    Popup,
    DatePicker,
    Picker,
    Calendar,
    PickerGroup,
    showToast,
} from 'vant';
import type {PopupProps, PickerConfirmEventParams} from 'vant';
import {extend, isFunction, isPromise, noop} from '@/shared';

const mount = (
    RootComponent: Component,
    target: Element = document.body,
) => {
    const app = createApp(RootComponent);
    const root = document.createElement('div');
    target.appendChild(root);

    return {
        instance: app.mount(root),
        unmount() {
            app.unmount();
            target.removeChild(root);
        },
    };
};

const usePopupState = () => {
    const show = ref(false);
    const toggle = (val: boolean) => {
        show.value = val;
    };
    const open = () => toggle(true);
    const close = () => toggle(false);

    return {
        show,
        toggle,
        open,
        close,
    };
};

export type UseVantPopup = <T = Component>(
    Component: T,
    props?: T extends Component<{
            $props: infer P;
        }>
        ? {
            [K in keyof P]: K extends `on${infer C}`
                ? C extends Capitalize<C>
                    ? P[K] & object extends (...args: infer R) => any
                        ? (...args: R) => void | boolean | PromiseLike<boolean>
                        : P[K]
                    : P[K]
                : P[K];
        }
        : never,
    options?: {
        popupProps?: Partial<
            typeof Popup extends Component<{
                    $props: infer P;
                }>
                ? P & {
                style: Partial<CSSStyleDeclaration>;
            }
                : never
        >;
        mount?: Element;
    },
) => void;

const EventRE = /^on([A-Z].?)/;
const notEventUpdateRE = /^Update:/;

const bindCloseEvent = (
    fn: () => void | boolean | PromiseLike<boolean>,
    action: () => void,
) => {
    return (...args: Parameters<typeof fn>) => {
        const result = fn(...args);
        if (result == null) action();
        else if (typeof result === 'boolean' && result) action();
        else if (isPromise(result)) {
            result.then((res) => {
                if (res) action();
            });
        }
    };
};

const resolveProps = (
    props: Parameters<typeof mergeProps>[number] | undefined,
    action: () => void,
) => {
    const value = mergeProps(props ?? {});
    extend(
        value,
        Object.keys(value).reduce((o, k) => {
            const parsed = EventRE.exec(k);
            if (parsed) {
                const [, segment] = parsed;
                const event = value[k] as Parameters<typeof bindCloseEvent>[number];
                if (!notEventUpdateRE.test(segment) && isFunction(event)) {
                    o[k] = bindCloseEvent(event, action);
                }
            }
            return o;
        }, {}),
    );

    return value;
};

export const propsDefaultEventNoop = (
    props: Parameters<typeof mergeProps>[number] | undefined,
    events: Array<string>,
) => {
    return extend(
        events.reduce((o, e) => {
            if (EventRE.test(e)) o[e] = noop;
            return o;
        }, {}),
        props ?? {},
    );
};

export const useVantPopup: UseVantPopup = (Component, props, options) => {
    const {unmount} = mount(
        defineComponent({
            setup() {
                const {show, toggle, open, close} = usePopupState();
                onMounted(() => open());

                const resolvePopupProps = () => {
                    const value = mergeProps({
                        position: 'bottom',
                        round: true,
                        closeOnPopstate: true,
                        lazyRender: false,
                    }) as PopupProps;

                    if (value.position === 'bottom') {
                        value.safeAreaInsetBottom = true;
                    } else if (value.position === 'top') {
                        value.safeAreaInsetTop = true;
                    }

                    extend(
                        value,
                        mergeProps(value, options?.popupProps ?? {}, {
                            show: show.value,
                            'onUpdate:show': toggle,
                            onClosed: () => unmount(),
                        }),
                    );

                    return value;
                };

                return () => (
                    <Popup {...resolvePopupProps()}>
                        <Component {...resolveProps(props, close)} />
                    </Popup>
                );
            },
        }),
        options?.mount,
    );
};

export type PopupArgumentRest<T = {}> =
    Parameters<typeof useVantPopup<T>> extends [any, ...infer R] ? R : never;

export const useVantDatePicker = (
    ...args: PopupArgumentRest<typeof DatePicker>
) => {
    useVantPopup(
        DatePicker,
        propsDefaultEventNoop(args[0], ['onConfirm', 'onCancel']),
        args[1],
    );
};

export const useVantPicker = (...args: PopupArgumentRest<typeof Picker>) => {
    useVantPopup(
        Picker,
        propsDefaultEventNoop(args[0], ['onConfirm', 'onCancel']),
        args[1],
    );
};

export const useVantCalendar = (
    ...args: PopupArgumentRest<typeof Calendar>
) => {
    const [props, options] = args;
    const {unmount} = mount(
        defineComponent({
            setup() {
                const {show, toggle, open, close} = usePopupState();
                onMounted(() => open());

                return () => (
                    <Calendar
                        {...mergeProps(
                            resolveProps(propsDefaultEventNoop(props, ['onConfirm']), close),
                            {
                                show: show.value,
                                poppable: true,
                                'onUpdate:show': toggle,
                                onClosed: () => unmount(),
                            },
                        )}
                    />
                );
            },
        }),
        options?.mount,
    );
};

export const useVantDatePickerGroup = (
    ...args: PopupArgumentRest<
        typeof PickerGroup extends Component<{
                $props: infer P;
            }>
            ? Component<{
                $props: P & {
                    defaultDate?: string[][];
                    minDate?: Date;
                    maxDate?: Date;
                    maxRange?: number | string;
                };
            }>
            : never
    >
) => {
    useVantPopup(
        defineComponent({
            emits: ['confirm'],
            setup(_, {emit}) {
                const startDate = ref<string[]>();
                const endDate = ref<string[]>();
                const {defaultDate, minDate, maxDate, ...params} = args[0] ?? {};
                if (defaultDate) {
                    startDate.value = defaultDate[0];
                    endDate.value = defaultDate[1];
                } else {
                    const now = new Date();
                    startDate.value = endDate.value = [
                        now.getFullYear(),
                        now.getMonth(),
                        now.getDate(),
                    ].map(String);
                }

                const currentMinDate = computed(() => {
                    const values = unref(startDate);
                    if (!values) return;
                    const [year, month, date] = values.map(Number);
                    return new Date(year, month - 1, date);
                });
                return () => (
                    <PickerGroup
                        {...extend(
                            {
                                title: '请选择时间',
                                tabs: ['开始时间', '结束时间'],
                                nextStepText: '下一步',
                            },
                            params,
                            {
                                onConfirm(...args: [PickerConfirmEventParams[]]) {
                                    if (params.maxRange) {
                                        const [dates] = args;
                                        const [startDate, endDate] = dates.map((v) => new Date(v.selectedValues.join('/')));
                                        const diff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1
                                        if (diff > +params.maxRange) {
                                            showToast(`最多选择 ${params.maxRange} 天`);
                                            return;
                                        }
                                    }
                                    emit('confirm', ...args);
                                },
                            },
                        )}
                    >
                        <DatePicker
                            v-model={startDate.value}
                            min-date={minDate}
                            max-date={maxDate}
                        />
                        <DatePicker
                            v-model={endDate.value}
                            min-date={currentMinDate.value}
                            max-date={maxDate}
                        />
                    </PickerGroup>
                );
            },
        }),
        propsDefaultEventNoop(args[0], ['onConfirm', 'onCancel']),
        args[1],
    );
};
