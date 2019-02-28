import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ListitemProvider } from '../../providers/listitem/listitem';
import { OrderDetailPage } from '../order-detail/order-detail';

/**
 * Generated class for the ItemList2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-list2',
  templateUrl: 'item-list2.html',
})
export class ItemList2Page {

  public Snack : Array<any> = []
  public Drink : Array<any> = []
  public badge : number = 0

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http,
              public listItems: ListitemProvider) {
    this.badge = this.listItems.getBadge()

    this.http.get('http://slimpresident/public/snack')
    .map(result => result.json())
    .subscribe(result => {
      this.Snack = result
      }
    )
    this.http.get('http://slimpresident/public/drink')
    .map(result => result.json())
    .subscribe(result => {
      this.Drink = result
      }
    )
  }

  ionViewDidLoad() {
    
  }

  AddCart(item){
    this.listItems.AddCart(item)
    this.badge = this.listItems.getBadge()
  }

  Next(){
    this.navCtrl.push(OrderDetailPage)
  }

}
