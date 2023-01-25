import { FormGroup } from '@angular/forms';
// custom validator to check that two fields match
export function exist(tab: any, ControlName: string) {
return (formGroup: FormGroup) => {
// const control = formGroup.controls[tab];
const matchingControl = formGroup.controls[ControlName];
 // set error on matchingControl if validation fails
for (let i = 0; i < tab.length; i++) {
    
    

 if ( tab[i].firstName == matchingControl.value)    {
matchingControl.setErrors({ exist: true }); } else {
matchingControl.setErrors(null); }
} }}
