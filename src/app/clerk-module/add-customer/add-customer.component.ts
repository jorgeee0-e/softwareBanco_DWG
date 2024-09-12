import { Component, ElementRef, OnInit, ViewChild, NgModule } from '@angular/core';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  @ViewChild('delete') delete!: ElementRef;
  constructor() { }
  @ViewChild('dropd') dropd!:ElementRef;

  ngOnInit() {
  }


  updateButtonText(text: string){
    this.dropd.nativeElement.textContent=text;
  }

  checker(){
   console.log("click")
  }

}
