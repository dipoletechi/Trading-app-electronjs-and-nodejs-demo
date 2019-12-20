import {AbstractControl, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
 
    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('passwordControl').value; // to get value in input tag
        let confirmPassword = AC.get('confirmPasswordControl').value; // to get value in input tag
         if(password != confirmPassword) {             
             AC.get('confirmPasswordControl').setErrors( {MatchPassword: true} )
         } else {             
             return null
         }
     }
}