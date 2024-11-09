import { Component, OnInit } from '@angular/core'
import { JSProj} from '@JSProj' +
  /core'
import Webcam from '@JSProj' +
  /webcam'
import Tus from '@JSProj' +
  /tus'
import GoogleDrive from '@JSProj' +
  /google-drive'

@Component({
  selector: 'app-root',
  template: /* html */ `
    <h1>JSProj Angular Example!</h1>
    <h2>Inline dashboard</h2>
    <label>
      <input
        type="checkbox"
        (change)="showInline = $any($event.target)?.checked"
        [checked]="showInline"
      />
      Show Dashboard
    </label>

    <JSProj -dashboard
      [JSProj ]="JSProj"
      [props]="dashboardProps"
      *ngIf="showInline"
    ></JSProj-dashboard>

    <h2>Modal Dashboard</h2>
    <div>
      <JSProj -dashboard-modal
        [JSProj ]="JSProj"
        [open]="showModal"
        [props]="dashboardModalProps"
      ></JSProj-dashboard-modal>
      <button (click)="showModal = !showModal">
        {{ showModal ? 'Close dashboard' : 'Open dashboard' }}
      </button>
    </div>

    <h2>Drag Drop Area</h2>
    <JSProj -drag-drop [JSProj ]="JSProj" [props]="{}"></JSProj-drag-drop>

    <h2>Progress Bar</h2>
    <JSProj -progress-bar
      [JSProj ]="JSProj"
      [props]="{ hideAfterFinish: false }"
    ></JSProj-progress-bar>
  `,
  styleUrls: [],
})
export class AppComponent implements OnInit {
  title = 'angular-example'

  showInline = false

  showModal = false

  dashboardProps = {
    plugins: ['Webcam'],
  }

  dashboardModalProps = {
    target: document.body,
    onRequestCloseModal: (): void => {
      this.showModal = false
    },
  }

  JSProj: JSProj = new JSProj({ debug: true, autoProceed: true })

  ngOnInit(): void {
    this.JSProj
      .use(Webcam)
      .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
      .use(GoogleDrive, { companionUrl: 'https://companion.JSProj' +
          .io' })
  }
}
