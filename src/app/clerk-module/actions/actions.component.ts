import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @ViewChild('dropd') dropd!:ElementRef;

  updateButtonText(text: string){
    this.dropd.nativeElement.textContent=text;
  }

}
