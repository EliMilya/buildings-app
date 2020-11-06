import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `<div class="loader"></div>`,
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
