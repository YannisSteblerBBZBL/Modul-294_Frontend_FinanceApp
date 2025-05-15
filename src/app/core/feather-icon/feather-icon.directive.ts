import { AfterViewInit, Directive } from '@angular/core';
import * as feather from 'feather-icons';

@Directive({
  selector: '[appFeatherIcon]',
  standalone: true
})

export class FeatherIconDirective implements AfterViewInit{

  ngAfterViewInit(): void {
    feather.replace();
  }

}
