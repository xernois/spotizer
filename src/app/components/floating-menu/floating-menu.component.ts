import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-floating-menu',
  templateUrl: './floating-menu.component.html',
  styleUrls: ['./floating-menu.component.scss']
})

export class FloatingMenuComponent {
  @Input() isVisible!: boolean;
  @Output() onBlur = new EventEmitter<boolean>()

  public expanded: boolean = false;

  toggleVisibility() {
    this.onBlur.next(this.isVisible)
  }

  toggleExpanded() {
    this.expanded = !this.expanded
  }
}
