import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ListitemProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
// const API : string = "https://jsonplaceholder.typicode.com/posts";
const API : string = "http://slimpresident/public/main";


@Injectable()
export class ListitemProvider {

  private cart : Array<any> = []
  private badge : number = 0

  constructor(public http: HttpClient,
              public toastCtrl: ToastController) {
  }

  getPost(){
    return this.http.get(API)
  }

  getCart(){
    return this.cart
  }

  AddCart(item){
    if(this.cart.indexOf(item) == -1){
      item.amount = 1
      this.cart.push(item)
    }else{
      this.toastCtrl.create({
        message: 'This Product has been added',
        showCloseButton: true,
        position: 'top',
        duration: 2000,
        closeButtonText: 'Done'
      }).present();
    }

  }

  getBadge(){
    this.badge = this.cart.length
    return this.badge
  }

}
