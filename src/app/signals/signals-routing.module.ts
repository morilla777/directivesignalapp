import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignalsLayoutComponent } from './layout/signalsLayout/signalsLayout.component';

const routes: Routes = [
  {
    path: '',
    component: SignalsLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignalsRoutingModule { }
