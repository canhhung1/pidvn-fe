import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { WhIqcRequestService } from './services/wh-iqc-request.service';

@Component({
  selector: 'app-wh-iqc-request',
  templateUrl: './wh-iqc-request.component.html',
  styleUrls: ['./wh-iqc-request.component.scss'],
})
export class WhIqcRequestComponent implements OnInit {
  iqcRequestDetails: any;
  iqcRequests: any;
  isOpenIqcRequestModal: boolean = false;
  isOpenIqcDetailModal: boolean = false;
  searchVo: any = {};
  iqcRequest: any = {};
  invoices: any;
  iqcRequestSelected: any;
  slipNos: any;

  constructor(
    private toastr: ToastrService,
    private whIqcSvc: WhIqcRequestService,
    private jwtHelperService: JwtHelperService
  ) { }

  ngOnInit(): void {
    this.getIQCRequests();
    this.getInvoices(); 
  }

  onSearch() {
    console.log('SearchVo: ', this.searchVo);
    this.getIQCRequests();
  }

  getInvoices() {
    this.whIqcSvc.getInvoices().subscribe((response) => {
      this.invoices = response;
    });
  }

  getSlipNoByInvoice(invoice: string) {
    this.whIqcSvc.getSlipNoByInvoice(invoice).subscribe(
      response => {
        this.slipNos = response;
        // this.iqcRequest.requestNo = response.slipNo;
      }
    )
  }

  getIQCRequests() {
    this.whIqcSvc.getIqcRequests(this.searchVo).subscribe((response) => {
      console.log(response);
      this.iqcRequests = response;
    });
  }

  /*showDetail(item: any) {
    console.log('Item : ', item);
    
    this.whIqcSvc.getIqcRequestDetail(item.requestNo, item.invoice).subscribe((response) => {
      this.isOpenIqcRequestModal = true;
      this.iqcRequestDetails = response;
    });
  }*/

  createIqcRequest() {
    // Validate input
    if (!this.iqcRequest?.requestNo || !this.iqcRequest?.invoice || !this.iqcRequest?.supplier) {
      this.toastr.warning('Cần nhập đủ thông tin !', 'Warning');
      return;
    }

    let requestedBy = this.jwtHelperService.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;
    this.iqcRequest.requestedBy = requestedBy;

    this.whIqcSvc.createIqcRequest(this.iqcRequest).subscribe((response) => {
      this.toastr.success('Đã tạo request IQC', 'Success');
      this.getIQCRequests();
      this.isOpenIqcRequestModal = false;
    });
  }

  openIqcDetailModal(data: any) {

    this.iqcRequestSelected = { ...data };

    console.log(this.iqcRequestSelected);
    

    let searchVo = {
      invoice: data.invoice,
      requestNo: data.requestNo,
    }

    this.whIqcSvc.getIqcRequestDetail(searchVo.requestNo, searchVo).subscribe((response) => {
      this.iqcRequestDetails = response;
      this.isOpenIqcDetailModal = true;
    });

  }

  onChangeInvoice(data: any) {
    if (!data) {
      this.iqcRequest.requestNo = null
      return;
    }

    this.getSlipNoByInvoice(data);
  }

  // Handle date picker
  onChange(result: any): void {
    this.searchVo.fromDate = result[0];
    this.searchVo.toDate = result[1];
  }

  onCalendarChange(result: Array<Date | null>): void {
    this.searchVo.fromDate = result[0];
    this.searchVo.toDate = result[1];
  }
}
