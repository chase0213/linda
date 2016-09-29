import { Component, OnInit } from '@angular/core';

import { StorageService } from '../storage.service';

const HISTORY_KEY = 'history';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor(private _storage:StorageService) { }

  history:any[] = [];
  summary:any = {};

  ngOnInit() {
    try {
      this.history = JSON.parse(this._storage.get(HISTORY_KEY));
    } catch (e) {
      this.history = [];
    } finally {
      this.history = this.history || [];
    }

    this.calcDailySummary();
    this.calcWeeklySummary();
    this.calcMonthlySummary();

    console.log(this.summary);
  }

  private calcSummary(type:string, limit:Date) {
    this.summary[type] = 0.0;

    var filter = function(time:any) {
      return (time.state === 'start') && (new Date(time.beginAt).getTime() >= limit.getTime());
    };

    for (let record of this.history.filter(filter)) {
      const beginAt = new Date(record.beginAt);
      const endAt = new Date(record.endAt);
      this.summary[type] += (endAt.getTime() - beginAt.getTime()) / 1000;
    }

    const s = this.summary[type];
    const hour = Math.floor(s / 3600);
    const minute = Math.floor((s % 3600) / 60);
    const second = Math.floor((s % 3600) % 60);
    this.summary[type] = {
      hour: hour,
      minute: minute,
      second: second
    }
  }

  private calcDailySummary() {
    const now = new Date();
    const limit = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    this.calcSummary('daily', limit);
  }

  private calcWeeklySummary() {
    const now = new Date();
    const limit = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
    this.calcSummary('weekly', limit);
  }

  private calcMonthlySummary() {
    const now = new Date();
    const limit = new Date(now.getFullYear(), now.getMonth(), 1);
    this.calcSummary('monthly', limit);
  }

}
