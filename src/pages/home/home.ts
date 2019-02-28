import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListitemProvider } from '../../providers/listitem/listitem';
import 'rxjs/add/operator/map';
import { Http,Headers } from '@angular/http';
import { OrderDetailPage } from '../order-detail/order-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //ต้อง map ก่อน
  public MainCourse : Array<any> = []
  //ไม่ต้อง map
  public testItem : any
  public cart : Array<any> = []
  public badge : number = 0

  constructor(public navCtrl: NavController,
              private listItems: ListitemProvider,
              public http: Http) {
                console.group()
                console.log(1)
                console.log(2)
                console.log(3)
                console.groupEnd()
    this.badge = this.listItems.getBadge()
    // http://slimpresident/public/president
    // https://jsonplaceholder.typicode.com/posts
    this.http.get('http://slimpresident/public/main')
      .map(result => result.json())
      .subscribe(result => {
        this.MainCourse = result
      }
    )
    // this.listItems.getPost().subscribe(res => { 
    //   this.MainCourse = res 
    //   console.log(res)
    // });
  }

  AddCart(item){
    this.listItems.AddCart(item)
    this.badge = this.listItems.getBadge()
  }

  Next(){
    this.navCtrl.push(OrderDetailPage)
  }

}
