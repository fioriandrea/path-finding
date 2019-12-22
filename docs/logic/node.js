class Node {
  constructor(i, j, viewUpdater) {
    this.i = i;
    this.j = j;
    this.g = Infinity;
    this.f = Infinity;
    this.viewUpdater = viewUpdater;
    //duplication
    this.parent = null;
    this._wall = false;
    this._start = false;
    this._end = false;
    this._open = false;
    this._closed = false;
    this._inPath = false;
  }

  reset() {
    this.parent = null;
    this._wall = false;
    this._start = false;
    this._end = false;
    this._open = false;
    this._closed = false;
    this._inPath = false;
    this.callViewUpdater(this);
  }

  graphDataReset() {
    this.parent = null;
    this._open = false;
    this._closed = false;
    this._inPath = false;
    this.callViewUpdater();
  }

  callViewUpdater() {
    if(this.viewUpdater) this.viewUpdater(this);
  }

  get wall() {
    return this._wall;
  }

  get start() {
    return this._start;
  }

  get end() {
    return this._end;
  }

  get open() {
    return this._open;
  }

  get closed() {
    return this._closed;
  }

  get inPath() {
    return this._inPath;
  }

  set wall(newValue) {
    this._wall = newValue;
    if(newValue) {
      this._start = false;
      this._end = false;
    }
    this.callViewUpdater();
  }

  set start(newValue) {
    this._start = newValue;
    if(newValue) {
      this._wall = false;
      this._end = false;
    }
    this.callViewUpdater();
  }

  set end(newValue) {
    this._end = newValue;
    if(newValue) {
      this._start = false;
      this._wall = false;
    }
    this.callViewUpdater();
  }

  set open(newValue) {
    this._open = newValue;
    if(newValue) {
      this._closed = false;
    }
    this.callViewUpdater();
  }

  set closed(newValue) {
    this._closed = newValue;
    if(newValue) {
      this._open = false;
    }
    this.callViewUpdater();
  }

  set inPath(newValue) {
    this._inPath = newValue;
    this.callViewUpdater();
  }
}
