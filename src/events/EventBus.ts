type EventMap = {
  'mode:change': { from: string; to: string };
  'mode:transition:start': { to: string };
  'mode:transition:end': { mode: string };
  'settings:change': { settings: Record<string, unknown> };
  'click-through:toggle': { enabled: boolean };
  'notification:show': { title: string; message: string };
  'window:reset-position': void;
  'app:exit': void;
  'settings:open': void;
};

type EventKey = keyof EventMap;
type Handler<K extends EventKey> = (payload: EventMap[K]) => void;

export class EventBus {
  private handlers = new Map<EventKey, Set<Handler<EventKey>>>();

  on<K extends EventKey>(event: K, handler: Handler<K>): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    const set = this.handlers.get(event)!;
    set.add(handler as Handler<EventKey>);
    return () => set.delete(handler as Handler<EventKey>);
  }

  emit<K extends EventKey>(event: K, payload: EventMap[K]): void {
    const set = this.handlers.get(event);
    if (!set) return;
    for (const handler of set) {
      (handler as Handler<K>)(payload);
    }
  }

  once<K extends EventKey>(event: K, handler: Handler<K>): () => void {
    const off = this.on(event, ((payload: EventMap[K]) => {
      off();
      handler(payload);
    }) as Handler<K>);
    return off;
  }
}

export const eventBus = new EventBus();
