import { Component, OnInit } from '@angular/core';
import {EventFontService, EventRouteService} from '../event.service';

@Component({
  selector: 'app-other-content',
  templateUrl: './other-content.component.html',
  styleUrls: ['./other-content.component.scss']
})
export class OtherContentComponent implements OnInit {

  constructor(private url: EventRouteService, private event$: EventFontService) {
    this.url.getSignal('/other');
      event$.getSignal(false);
  }

  ngOnInit() {
  }

}
