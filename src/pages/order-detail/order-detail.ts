import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ListitemProvider } from '../../providers/listitem/listitem';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { HomePage } from '../home/home';

/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {

  public cart : Array<any> = []
  public totalPrice : number = 0
  public consumerForm : FormGroup

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public listItem: ListitemProvider,
              public formBuilder: FormBuilder,
              public alertCtrl: AlertController) {

      this.consumerForm = this.formBuilder.group({
        name: ['', Validators.required],
        tel: ['', Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)])],
        email: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        address: ['', Validators.required]
      });
      this.cart = this.listItem.getCart()
  }

  ionViewDidLoad() {  
    this.checkTotalPrice()
  }

  increaseAmount(item){
    item.amount += 1
    this.checkTotalPrice()
  }
  decreaseAmount(item){
    item.amount -= 1
    this.checkTotalPrice()
  }
  delCart(i){
    this.cart.splice(i, 1)
    this.checkTotalPrice()
  }
  checkTotalPrice(){
    this.totalPrice = 0
    this.cart.forEach(item => {
      this.totalPrice = this.totalPrice + (item.cost * item.amount)
    })
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Purchase Success',
      subTitle: '',
      buttons: ['Ok!']
    });
    alert.present();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: 'This is your finally information?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel Click')
          }
        },
        {
          text: 'Buy',
          handler: () => {
            if(this.consumerForm.valid){
              this.nextPage()
              this.presentAlert()
            }else{
              console.log('Invalid Formgroup Validatation')
            }
          }
        }
      ]
    });
    alert.present();
  }

  nextPage(){
    this.navCtrl.push(HomePage)
  }

}
