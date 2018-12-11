import { Validator, NG_VALIDATORS, AbstractControl } from "@angular/forms";
import { Directive, Input } from "@angular/core";


@Directive({
  selector: '[appSelectValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: SelectRequiredValidatorDirective,
    multi: true
  }]
})

export class SelectRequiredValidatorDirective implements Validator {
  @Input('appSelectValidator') defaultvalue: string
  validate(control: AbstractControl): { [key: string]: any } | null {
    return control.value === this.defaultvalue ? { 'defaultSelected': true } : null
  }
}
