import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {
  get(key: string) {
    if (!key || !this.hasItem(key)) {
      return null;
    }
    let regexp = new RegExp(key + "=" + "([^;]+)[;$]?");
    return document.cookie.match(regexp)[1];
  }

  set(key: string, value: string, options?: any) {
    if (!key) { return; }
    var cookieOptions = "";
    for (let o of options) {
      cookieOptions += ";" + o + "=" + options[o];
    }
    document.cookie = key + "=" + value + cookieOptions;
  }

  remove(key: string, path: string) {
    if (!key || !this.hasItem(key)) { return; }
    document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (path ? "; path=" + path : "");
  }

  hasItem(key: string) {
    let regexp = new RegExp(key + "=" + "([^;]+)[;$]?");
    return regexp.test(document.cookie);
  }
}