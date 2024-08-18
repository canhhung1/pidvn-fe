import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {
  DxButtonModule,
  DxDataGridModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { DrawingControlRoutingModule } from './drawing-control-routing.module';
import { DrawingControlComponent } from './drawing-control.component';
import { IeDcMenuComponent } from './ie-dc-menu/ie-dc-menu.component';

import {
  DxDateBoxModule, DxDropDownBoxModule, DxFileUploaderModule, DxFormModule,
  DxHtmlEditorModule, DxMapModule, DxNumberBoxModule, DxTextBoxModule, DxTreeListModule, DxValidatorModule
} from 'devextreme-angular';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { IeDcProjectComponent } from './ie-dc-project/ie-dc-project.component';
@NgModule({
  declarations: [
    DrawingControlComponent,
    IeDcMenuComponent,
    IeDcProjectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DrawingControlRoutingModule,
    NzBreadCrumbModule,
    NzCollapseModule,
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    NzGridModule,
    NzProgressModule,
    NzTimelineModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzTableModule,
    NzDatePickerModule,
    DxFileUploaderModule,
    DxTreeListModule,
    NzDividerModule,
    NzCardModule,
    NzInputModule,
    NzSelectModule,
    DxFormModule,
    DxHtmlEditorModule,
    DxTextBoxModule,
    DxMapModule,
    DxValidatorModule,
    DxNumberBoxModule,
    DxDateBoxModule,
    DxDropDownBoxModule
  ],
})
export class DrawingControlModule {}
