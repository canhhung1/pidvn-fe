import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IeDcMenuComponent } from './ie-dc-menu/ie-dc-menu.component';
import { IeDcProjectComponent } from './ie-dc-project/ie-dc-project.component';

const routes: Routes = [
  {
    path: 'menu',
    component: IeDcMenuComponent,
  },
  {
    path: 'projects',
    component: IeDcProjectComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrawingControlRoutingModule { }
