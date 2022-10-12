export type IUnsubscribe = () => void;

export class EventObserver<T extends Record<string, Record<string, any>>> {
  private subscriptions: Map<keyof T, Array<(input: T[keyof T]) => any>>;

  constructor() {
    this.subscriptions = new Map();
  }

  fire = (event: keyof T, data: T[keyof T]): void => {
    const cbs = this.subscriptions.get(event);
    if (!cbs) return;

    cbs.forEach((it) => it(data));
  };

  subscribe = (
    event: keyof T,
    cb: (input: T[keyof T]) => any
  ): IUnsubscribe => {
    const cbs = this.subscriptions.get(event);
    if (!cbs) {
      this.subscriptions.set(event, [cb]);
    } else {
      cbs.push(cb);
    }

    return () => {
      this.unsubscribe(event, cb);
    };
  };

  private unsubscribe = (
    event: keyof T,
    cb: (input: T[keyof T]) => any
  ): void => {
    const cbs = this.subscriptions.get(event);
    if (!cbs) return;

    const index = cbs.indexOf(cb);
    if (index < 0) return;

    cbs.splice(index, 1);
  };
}
