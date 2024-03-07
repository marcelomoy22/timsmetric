import { Component, OnInit, style } from '@angular/core';
import { UsersService } from '../services/users.service';
import * as moment from 'moment';

import { Users } from '../models/users';
import { Console } from 'console';

const swal = require('../../assets/sweetalert/sweetalert.js')
const momentTimezone = require('moment-timezone');

@Component({
    selector: 'speedOfService',
    templateUrl: '../views/speedOfService.html',
    providers: [UsersService]
})

export class SpeedOfServiceComponent implements OnInit{
    public title: string;
    public users: Users;
    public identity;
    public token;
    public activeChange = false
    public password = null
    public password2 = null
    public nawSpeedOfService
    public nawFilter
    public sortBy = "durationSeconds";
    public sortByFilter = "durationSeconds";
    public dataNaw;
    public dataStart;
    public dataEnd;
    public horaStart
    public horaEnd
    public load
    public toFilter
    public horaReal1
    public horaReal2
    public prom1
    public horaprom
    public prom2

    constructor(
        private _userService: UsersService
    ){
        this.title = 'SOS'
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.users = this.identity;
        this.dataNaw= momentTimezone(new Date()).tz('America/Monterrey').format('YYYY-MM-DD')
        this.dataStart= momentTimezone(new Date()).tz('America/Monterrey').format('YYYY-MM-DD')
        this.dataEnd= momentTimezone(new Date()).tz('America/Monterrey').format('YYYY-MM-DD')
        this.horaStart= "00:00"
        this.horaEnd= "23:59"
        this.load = false
        this.toFilter = false
        this.horaprom=0
    }


    ngOnInit(){
      this.prom1={
        ordenHora:0,
        durationHora:0,
        ordenTotal:0,
        durationTotal:0
      }
      this.horaReal1= this.dataStart + " " + this.horaStart
      this.horaReal2= this.dataEnd + " " + this.horaEnd
      this._userService.getSpeedOfService().subscribe(
            response=>{
                response.forEach((element, index) => {
                  this.prom1.ordenTotal= this.prom1.ordenTotal + element.cantidadOrdenes
                    function padNumber(number, length) {
                        let str = number.toString();
                        while (str.length < length) {
                          str = '0' + str;
                        }
                        return str;
                      }
                      function convertirSegundosATexto(durationSeconds) {
                        const horas = Math.floor(durationSeconds / 3600);
                        const minutos = Math.floor((durationSeconds % 3600) / 60);
                        const segundos = Math.floor(durationSeconds % 60); // Redondear hacia abajo para quitar las décimas
                      
                        const formatoHoras = padNumber(horas, 2);
                        const formatoMinutos = padNumber(minutos, 2);
                        const formatoSegundos = padNumber(segundos, 2);
                      
                        return `${formatoHoras}:${formatoMinutos}:${formatoSegundos}`;
                      }
                    element.durationSeconds = (element.durationSeconds) / (element.cantidadOrdenes)
                    this.prom1.durationTotal= this.prom1.durationTotal + element.durationSeconds
                    element.durationSeconds = convertirSegundosATexto(element.durationSeconds);
                    if(element.durationSecondsHora){
                        element.durationSecondsHora = (element.durationSecondsHora) / (element.cantidadOrdenesHora)
                        this.prom1.ordenHora= this.prom1.ordenHora+ element.cantidadOrdenesHora
                        this.prom1.durationHora= this.prom1.durationHora+ element.durationSecondsHora
                        element.durationSecondsHora = convertirSegundosATexto(element.durationSecondsHora);    
                        this.horaprom= this.horaprom + 1
                      }
                });

                this.nawSpeedOfService=response

                this.prom1.ordenTotal= Math.floor(this.prom1.ordenTotal / response.length)
                this.prom1.durationTotal = this.prom1.durationTotal / response.length

              if(this.horaprom>0){
                  this.prom1.ordenHora = Math.floor(this.prom1.ordenHora / this.horaprom)
                  this.prom1.durationHora = this.prom1.durationHora / this.horaprom
              }

                function padNumber2(number, length) {
                  let str = number.toString();
                  while (str.length < length) {
                    str = '0' + str;
                  }
                  return str;
                }

                function convertirSegundosATexto2(durationTotal) {
                  const horas2 = Math.floor(durationTotal / 3600);
                  const minutos2 = Math.floor((durationTotal % 3600) / 60);
                  const segundos2 = Math.floor(durationTotal % 60); // Redondear hacia abajo para quitar las décimas
                
                  const formatoHoras2 = padNumber2(horas2, 2);
                  const formatoMinutos2 = padNumber2(minutos2, 2);
                  const formatoSegundos2 = padNumber2(segundos2, 2);
                
                  return `${formatoHoras2}:${formatoMinutos2}:${formatoSegundos2}`;
                }
                this.prom1.durationTotal = convertirSegundosATexto2(this.prom1.durationTotal);

              if(this.horaprom>0){
                this.prom1.durationHora = convertirSegundosATexto2(this.prom1.durationHora);    
              }

            }, error=>{
                var errorMessage = <any>error;
                if(errorMessage != null){
                  // var body = JSON.parse(error._body)
                  // swal("Error!", "errrrrrr", "error");
                }
              }
            )
    }

    changeDate(){
      var hoy= momentTimezone(new Date()).tz('America/Monterrey').format('YYYY-MM-DD')
      var tiempo1Fecha= moment(this.dataStart, 'YYYY-MM-DD').format('YYYY-MM-DD');
      if(hoy == tiempo1Fecha){
      }else{
        this.dataEnd = momentTimezone(new Date()).tz('America/Monterrey').subtract(1, 'day').format('YYYY-MM-DD')
        this.dataNaw = momentTimezone(new Date()).tz('America/Monterrey').subtract(1, 'day').format('YYYY-MM-DD')
      }
    }

    getFilter() {
      this.load = true
      var filtro= undefined
      var hoy= momentTimezone(new Date()).tz('America/Monterrey').format('YYYY-MM-DD')
      var tiempo1Fecha= moment(this.dataStart, 'YYYY-MM-DD').format('YYYY-MM-DD');
      if(hoy == tiempo1Fecha){
        filtro= "hoy"
      }
      var tiempo1 = moment(`${this.dataStart} ${this.horaStart}`, 'YYYY-MM-DD HH:mm').format();
      var tiempo2 = moment(`${this.dataEnd} ${this.horaEnd}`, 'YYYY-MM-DD HH:mm').format();
      var data={
        request:{
          filtro: filtro,
          tiempo1: tiempo1,
          tiempo2: tiempo2
        }
      }
      this.horaReal1= this.dataStart + " " + this.horaStart
      this.horaReal2= this.dataEnd + " " + this.horaEnd
      this._userService.getFilter(data).subscribe(
        response=>{
          this.prom2={
            ordenTotal:0,
            durationTotal:0
          }
          this.toFilter = true
          response.forEach((element, index) => {
            this.prom2.ordenTotal= this.prom2.ordenTotal + element.cantidadOrdenes

            function padNumber3(number, length) {
                let str = number.toString();
                while (str.length < length) {
                  str = '0' + str;
                }
                return str;
              }
              function convertirSegundosATexto3(durationSeconds) {
                const horas = Math.floor(durationSeconds / 3600);
                const minutos = Math.floor((durationSeconds % 3600) / 60);
                const segundos = Math.floor(durationSeconds % 60); // Redondear hacia abajo para quitar las décimas
                const formatoHoras = padNumber3(horas, 2);
                const formatoMinutos = padNumber3(minutos, 2);
                const formatoSegundos = padNumber3(segundos, 2);
              
                return `${formatoHoras}:${formatoMinutos}:${formatoSegundos}`;
              }
            element.durationSeconds = (element.durationSeconds) / (element.cantidadOrdenes)
            this.prom2.durationTotal= this.prom2.durationTotal + element.durationSeconds

            element.durationSeconds = convertirSegundosATexto3(element.durationSeconds);
        });

        this.prom2.ordenTotal= Math.floor(this.prom2.ordenTotal / response.length)
        this.prom2.durationTotal = this.prom2.durationTotal / response.length

        function padNumber4(number, length) {
          let str = number.toString();
          while (str.length < length) {
            str = '0' + str;
          }
          return str;
        }
        function convertirSegundosATexto4(durationTotal) {
          const horas2 = Math.floor(durationTotal / 3600);
          const minutos2 = Math.floor((durationTotal % 3600) / 60);
          const segundos2 = Math.floor(durationTotal % 60); // Redondear hacia abajo para quitar las décimas
        
          const formatoHoras2 = padNumber4(horas2, 2);
          const formatoMinutos2 = padNumber4(minutos2, 2);
          const formatoSegundos2 = padNumber4(segundos2, 2);
        
          return `${formatoHoras2}:${formatoMinutos2}:${formatoSegundos2}`;
        }
        this.prom2.durationTotal = convertirSegundosATexto4(this.prom2.durationTotal);

          this.nawFilter= response
          this.load = false
        }, error=>{
          var errorMessage = <any>error;
          if(errorMessage != null){
            this.load = false
            // var body = JSON.parse(error._body)
            // swal("Error!", "errrrrrr", "error");
          }
        }
      )

    }




}
