import {
  Component,
  Input,
  Signal,
  WritableSignal,
  signal,
} from "@angular/core";
import { ValidationService } from "./validation.service";

@Component({
  selector: "validation-provider",
  standalone: true,
  template: `
    <div>
      <ng-content></ng-content>
      <ul *ngIf="errors().length > 0">
        <li *ngFor="let error of errors()" class="text-red-500">{{ error }}</li>
      </ul>
    </div>
  `,
})
export class ValidationProviderComponent {
  @Input() field!: string;
  @Input() rules: string[] = [];
  @Input() model!: WritableSignal<string>;

  errors: Signal<string[]> = signal([]);

  constructor(private validationService: ValidationService) {}

  validate() {
    this.validationService.validateField(this.field, this.model(), this.rules);
    this.errors = signal(this.validationService.getErrors(this.field));
  }
}
