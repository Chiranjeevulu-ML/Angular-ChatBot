import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSliderModule} from '@angular/material/slider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
 
 
 
 
const MaterialModuleList = [
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatTabsModule,
  MatFormFieldModule,
  MatCardModule,
  MatInputModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MatDialogModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSliderModule,
  MatStepperModule,
  MatCheckboxModule,
  MatRadioModule,
  MatChipsModule,
  MatBottomSheetModule,
  MatTooltipModule,
  MatExpansionModule
]
 
 
@NgModule({
  imports: [
    ...MaterialModuleList
  ],
  exports: [
    ...MaterialModuleList
  ]
})
export class MaterialModule {
 
}
 