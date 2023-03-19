import { Component } from '@angular/core';

@Component({
  selector: 'app-panel-navigation',
  templateUrl: './panel-navigation.component.html',
  styleUrls: ['./panel-navigation.component.scss']
})
export class PanelNavigationComponent {

  ngOnInit(): void {
    this.changeActive()
  }

  changeActive() { 
    const btns = document.getElementsByClassName("panel-nav");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function(e) {
      let current = document.getElementsByClassName("active");
      current[0].classList.remove("active");
      (e.target as HTMLElement).classList.add("active");
      });
    }
  }
}
