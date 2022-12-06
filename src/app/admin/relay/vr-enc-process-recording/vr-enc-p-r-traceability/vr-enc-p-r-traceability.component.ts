import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VrEncPRService } from '../services/vr-enc-p-r.service';

@Component({
  selector: 'app-vr-enc-p-r-traceability',
  templateUrl: './vr-enc-p-r-traceability.component.html',
  styleUrls: ['./vr-enc-p-r-traceability.component.scss'],
})
export class VrEncPRTraceabilityComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private vrEncPRSvc: VrEncPRService
  ) {}

  lines: any;

  records: any;

  searchVo = {
    fromDate: new Date(),
    toDate: new Date(),
    line: null
  };

  date: Date[] = [new Date(), new Date()];

  ngOnInit(): void {
    this.getLines(2);
  }

  getLines(productId: number) {
    this.vrEncPRSvc.getLines(productId).subscribe((response) => {
      this.lines = response;
      console.log('Lines: ', this.lines);
    });
  }

  onSearch() {
    console.log(this.searchVo);
    
    this.vrEncPRSvc.traceability(this.searchVo).subscribe(
      response => {
        this.records = response
      }
    )
  }

  onChangeTime(event: Date[]) {
    this.searchVo.fromDate = event[0];
    this.searchVo.toDate = event[1];
  }

  onExportClient(event: any) {}


}
