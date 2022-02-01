export class AbstractLocalStorage {
    protected setItem<T>(name: string, value: T): void {
      localStorage.setItem(name, JSON.stringify(value));
    }
    protected getItem<T>(name: string): T | null {
      const info = localStorage.getItem(name);
      return info ? JSON.parse(info) : null;
    }
  }