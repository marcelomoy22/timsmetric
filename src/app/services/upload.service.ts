import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {GLOBAL} from './global';

@Injectable()
export class UploadService{
    public identity;
    public token;
    public url: string;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    } 

    makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name: string){
        console.log("12312312312312312312312312312123123123123123123123123123123123123")
        return new Promise(function(resolve, reject){
            var formData:any = new FormData()
            var xhr = new XMLHttpRequest()

            for(var i= 0; i<files.length; i++){
                formData.append(name, files[i], files[i].name)
            }

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response))
                    } else{
                        reject(xhr.response)
                    }
                }
            }


        })
    }
}