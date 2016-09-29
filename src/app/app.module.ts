import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ClockinComponent } from './clockin/clockin.component';

import { MdButtonModule } from '@angular2-material/button';

import { CookieService } from './cookie.service';
import { LocalStorageService } from './local-storage.service';
import { StorageService } from './storage.service';
import { ClockComponent } from './clock/clock.component';
import { SummaryComponent } from './summary/summary.component';
import { RecordComponent } from './record/record.component';

@NgModule({
  declarations: [
    AppComponent,
    ClockinComponent,
    ClockComponent,
    SummaryComponent,
    RecordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    // Material Design
    MdButtonModule,
  ],
  providers: [
    CookieService,
    LocalStorageService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
