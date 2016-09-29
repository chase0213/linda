import { Component, OnInit } from '@angular/core';

import { StorageService } from '../storage.service';

const CURRENT_STATE_KEY = 'current-state';
const HISTORY_KEY = 'history';
const QUEUE_SIZE = 2000; // store 2,000 states

@Component({
  selector: 'app-clockin',
  templateUrl: './clockin.component.html',
  styleUrls: ['./clockin.component.scss']
})
export class ClockinComponent implements OnInit {

  constructor(private _storage:StorageService) { }

  currentState:any;

  ngOnInit() {
    const currentState = this._storage.get(CURRENT_STATE_KEY);
    if (!currentState) {
      return;
    }

    var state;
    try {
      this.currentState = JSON.parse(currentState);
      state = this.currentState.state;
    } catch (e) {
      console.warn(e);
    }
    this.onClickButton(state);
  }

  isActive:any = {};
  isInactive:any = {};

  onClickButton(button:string) {
    if (this.disabledButton(button)) {
      return;
    }

    switch (button) {
      case 'start':
        this.onStart();
        break;
      case 'pause':
        this.onPause();
        break;
      case 'stop':
        this.onStop();
        break;
    }
  }

  private disabledButton(button:string) {
    if (this.isInactive[button]) {
      return true;
    }
    return false;
  }

  private onStart() {
    if (this.isActive['start']) {
      this.isActive = {'start': false};
      this.setState('start', 'end');
    } else {
      this.isActive = {'start': true};
      this.setState('start', 'begin');
    }
  }

  private onPause() {
    if (this.isActive['stop']) {
      return;
    }

    if (this.isActive['pause']) {
      this.isActive['pause'] = false;
      this.setState('pause', 'end');
    } else {
      this.isActive = {'start': true, 'pause': true};
      this.setState('pause', 'begin');
    }
  }

  private onStop() {
    if (this.isActive['stop']) {
      this.isActive = {'stop': false};
      this.setState('stop', 'end');
    } else {
      this.isActive = {'stop': true};
      this.setState('stop', 'begin');
    }
  }

  private setState(state:string, action:string) {
    if (action === 'begin') {
      let now = new Date();
      var currentState = {state: state, time: now.toString()};
      this._storage.set(CURRENT_STATE_KEY, JSON.stringify(currentState));

      var states = [];
      try {
        states = JSON.parse(this._storage.get(HISTORY_KEY));
      } catch (e) {
        console.warn(e);
        states = [];
      } finally {
        states = states || [];
      }

      states.push({state: this.currentState.state, beginAt: this.currentState.time, endAt: now.toString()});
      if (states.length > QUEUE_SIZE) {
        states.shift();
      }
      this._storage.set(HISTORY_KEY, JSON.stringify(states));
      this.currentState = currentState;
    }
  }

}
