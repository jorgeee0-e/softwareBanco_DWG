import { Component, ElementRef, OnInit, ViewChild, NgModule } from '@angular/core';

@Component({
  selector: 'app-movements-general',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit {

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
