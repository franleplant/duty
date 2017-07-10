
export default class Timer {
  constructor(callback, interval) {
    this.timer = null;
    this.prevTime = null;
    this.callback = callback;
    this.interval = interval;

    this.start();
  }

  start() {
    this.prevTime = window.performance.now()
    this.timer = window.requestAnimationFrame(this.step.bind(this))
  }

  step(time) {
    const timeStep = performance.now() - this.prevTime

    if (timeStep >= this.interval) {
      this.prevTime = this.prevTime + timeStep;
      this.callback(timeStep);
    }

    this.timer = window.requestAnimationFrame(this.step.bind(this));
  }

  stop() {
    window.cancelAnimationFrame(this.timer);
    delete this.timer;
  }

}
