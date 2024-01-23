import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { API } from 'src/service/api.service';
import { UserTripListModel } from '../model/UserTripListModel';
import { FormControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { DateFormatConfig } from '../common/DateFormatConfig';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentExampleDialogComponent } from '../dialog-content-example-dialog/dialog-content-example-dialog.component';
import { AuthService, User } from '@auth0/auth0-angular';
import { TripLocationListModel } from '../model/TripLocationListModel';
import { TripLocationListData } from '../model/data/TripLocationListData';
import * as moment from 'moment';
import { AppServiceUrls } from 'src/service/appserviceurls';

@Component({
  selector: 'app-new-layout',
  templateUrl: './new-layout.component.html',
  styleUrls: ['./new-layout.component.scss']
})
export class NewLayoutComponent implements OnInit{

  userTripList: any = [];
  tripLocationsList: TripLocationListModel[] = [];
  userTripSearchForm: FormGroup;
  submitted:boolean = false;
  userInfo: User = {};

  constructor(
    private api: API,
    private appServiceUrl: AppServiceUrls,
    public form_builder: FormBuilder,
    private spinner_service: NgxSpinnerService,
    private dateconfig: DateFormatConfig,
    public dialog: MatDialog,
    public auth: AuthService
  ){

    this.auth.user$.subscribe((data)=>{
      if(data != null && data != undefined){
        this.userInfo = data;
      }
    });
    // this.auth.isAuthenticated$.subscribe((success: boolean) => {
    //   console.log(success);
    // });
    const startDate = this.getAddDaysFromCurrentDate(1);
    const endDate = this.getAddDaysFromCurrentDate(3);
    this.userTripSearchForm = this.form_builder.group({
      source: ['Hyderabad', Validators.required],
      destination: ['', Validators.required],
      start_date: [startDate, Validators.required],
      end_date: [endDate, Validators.required],
      transport:["Flight"],
    });
  }
  ngOnInit() {
    //this.getTripLocations();
    this.tripLocationsList = TripLocationListData();
  }
  openDialog() {
    const dialogRef = this.dialog.open(
      DialogContentExampleDialogComponent, 
      {data: {animal: 'panda'},}
    );
    let ModelData = {title: "Map View"};
    dialogRef.componentInstance.ModelData = ModelData;
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
  
  public userTripSearchFormSubmit(){
    this.submitted = true;
    if (!this.userTripSearchForm.invalid) {
      let start_date = this.userTripSearchForm.get('start_date')?.value;
      let end_date = this.userTripSearchForm.get('end_date')?.value;
      const tripForm: any = {
        "source": this.userTripSearchForm.get('source')?.value,
        "destination": this.userTripSearchForm.get('destination')?.value,
        "start_date": this.dateconfig.getDesiredDateFormat(start_date, "YYYY/MM/DD", "D MMMM, YYYY"),
        "end_date": this.dateconfig.getDesiredDateFormat(end_date, "YYYY/MM/DD", "D MMMM, YYYY")
      }
      const headerInfo:any = {userid:""};
      if(Object.entries(this.userInfo).length !== 0){
        //tripForm["user_id"] = this.userInfo.email;
        headerInfo.userid = this.userInfo.sub;
      }
      this.userTripSearchSubmit(tripForm, headerInfo);
      this.submitted = false;
    }else {
      //this.spinner_service.hide();
    }
  }

  get userTripSearchFormError() {
    return this.userTripSearchForm.controls; 
  }

  public getTransportMode(transportInfo:any){
    return transportInfo.price;
  }

  public userTripSearchSubmit(tripSearchForm: any, headerInfo:any) {
    this.spinner_service.show();
    const url = this.appServiceUrl.getExecuteUrlName("trip");
    console.log(url);
    console.log(headerInfo);
    this.api.post(url, tripSearchForm, headerInfo).subscribe((response: any) => {
      console.log(response);
      this.userTripList = response.data;
      this.spinner_service.hide();
    }, (error: any) => {
      this.userTripList = [];
      //console.log(error);
      this.spinner_service.hide();
    });
  }
  public getTripLocations() {
    this.spinner_service.show();
    const url = this.appServiceUrl.getExecuteUrlName("trip");
    this.api.get(url).subscribe((response: any) => {
      let locationList = response.data;
      Object.values(locationList).forEach(val =>{
        //this.tripLocationsList.push(val);
      });
      //console.log(this.tripLocationsList);
      this.spinner_service.hide();
    }, (error: any) => {
      this.tripLocationsList = [];
      //console.log(error);
      this.spinner_service.hide();
    });
  }
  public getAddDaysFromCurrentDate(days:number){
    if(days){
      return moment().add(days, 'days').utc().toISOString();
    }else{
      return new Date();
    } 
  }

}
