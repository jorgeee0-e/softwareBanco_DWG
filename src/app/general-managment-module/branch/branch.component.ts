import { Component, ElementRef, OnInit, ViewChild, NgModule } from '@angular/core';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

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
