import { Component, Signal, WritableSignal, signal } from '@angular/core';
import { ValidationService } from './validation.service';

@Component({
  selector: 'app-example',
  standalone: true,
  template: '',
})
export class ExampleComponent {
  password: WritableSignal<string> = signal('');
  errors: Signal<string[]> = signal([]);

  constructor(private validationService: ValidationService) {}

  validate() {
    this.validationService.validateField('password', this.password(), [
      'required',
      'min:6',
      'max:128',
    ]);

    // Correct way: directly assign to `errors`
    this.errors = signal(this.validationService.getErrors('password'));
  }
}
