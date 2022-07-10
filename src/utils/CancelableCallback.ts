export class CancelableCallback<T> {
  constructor(private callback?: (value?: T) => void) {}

  get(): (value?: T) => void {
    return (value) => {
      if (this.callback) {
        this.callback(value);
      }
    };
  }

  cancel() {
    this.callback = undefined;
  }
}
