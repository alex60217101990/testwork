import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UsersListServiceService implements OnDestroy{
  constructor(private http: HttpClient) {}

  public getUsersList(): Observable<Array<UserModel>>{
     return this.http.post('/content/getUsers',1).map(users => {
        let Users: Array<UserModel> = new Array<UserModel>();
        console.log(users);
        for(let user in users){
            for(let key in users[user]){
               for(let element in users[user][key]) {
                   if(element === 'user'){
                       let NewUser: UserModel = { id: 1, name: '', email: '', update: new Date(),
                           permission_list: [], role_list: []};

                       NewUser.id = users[user][key][element]['id'];
                       NewUser.name = users[user][key][element]['name'];
                       NewUser.email = users[user][key][element]['email'];
                       NewUser.update = new Date(users[user][key][element]['updated_at'].replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
                       for(let obj of users[user][key][element]['roles']) {
                              // console.log(users[user][key][element]['roles'][obj]);
                               NewUser.role_list.push({id: obj['id'], name: obj['name'], type: 'RoleModel'});
                                   for(let permission of obj['permissions']){
                                       NewUser.permission_list.push({id: permission['id'], name: permission['name'], type: 'PermissionModel'});
                                   }
                       }
                    //   console.log(NewUser);
                       Users.push(NewUser);
                       NewUser = null;
                   }

               }
            }
        }
        return Users;
      });
  }

  public ngOnDestroy(){
  }


  public rolesServe(roles: Array<RoleModel>, id: number):Observable<boolean>{
      return this.http.post<AddResponse>('/admin/backupUserRoles', {roles_list: JSON.stringify(roles), user_id: id})
          .map(response=>{
          console.log(response);
          return response.result;
      })
          .catch((err: any, caught) => {
              if (err instanceof HttpErrorResponse) {
                  if (err.status === 502) {
                      console.info('err.error =', err.error, ';');
                  }
                  return Observable.throw(err);
              }
          });
  }

}
export interface AddResponse{
    result: boolean;
}

export interface UserModel {
    id: number;
    name: string;
    email: string;
    update: Date;
    role_list: Array<RoleModel>;
    permission_list: Array<PermissionModel>;
   // discriminator: 'UserModel';
}

export interface PermissionModel {
    id: number;
    name: string;
    type: 'PermissionModel';
}

export interface RoleModel {
    id: number;
    name: string;
    type: 'RoleModel';
}