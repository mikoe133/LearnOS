// store/useCounterStore.ts
import { create } from 'zustand';
import type { MessageInstance } from 'antd/es/message/interface';

interface CounterState {
  count: number;
  collapsed: boolean; // ✅ 在 Zustand 状态中定义
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  toggleCollapsed: () => void; // ✅ 控制 collapsed 的方法
}
type MessageStore = {
  messageApi: MessageInstance | null;
  setMessageApi: (api: MessageInstance) => void;
};
const useCounterStore = create<CounterState & MessageStore>((set) => ({
  count: 0,
  collapsed: false, // ✅ 初始值
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })), // ✅ 更新 collapsed
   messageApi: null,
  setMessageApi: (api) => set({ messageApi: api }),
}));

export default useCounterStore;