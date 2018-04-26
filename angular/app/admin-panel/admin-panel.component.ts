import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {MalihuScrollbarService} from 'ngx-malihu-scrollbar/dist/lib';
import {PermissionModel, RoleModel, UserModel, UsersListServiceService} from '../users-list/users-list-service.service';
import {ChartSelectEvent} from 'ng2-google-charts';

import {MatSnackBar} from '@angular/material';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit, AfterViewInit {

    private UserId: number;
    public checked2: boolean = true;
    public checked1: boolean = true;
    public CheckedRolesArr: Array<boolean>;
    public CheckedPermissionsArr: Array<boolean>;
    public CheckedRolesArrHidden: Array<boolean>;
    public CheckedPermissionsArrHidden: Array<boolean>;

    public roleInput: string;

    public inputField: boolean;

    OneRole: RoleModel;
    OnePermission: PermissionModel;
    RolesData: Array<RoleModel> = [];
    PermissionsData: Array<PermissionModel> = [];
    private User: UserModel;
    private routeSubscription: Subscription;

    transferDataSuccess($event: any) {
        this.RolesData.push($event.dragData);
        console.log($event.dragData);
    }

    public pieChartData: any;

    transferRoleDelete($event: any) {
        if($event.dragData.type === 'RoleModel'){
            this.RolesData.splice(this.RolesData.indexOf($event.dragData),1);
            this.addRoleToogle = false;
        }
    }

    transferPermissionDelete($event: any) {
        if($event.dragData.type === 'PermissionModel')
            this.PermissionsData.splice(this.PermissionsData.indexOf($event.dragData),1);
    }

  constructor(private route: ActivatedRoute, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer
      , private scrollbarService: MalihuScrollbarService, private users_service: UsersListServiceService,
              public snackBar: MatSnackBar) {
      this.routeSubscription = route.params.subscribe(params=>{
          this.UserId=params['id']; this.getUser(params['id']-1);
      });
      //регистрируем SVG изображение.
      iconRegistry.addSvgIcon(
          'role2',
          sanitizer.bypassSecurityTrustResourceUrl('../img/role1.svg'));

      this.inputField = false;

      /*--------------------------------------------------------------------------------------------------*/

      /*--------------------------------------------------------------------------------------------------*/

  }

  public toogleInputRole():void{
        this.inputField = !this.inputField;
  }

  public addRoleToogle: boolean = true;

    /**
     * Method for save new role.
     * @param {void}
     * @return {void}
     */
  public saveRole():void{
        if(Boolean(this.roleInput)) {
            console.log(this.roleInput);
        for(let role=0; role<this.RolesData.length; role++) {
            if (this.RolesData[role].name.toLocaleLowerCase() === this.roleInput.toLocaleLowerCase()) {
                return;
            }
        }
            this.RolesData.push({id: this.RolesData[this.RolesData.length - 1].id+1, name: this.roleInput, type: 'RoleModel'});
            this.CheckedRolesArrHidden.push(true);
            this.CheckedRolesArr.push(false);
            this.addRoleToogle = false;
            return;
        }
        else return;
  }

    /**
     * Method for save new role on server.
     * @return {boolean}
     * @param {void}
     */
  public BackupRoles():void{
      console.log(this.RolesData);
      this.users_service.rolesServe(this.RolesData, this.User.id).subscribe(Result=>{
          if(Boolean(Result)){
              this.openSnackBar('The role was successfully added.', 'Close');
          }else{
              this.openSnackBar('The role was not added.', 'Close');
          }
      });
  }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }




  private getUser(id: number): void{
      this.users_service.getUsersList().subscribe(data => {
          this.User = data[id];
          this.RolesData = data[id]['role_list'];
          this.CheckedRolesArr = new Array<boolean>(data[id]['role_list'].length);
          this.CheckedRolesArrHidden = new Array<boolean>(data[id]['role_list'].length);
          this.PermissionsData = data[id]['permission_list'];
          this.CheckedPermissionsArr = new Array<boolean>(data[id]['permission_list'].length);
          this.CheckedPermissionsArrHidden = new Array<boolean>(data[id]['permission_list'].length);

          for(let i=0; i<this.CheckedRolesArr.length; i++) {
              this.CheckedRolesArr[i] = false;
              this.CheckedRolesArrHidden[i] = true;
          }

          for(let g=0; g<this.CheckedPermissionsArr.length; g++){
              this.CheckedPermissionsArr[g] = false;
              this.CheckedPermissionsArrHidden[g] = true;
          }

          this.pieChartData  =  {
              chartType: 'OrgChart',
              dataTable: [
                 /**/
              ],
              options: {title: 'Tasks',
                  nodeClass: "myclass",
                  selectedNodeClass: "select_node",
                  size: "large"
              },
          };
         /**/
         this.ChartUpdate();
      });
  }

  private ChartUpdate():void{
      this.pieChartData.dataTable.length = 0;
      this.pieChartData.dataTable.push([{v: this.User.name, f: ''+this.User.id+'; '+this.User.update.toLocaleDateString()+'.'},'','User']);
      this.pieChartData.dataTable.push([{v:'Permissions list:', f:'permission of user.'},this.User.name, 'permissions list.']);
      this.pieChartData.dataTable.push([{v:'Roles list:', f:'role of user.'},this.User.name, 'roles list.']);
      for(let c of this.RolesData)
          this.pieChartData.dataTable.push([{v: 'role ID: '+c.id, f: c.name},'Roles list:',c.name]);
      for(let c of this.PermissionsData)
          this.pieChartData.dataTable.push([{v: 'permission ID: '+c.id, f: c.name},'Permissions list:',c.name]);
  }

    /**
     * Methods for add new Permission or Role to User.
     * @param {PermissionModel} element
     * @constructor
     */
  private AddPermissionOfUser(element: PermissionModel){
        if(this.PermissionsData.indexOf(element)!==(-1)) {
            this.PermissionsData.push(element);
            this.ChartUpdate();
        }
  }


    @ViewChild('table') table;
    myfunction(elem: RoleModel) {
        let googleChartWrapper = this.table.wrapper;
        let dataTable = this.table.wrapper.getDataTable();
        console.log(dataTable);
       // dataTable.setValue(5,2,elem.name);


        this.pieChartData = Object.create(this.pieChartData);
        this.pieChartData.dataTable.push([{v: 'role ID: '+elem.id, f: elem.name},'Roles list:',elem.name]);

        //force a redraw
        this.table.redraw();
    }
    private AddRoleOfUser(element: RoleModel){
       // if(this.RolesData.indexOf(element)===(-1)) {
           // this.RolesData.push(element);
            this.ChartUpdate();
            this.myfunction(element);
            console.log(this.pieChartData.dataTable);
       // }
    }

    /**
     * Event select item of chart method.
     * @param {$event}
     * @return {void}
     */
  public selectEvent: ChartSelectEvent;
  private SelectChart($event: any){
      this.selectEvent = $event;
       // console.log($event);
  }

  AddNewDataToUser($event: any){
      if($event.dragData.type === 'PermissionModel')
          this.AddPermissionOfUser($event.dragData);
      if($event.dragData.type === 'RoleModel')
          this.AddRoleOfUser($event.dragData);
  }

    /**
     * Methods for identify an interface.
     * @param object
     * @return {object is PermissionModel}
     */


  public CheckedHiddenToogle():void{
        for(let j=0; j<this.CheckedRolesArrHidden.length; j++)
            this.CheckedRolesArrHidden[j] = !this.CheckedRolesArrHidden[j];
  }

    public CheckedHidden1Toogle():void{
        for(let p=0; p<this.CheckedPermissionsArrHidden.length; p++)
            this.CheckedPermissionsArrHidden[p] = !this.CheckedPermissionsArrHidden[p];
    }

  public checked2Toogle():void{
        this.checked2 = !this.checked2;
      for(let j=0; j<this.CheckedRolesArrHidden.length; j++)
          this.CheckedRolesArrHidden[j] = true;
  }

    public checked1Toogle():void{
        this.checked1 = !this.checked1;
        for(let r=0; r<this.CheckedPermissionsArrHidden.length; r++)
            this.CheckedPermissionsArrHidden[r] = true;
    }

    public AllRolesSelectToogle(){
        for(let role = 0; role < this.CheckedRolesArr.length; role++)
            this.CheckedRolesArr[role] = true;
    }

    public AllPermissionsSelectToogle(){
        for(let elem = 0; elem < this.CheckedPermissionsArr.length; elem++)
            this.CheckedPermissionsArr[elem] = true;
    }

  ngOnInit() {
  }

  public ucFirst(str: string): string {
        // только пустая строка в логическом контексте даст false
        if (!str) return str;

        return str[0].toUpperCase() + str.slice(1);
    }


    /*---------------------------------------------------------------------------------------------------*/

    /*---------------------------------------------------------------------------------------------------*/

    /**
     * Custom scroll activate Method
     * @param void
     * @return void
     */
    ngAfterViewInit() {
        this.scrollbarService.initScrollbar('#left', { axis: 'y', theme: 'minimal-dark', scrollButtons: { enable: false },
            setLeft: "0px", autoHideScrollbar: true });

        this.scrollbarService.initScrollbar('#right', { axis: 'y', theme: 'minimal-dark', scrollButtons: { enable: false },
            setLeft: "0px", autoHideScrollbar: true });

        this.scrollbarService.initScrollbar('#center', { axis: 'y', theme: 'minimal-dark', scrollButtons: { enable: false },
            setLeft: "30px", autoHideScrollbar: true });
    }

}
