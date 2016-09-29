import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  isAvailable():boolean {
    let test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch(e) {
      return false;
    }
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  set(key: string, value: string, options?: any) {
    localStorage.setItem(key, value);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  hasItem(key: string) {
    if (localStorage.getItem(key)) {
      return true;
    } else {
      return false;
    }
  }
}