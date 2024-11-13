import { mergeProps, Component } from 'vue';
import { Popup } from 'vant';
export type UseVantPopup = <T = Component>(Component: T, props?: T extends Component<{
    $props: infer P;
}> ? {
    [K in keyof P]: K extends `on${infer C}` ? C extends Capitalize<C> ? P[K] & object extends (...args: infer R) => any ? (...args: R) => void | boolean | PromiseLike<boolean> : P[K] : P[K] : P[K];
} : never, options?: {
    popupProps?: Partial<typeof Popup extends Component<{
        $props: infer P;
    }> ? P & {
        style: Partial<CSSStyleDeclaration>;
    } : never>;
    mount?: Element;
}) => void;
export declare const propsDefaultEventNoop: (props: Parameters<typeof mergeProps>[number] | undefined, events: Array<string>) => {
    [x: string]: unknown;
} & import('vue').VNodeProps;
export declare const useVantPopup: UseVantPopup;
export type PopupArgumentRest<T = {}> = Parameters<typeof useVantPopup<T>> extends [any, ...infer R] ? R : never;
export declare const useVantDatePicker: (props?: {
    formatter?: ((type: string, option: import('vant').PickerOption) => import('vant').PickerOption) | undefined;
    modelValue?: string[] | undefined;
    readonly?: boolean | undefined;
    loading?: boolean | undefined;
    allowHtml?: boolean | undefined;
    optionHeight?: string | number | undefined;
    showToolbar?: boolean | undefined;
    swipeDuration?: string | number | undefined;
    visibleOptionNum?: string | number | undefined;
    minDate?: Date | undefined;
    maxDate?: Date | undefined;
    columnsType?: import('vant').DatePickerColumnType[] | undefined;
    readonly filter?: ((columnType: string, options: import('vant').PickerOption[], values: string[]) => import('vant').PickerOption[]) | undefined;
    key?: PropertyKey | undefined;
    ref?: import('vue').VNodeRef | undefined;
    ref_for?: boolean | undefined;
    ref_key?: string | undefined;
    onVnodeBeforeMount?: (((vnode: import('vue').VNode) => void) | ((vnode: import('vue').VNode) => void)[]) | undefined;
    onVnodeMounted?: (((vnode: import('vue').VNode) => void) | ((vnode: import('vue').VNode) => void)[]) | undefined;
    onVnodeBeforeUpdate?: (((vnode: import('vue').VNode, oldVNode: import('vue').VNode) => void) | ((vnode: import('vue').VNode, oldVNode: import('vue').VNode) => void)[]) | undefined;
    onVnodeUpdated?: (((vnode: import('vue').VNode, oldVNode: import('vue').VNode) => void) | ((vnode: import('vue').VNode, oldVNode: import('vue').VNode) => void)[]) | undefined;
    onVnodeBeforeUnmount?: (((vnode: import('vue').VNode) => void) | ((vnode: import('vue').VNode) => void)[]) | undefined;
    onVnodeUnmounted?: (((vnode: import('vue').VNode) => void) | ((vnode: import('vue').VNode) => void)[]) | undefined;
    class?: unknown;
    style?: unknown;
    readonly title?: string | undefined;
    readonly cancelButtonText?: string | undefined;
    readonly confirmButtonText?: string | undefined;
    readonly onChange?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    readonly "onUpdate:modelValue"?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    readonly onCancel?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    readonly onConfirm?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    onClick?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
} | undefined, options?: {
    popupProps?: Partial<typeof Popup extends Component<{
        $props: infer P;
    }> ? P & {
        style: Partial<CSSStyleDeclaration>;
    } : never>;
    mount?: Element;
} | undefined) => void;
export declare const useVantPicker: (props?: {
    modelValue?: import('vant/lib/utils').Numeric[] | undefined;
    readonly?: boolean | undefined;
    loading?: boolean | undefined;
    allowHtml?: boolean | undefined;
    optionHeight?: string | number | undefined;
    showToolbar?: boolean | undefined;
    swipeDuration?: string | number | undefined;
    visibleOptionNum?: string | number | undefined;
    columns?: (import('vant').PickerOption | import('vant').PickerColumn)[] | undefined;
    toolbarPosition?: import('vant').PickerToolbarPosition | undefined;
    key?: PropertyKey | undefined;
    ref?: import('vue').VNodeRef | undefined;
    ref_for?: boolean | undefined;
    ref_key?: string | undefined;
    onVnodeBeforeMount?: (((vnode: import('vue').VNode) => void) | ((vnode: import('vue').VNode) => void)[]) | undefined;
    onVnodeMounted?: (((vnode: import('vue').VNode) => void) | ((vnode: import('vue').VNode) => void)[]) | undefined;
    onVnodeBeforeUpdate?: (((vnode: import('vue').VNode, oldVNode: import('vue').VNode) => void) | ((vnode: import('vue').VNode, oldVNode: import('vue').VNode) => void)[]) | undefined;
    onVnodeUpdated?: (((vnode: import('vue').VNode, oldVNode: import('vue').VNode) => void) | ((vnode: import('vue').VNode, oldVNode: import('vue').VNode) => void)[]) | undefined;
    onVnodeBeforeUnmount?: (((vnode: import('vue').VNode) => void) | ((vnode: import('vue').VNode) => void)[]) | undefined;
    onVnodeUnmounted?: (((vnode: import('vue').VNode) => void) | ((vnode: import('vue').VNode) => void)[]) | undefined;
    class?: unknown;
    style?: unknown;
    readonly title?: string | undefined;
    readonly cancelButtonText?: string | undefined;
    readonly confirmButtonText?: string | undefined;
    readonly onChange?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    readonly "onUpdate:modelValue"?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    readonly onCancel?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    readonly onConfirm?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    readonly columnsFieldNames?: import('vant').PickerFieldNames | undefined;
    readonly onClickOption?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    readonly onScrollInto?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    onClick?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
} | undefined, options?: {
    popupProps?: Partial<typeof Popup extends Component<{
        $props: infer P;
    }> ? P & {
        style: Partial<CSSStyleDeclaration>;
    } : never>;
    mount?: Element;
} | undefined) => void;
export declare const useVantCalendar: (props?: {
    type?: import('vant').CalendarType | undefined;
    position?: import('vant').PopupPosition | undefined;
    round?: boolean | undefined;
    show?: boolean | undefined;
    readonly?: boolean | undefined;
    safeAreaInsetBottom?: boolean | undefined;
    lazyRender?: boolean | undefined;
    closeOnClickOverlay?: boolean | undefined;
    closeOnPopstate?: boolean | undefined;
    safeAreaInsetTop?: boolean | undefined;
    switchMode?: import('vant/lib/calendar/types').CalendarSwitchMode | undefined;
    poppable?: boolean | undefined;
    maxRange?: string | number | undefined;
    showMark?: boolean | undefined;
    showTitle?: boolean | undefined;
    showConfirm?: boolean | undefined;
    allowSameDay?: boolean | undefined;
    showSubtitle?: boolean | undefined;
    showRangePrompt?: boolean | undefined;
    firstDayOfWeek?: string | number | undefined;
    readonly teleport?: string | import('vue').RendererElement | null | undefined;
    readonly "onUpdate:show"?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    key?: PropertyKey | undefined;
    ref?: import('vue').VNodeRef | undefined;
    ref_for?: boolean | undefined;
    ref_key?: string | undefined;
    onVnodeBeforeMount?: (((vnode: import('vue').VNode) => void) | ((vnode: import('vue').VNode) => void)[]) | undefined;
    onVnodeMounted?: (((vnode: import('vue').VNode) => void) | ((vnode: import('vue').VNode) => void)[]) | undefined;
    onVnodeBeforeUpdate?: (((vnode: import('vue').VNode, oldVNode: import('vue').VNode) => void) | ((vnode: import('vue').VNode, oldVNode: import('vue').VNode) => void)[]) | undefined;
    onVnodeUpdated?: (((vnode: import('vue').VNode, oldVNode: import('vue').VNode) => void) | ((vnode: import('vue').VNode, oldVNode: import('vue').VNode) => void)[]) | undefined;
    onVnodeBeforeUnmount?: (((vnode: import('vue').VNode) => void) | ((vnode: import('vue').VNode) => void)[]) | undefined;
    onVnodeUnmounted?: (((vnode: import('vue').VNode) => void) | ((vnode: import('vue').VNode) => void)[]) | undefined;
    class?: unknown;
    style?: unknown;
    readonly title?: string | undefined;
    readonly formatter?: ((item: import('vant').CalendarDayItem) => import('vant').CalendarDayItem) | undefined;
    readonly minDate?: Date | undefined;
    readonly maxDate?: Date | undefined;
    readonly onConfirm?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    readonly color?: string | undefined;
    readonly rowHeight?: string | number | undefined;
    readonly confirmText?: string | undefined;
    readonly rangePrompt?: string | undefined;
    readonly defaultDate?: Date | Date[] | null | undefined;
    readonly confirmDisabledText?: string | undefined;
    readonly onSelect?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    readonly onClickDisabledDate?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    readonly onClickSubtitle?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    readonly onPanelChange?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    readonly onUnselect?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    readonly onMonthShow?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    readonly onOverRange?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    onClick?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
} | undefined, options?: {
    popupProps?: Partial<typeof Popup extends Component<{
        $props: infer P;
    }> ? P & {
        style: Partial<CSSStyleDeclaration>;
    } : never>;
    mount?: Element;
} | undefined) => void;
export declare const useVantDatePickerGroup: (props?: {
    showToolbar?: boolean | undefined;
    tabs?: string[] | undefined;
    activeTab?: string | number | undefined;
    key?: PropertyKey | undefined;
    ref?: import('vue').VNodeRef | undefined;
    ref_for?: boolean | undefined;
    ref_key?: string | undefined;
    onVnodeBeforeMount?: (((vnode: import('vue').VNode) => void) | ((vnode: import('vue').VNode) => void)[]) | undefined;
    onVnodeMounted?: (((vnode: import('vue').VNode) => void) | ((vnode: import('vue').VNode) => void)[]) | undefined;
    onVnodeBeforeUpdate?: (((vnode: import('vue').VNode, oldVNode: import('vue').VNode) => void) | ((vnode: import('vue').VNode, oldVNode: import('vue').VNode) => void)[]) | undefined;
    onVnodeUpdated?: (((vnode: import('vue').VNode, oldVNode: import('vue').VNode) => void) | ((vnode: import('vue').VNode, oldVNode: import('vue').VNode) => void)[]) | undefined;
    onVnodeBeforeUnmount?: (((vnode: import('vue').VNode) => void) | ((vnode: import('vue').VNode) => void)[]) | undefined;
    onVnodeUnmounted?: (((vnode: import('vue').VNode) => void) | ((vnode: import('vue').VNode) => void)[]) | undefined;
    class?: unknown;
    style?: unknown;
    readonly title?: string | undefined;
    readonly cancelButtonText?: string | undefined;
    readonly confirmButtonText?: string | undefined;
    readonly onCancel?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    readonly onConfirm?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    readonly nextStepText?: string | undefined;
    readonly "onUpdate:activeTab"?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    onClick?: ((...args: any[]) => void | boolean | PromiseLike<boolean>) | undefined;
    defaultDate?: string[][] | undefined;
    minDate?: Date | undefined;
    maxDate?: Date | undefined;
    maxRange?: (number | string) | undefined;
} | undefined, options?: {
    popupProps?: Partial<typeof Popup extends Component<{
        $props: infer P;
    }> ? P & {
        style: Partial<CSSStyleDeclaration>;
    } : never>;
    mount?: Element;
} | undefined) => void;
