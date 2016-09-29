import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class StorageService {

  constructor(private _cookie: CookieService, private _localStorage: LocalStorageService) {
    if (this._localStorage.isAvailable()) {
      this.storageService = this._localStorage;
    } else {
      this.storageService = this._cookie;
    }
  }

  storageService:any;

  get(key: string):string {
    return this.storageService.get(key);
  }

  set(key: string, value: string, options?: any):void {
    this.storageService.set(key, value, options);
  }

  remove(key: string, path: string):void {
    this.storageService.remove(key, path);
  }

  hasItem(key: string):boolean {
    return this.storageService.hasItem(key);
  }


}
