import Vue from 'vue';
import _ from 'lodash';

class Bus {
  bus = new Vue();
  events: string[] = [];

  on(eventName: string, callback: Function, forceBind = false) {
    if (this.events.includes(eventName) && forceBind) {
      this.unbind(eventName);
    }
    this.bus.$on(eventName, callback);
    this.events.push(eventName);
  }

  emit(eventName: string, ...args: any) {
    this.bus.$emit(eventName, ...args);
  }

  emitGroup(eventName: string, ...args: any) {
    this.events.forEach((name) => {
      if (name.includes(eventName)) {
        this.emit(name, ...args);
      }
    });
  }

  unbind(eventName: string) {
    this.bus.$off(eventName);
    this.events = _.pull(this.events, eventName);
  }

  unbindGroup(eventName: string) {
    this.events.forEach((name) => {
      if (name.includes(eventName)) {
        this.unbind(name);
      }
    });
  }

  unbindAll() {
    this.events.forEach((name) => {
      this.unbind(name);
    });
    this.events = [];
  }
}

export default new Bus();
