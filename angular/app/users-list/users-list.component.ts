import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {EventFontService, EventRouteService} from '../event.service';
import {MatPaginator, Sort} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {UserModel, UsersListServiceService} from './users-list-service.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

    public search: string;
    //initializing p to one
    p: number = 1;

    public Users: Array<UserModel>;

    ngOnInit() {}

  constructor(private url: EventRouteService, private router: Router, private users_service: UsersListServiceService) {
      this.url.getSignal('/users-list');
      users_service.getUsersList().subscribe(data => {this.Users = data; /*console.log(data)*/});
  }


    goToItem(myItem: number){
        this.router.navigate(
            ['/adminPanel', myItem],{}
        );
    }

//sorting
    key: string = 'id'; //set default
    reverse: boolean = false;

    sort(key){
        this.key = key;
        this.reverse = !this.reverse;
    }


    public Search():void{
        console.log(this.search);
    }

    ngOnDestroy():void{
        this.Users.length = 0;
        this.users_service.ngOnDestroy();
    }
}


