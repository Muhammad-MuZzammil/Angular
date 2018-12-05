import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appConfirmEqualValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmEqualValidatorDirective,
    multi: true
  }]
})
export class ConfirmEqualValidatorDirective implements Validator {
  validate(passwordGroup: AbstractControl): { [key: string]: any } | null {
    const password = passwordGroup.get('password')
    const confirmPassword = passwordGroup.get('confirmPassword')
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'notEqual': true };
    }
    return null
  }
}
