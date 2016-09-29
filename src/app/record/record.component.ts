import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StorageService } from '../storage.service';

const HISTORY_KEY = 'history';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit, OnDestroy {

  constructor(private _storage:StorageService) { }

  records:any[] = [];
  subscription:Subscription;

  ngOnInit() {
    var stream = [];
    try {
      stream = JSON.parse(this._storage.get(HISTORY_KEY));
    } catch (e) {
      console.warn(e);
      stream = [];
    } finally {
      stream = stream || [];
    }

    var filter = function(record:any) {
      return record.state === 'start';
    }

    this.records = stream.filter(filter).slice(0, 20);
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  asDate(time:string):string {
    return new Date(time).toLocaleDateString('en-US');
  }

  asTime(time:string):string {
    return new Date(time).toLocaleTimeString('en-US');
  }

  calcSummary(record:any):string {
    const beginAt = new Date(record.beginAt);
    const endAt = new Date(record.endAt);

    const s = (endAt.getTime() - beginAt.getTime()) / 1000;
    const hour = Math.floor(s / 3600);
    const minute = Math.floor((s % 3600) / 60);
    const second = Math.floor((s % 3600) % 60);
    return hour + "h " + minute + "min " + second + "sec";
  }

}
