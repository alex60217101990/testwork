import {Component, OnDestroy, OnInit} from '@angular/core';
import {CitiesService, City} from './cities.service';
import {EventFontService, EventRouteService} from '../event.service';

declare var Pusher: any;

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit, OnDestroy {

    private pusher: any;
    protected messages: Array<Message>=new Array<Message>();
    public test_mess:any;

    /**
     * @constructor
     * @param {CitiesService} data
     * @param {EventRouteService} url
     */
  constructor(private data: CitiesService, private url: EventRouteService){
        /* Server event new parse ad. */

        Pusher.logToConsole = true;

        let pusher = new Pusher('2a9e8ea81f044d414c33', {
            cluster: 'eu',
            encrypted: true
        });


        let channel = pusher.subscribe('my-channel');
        channel.bind('my-event', (data)=>{
            console.log(data);
            this.test_mess=data.message.toString();
        });


         channel.bind('pusher:subscription_succeeded', function(members) {
            console.log(members);

        });



        this.url.getSignal('/');
  }

  ngOnInit(){
  }
    ngOnDestroy() {
        this.data.ngOnDestroy();
        console.log('Service destroy');
    }


    start(){
      console.log('click');
      this.data.connect();
    }

}


interface Message {
    user: number;
    body: string;
    created_at: string;
    updated_at: string;
}