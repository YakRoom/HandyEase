type ErrorListener = (error: string | null) => void;

class ErrorStore {
  private listeners: ErrorListener[] = [];

  subscribe(listener: ErrorListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  setError(error: string | null) {
    this.listeners.forEach((listener) => listener(error));
  }
}

export const errorStore = new ErrorStore();
