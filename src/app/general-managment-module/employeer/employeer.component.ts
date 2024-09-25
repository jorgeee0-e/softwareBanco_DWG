import { Component, ElementRef, OnInit, ViewChild, NgModule } from '@angular/core';

@Component({
  selector: 'app-employeer-general',
  templateUrl: './employeer.component.html',
  styleUrls: ['./employeer.component.css']
})
export class EmployeerGeneralComponent implements OnInit {

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
