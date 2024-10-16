import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { DxButtonModule, DxChartModule, DxDataGridModule, DxPivotGridModule, DxSelectBoxModule } from 'devextreme-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { PihInvMenuComponent } from './pih-inv-menu/pih-inv-menu.component';
import { PihInvReqDetailComponent } from './pih-inv-req-detail/pih-inv-req-detail.component';
import { PihInvRequestComponent } from './pih-inv-request/pih-inv-request.component';
import { PihInventoryRoutingModule } from './pih-inventory-routing.module';
import { PihInventoryComponent } from './pih-inventory.component';

@NgModule({
  declarations: [
    PihInventoryComponent,
    PihInvMenuComponent,
    PihInvRequestComponent,
    PihInvReqDetailComponent,
  ],
  imports: [
    CommonModule,
    PihInventoryRoutingModule,
    NzGridModule,
    DxButtonModule,
    DxDataGridModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzTableModule,
    NzInputModule,
    FormsModule,
    NzTabsModule,
    NzPopconfirmModule,
    DxPivotGridModule,
    DxPivotGridModule,
    DxChartModule,
    NzSelectModule,
    NzDatePickerModule,
    NzRadioModule,
    NzUploadModule,
    NzSpaceModule,
    DxSelectBoxModule
  ],
})
export class PihInventoryModule {}
