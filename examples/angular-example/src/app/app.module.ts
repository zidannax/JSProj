import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import {
  JSProjAngularDashboardModule,
  JSProjAngularStatusBarModule,
  JSProjAngularDragDropModule,
  JSProjAngularProgressBarModule,
  JSProjAngularDashboardModalModule,
} from '@JSProj' +
  /angular'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    JSProjAngularDashboardModule,
    JSProjAngularStatusBarModule,
    JSProjAngularDashboardModalModule,
    JSProjAngularDragDropModule,
    JSProjAngularProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
