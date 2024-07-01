import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string;
  // @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  onClose: EventEmitter<void> = new EventEmitter<void>();

  onCloseClick () {
    this.onClose.emit();
  }
}
