import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { AppServiceUrls } from 'src/service/appserviceurls';
import { API } from 'src/service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss']
})

export class AuthButtonComponent {
  constructor(
    @Inject(DOCUMENT) public document: Document, 
    public auth: AuthService,
    private appServiceUrl: AppServiceUrls,
    private api: API,
    private spinner_service: NgxSpinnerService
  ) {
    
  }
  public async handleLogin(){
    this.auth.loginWithPopup();
    await this.auth.isAuthenticated$.subscribe((isAuthenticated) => { 
      if (isAuthenticated) { 
        this.auth.user$.subscribe((data)=>{
          if(data != null && data != undefined){
            //console.log(data);
            const url = this.appServiceUrl.getExecuteUrlName("login");
            this.api.post(url, data).subscribe((response: any) => {
              //console.log(response);
              this.spinner_service.hide();
            }, (error: any) => {
              this.spinner_service.hide();
            });
          }
        });
      } 
    });

    //this.auth.loginWithRedirect();
    // this.auth.isAuthenticated$.subscribe((success: boolean) => {
    //   console.log(success);
    // });

    // this.auth.getAccessTokenSilently().subscribe(token=>{
    //   console.log(token);
    // });
  }
}
