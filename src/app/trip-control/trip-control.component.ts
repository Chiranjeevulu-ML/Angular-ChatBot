import { Component, OnInit } from '@angular/core';
import { API } from 'src/service/api.service';
import { UserTripListModel } from '../model/UserTripListModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { DateFormatConfig } from '../common/DateFormatConfig';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentExampleDialogComponent } from '../dialog-content-example-dialog/dialog-content-example-dialog.component';
import { AuthService } from '@auth0/auth0-angular';
import { TripLocationListModel } from '../model/TripLocationListModel';
import { TripLocationListData } from '../model/data/TripLocationListData';

@Component({
  selector: 'app-trip-control',
  templateUrl: './trip-control.component.html',
  styleUrls: ['./trip-control.component.scss']
})
export class TripControlComponent implements OnInit {

  userTripList: any = [];
  tripLocationsList: TripLocationListModel[] = [];
  userTripSearchForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private api: API,
    public form_builder: FormBuilder,
    private spinner_service: NgxSpinnerService,
    private dateconfig: DateFormatConfig,
    public dialog: MatDialog,
    public auth: AuthService
  ) {
    auth.user$.subscribe(data => {
      console.log(data);
    });
    this.userTripSearchForm = this.form_builder.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(
      DialogContentExampleDialogComponent,
      { data: { animal: 'panda' }, }
    );
    let ModelData = { title: "Map View" };
    dialogRef.componentInstance.ModelData = ModelData;
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  ngOnInit() {
    this.tripLocationsList = TripLocationListData();
  }

  public userTripSearchFormSubmit() {
    this.submitted = true;
    if (!this.userTripSearchForm.invalid) {
      let start_date = this.userTripSearchForm.get('start_date')?.value;
      let end_date = this.userTripSearchForm.get('end_date')?.value;
      const tripForm = {
        "source": this.userTripSearchForm.get('source')?.value,
        "destination": this.userTripSearchForm.get('destination')?.value,
        "start_date": this.dateconfig.getDesiredDateFormat(start_date, "MM/DD/YYYY", "D MMMM, YYYY"),
        "end_date": this.dateconfig.getDesiredDateFormat(end_date, "MM/DD/YYYY", "D MMMM, YYYY")
      }
      this.userTripSearchSubmit(tripForm);
      this.submitted = false;
    } else {
      //this.spinner_service.hide();
    }
  }

  get userTripSearchFormError() {
    return this.userTripSearchForm.controls;
  }

  public userTripSearchSubmit(tripSearchForm: any) {
    this.spinner_service.show();
    const url = "http://172.18.1.145:8000/api/trip";
    this.api.post(url, tripSearchForm).subscribe({
      next: (response: any) => {
        //console.log(response);
        this.userTripList = response.data;
        this.spinner_service.hide();
      },
      error: (error: any) => {
        this.userTripList = [];
        //console.log(error);
        this.spinner_service.hide();
      }
    });
  }
  public getTripLocations() {
    this.spinner_service.show();
    const url = "http://172.18.1.145:8000/api/trip";
    this.api.get(url).subscribe({
      next: (response) => {
        let locationList = response.data;
        // Object.values(locationList).forEach(val =>{
        //   this.tripLocationsList.push(val);
        // });
        //console.log(this.tripLocationsList);
        this.spinner_service.hide();
      },
      error: (error) => {
        this.tripLocationsList = [];
        //console.log(error);
        this.spinner_service.hide();
      }
    });
  }
}
