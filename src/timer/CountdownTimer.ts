export class CountdownTimer {
  private interval: number;
  private expectedEnd: number;
  private expectedTick: number;
  private timeout: NodeJS.Timeout;
  private onFinish: () => void;
  private onTick: () => void;

  constructor(interval: number, onFinish: () => void, onTick: () => void) {
    this.interval = interval;
    this.onFinish = onFinish;
    this.onTick = onTick;
    this.expectedEnd = null;
    this.expectedTick = null;
  }

  start(duration: number) {
    const currentTime = Date.now();
    this.expectedEnd = currentTime + duration;
    this.expectedTick = currentTime + this.interval;
    this.timeout = setTimeout(this.tick.bind(this), this.interval);
  }

  stop() {
    clearTimeout(this.timeout);
  }

  get timeRemaining() {
    return Math.max(this.expectedEnd - Date.now(), 0);
  }

  tick() {
    const drift = Date.now() - this.expectedTick;

    this.expectedTick += this.interval;

    this.onTick();

    if (this.expectedTick >= this.expectedEnd) {
      this.stop();
      this.onFinish();
    } else {
      this.timeout = setTimeout(
        this.tick.bind(this),
        Math.max(0, this.interval - drift)
      );
    }
  }
}
