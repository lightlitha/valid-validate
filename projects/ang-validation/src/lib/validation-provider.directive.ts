// import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
// import { ValidationService } from './validation.service';

// @Directive({
//   selector: '[s3ValidationProvider]',
// })
// export class ValidationProviderDirective {
//   @Input() appValidationProvider: string = '';
//   @Input() value: any;
//   @Output() errors = new EventEmitter<string[]>();

//   constructor(private validationService: ValidationService) {}

//   @HostListener('blur', ['$event.target.value'])
//   validate(value: any) {
//     if (!this.appValidationProvider) return;
//     const rules = this.appValidationProvider.split('|');
//     const errorMessages = rules
//       .map((rule) => {
//         const [name, param] = rule.split(':');
//         return this.validationService.validateField(name, value, [param]);
//       })
//       .filter((message) => message !== null);

//     this.errors.emit(errorMessages);
//   }
// }
