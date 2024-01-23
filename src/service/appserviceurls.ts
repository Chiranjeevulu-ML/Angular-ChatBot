import { Injectable, Inject } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable()
export class AppServiceUrls {
    constructor(
    ) {
    }
    
    static readonly app_url = document.getElementsByTagName('base')[0].href + '/';
    static readonly site_url = 'https://' + window.location.host + '/';
    static readonly redirect_url = AppServiceUrls.app_url + 'login';
    static readonly referer_url = AppServiceUrls.site_url + 'new-layout/';
    static readonly api_url = 'https://preprod.qurix.io/preprodhims/rest/';

    static readonly execute_url_list: any = {
        trip: "trip",
        login: "login",
        userTaskUpdate: "process/update?access_token=",
    };

    getExecuteUrlName(urlname: string) {
        //console.log(env.process.ANGULAR_APP_API_URL);
        return `${environment.ANGULAR_APP_API_URL}` + `${AppServiceUrls.execute_url_list[urlname]}`;
    }

}
