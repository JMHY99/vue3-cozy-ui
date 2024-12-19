import type { InjectionKey, Ref } from 'vue';

export interface CollapseContext {
  activeKeys: Ref<Array<string | number>>;
  togglePanel: (key: string | number) => void;
  accordion: boolean;
  expandIcon?: string;
  expandIconPosition: 'start' | 'end';
  size: 'large' | 'default' | 'small';
}

export const collapseContextKey = Symbol('collapseContext') as InjectionKey<CollapseContext>; 