import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { VrEncPRService } from '../services/vr-enc-p-r.service';

@Component({
  selector: 'app-vr-enc-p-r-qacard',
  templateUrl: './vr-enc-p-r-qacard.component.html',
  styleUrls: ['./vr-enc-p-r-qacard.component.scss'],
})
export class VrEncPRQacardComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private vrEncPRSvc: VrEncPRService,
    private jwtHelperSvc: JwtHelperService,
  ) {}

  searchVo = {
    line: null,
    date: new Date(),
    shift: null,
    model: null,
  }

  qaCard = {
    id: null,
    date: new Date(),
    line: null,
    lineCode: null,
    model: null,
    shift:null,
    shiftCode: null,
    remark: null,
    userCode: null,
    customers: []
  };

  lines: any;
  shifts: any;
  qaCards: any;
  models: any;
  customers: any;
  date = null;

  isOpenModalLoading: boolean = false;
  isOpenQAModal: boolean = false;
  isOpenPrintQAModal: boolean = false;

  errorMsg!: string;

  qaCardSelected: any;

  ngOnInit(): void {
    this.getShifts();
    this.getLines(2);
    this.getModels();
    this.getCustomers();
  }

  getLines(productId: number) {
    this.vrEncPRSvc.getLines(productId).subscribe((response) => {
      this.lines = response;
      console.log('Lines: ', this.lines);
    });
  }

  getShifts() {
    this.vrEncPRSvc.getShifts().subscribe(
      response => {
        this.shifts = response;
      }
    )
  }

  getCustomers() {
    this.vrEncPRSvc.getCustomers().subscribe(
      response => {
        this.customers = response
      }
    )
  }

  getModels() {
    this.vrEncPRSvc.getModels().subscribe(
      response => {
        this.models = response
      }
    )
  }

  onSearch() {

    if (!this.searchVo.line || !this.searchVo.date) {
      this.toastr.warning('Cần chọn Line và Date','Warning')
      return;
    }

    this.vrEncPRSvc.getQaCards(this.searchVo).subscribe(
      response => {
        this.qaCards = response
      }
    )
  }

  downloadQaCard(event: any) {
    console.log('EVENT: ', event);
    
    this.isOpenModalLoading = true;

    let searchVo = {
      qaCard: event.data.lotNo
    }

    let fileName = event.data.lotNo.replace('*','_')

    this.vrEncPRSvc.downloadQaCard(searchVo).subscribe((response) => {

      this.isOpenModalLoading = false;
      
      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = `${fileName}.xls`;
      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );

      setTimeout(() => {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    });
  }

  isEditMode: boolean = true;
  openQACardModal(item: any) {


    if (!item) {
      this.isEditMode = false;
      // Trường hợp thêm mới 

      this.qaCard = {
        id: null,
        date: new Date(),
        line: null,
        lineCode: null,
        model: null,
        shift:null,
        shiftCode: null,
        remark: null,
        userCode: null,
        customers: []
      };

    }else {
      this.isEditMode = true;
      // Trường hợp update

      let obj = {...this.qaCard, ...item.data, ...{customers: item.data.customerCode.split(';')}}
      this.qaCard = obj

    }

    console.log('QA card: ', this.qaCard);
    

    this.isOpenQAModal = true;


  }

  
  createQACard() {

    let username = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    this.qaCard.userCode = username

    console.log('QA Card: ', this.qaCard);
    

    this.vrEncPRSvc.createQaCard(this.qaCard).subscribe(
      response => {
        if (response.result == 'ERROR') {
          this.errorMsg = response.message
        } else if (response.result == 'OK') {
          this.isOpenQAModal = false
          // EVQV5502715B*GMT-3*2022-11-24*A10*001 
          this.searchVo.line = this.qaCard.lineCode;
          this.searchVo.date = this.qaCard.date;
          this.searchVo.model = this.qaCard.model

          this.vrEncPRSvc.getQaCards(this.searchVo).subscribe(
            response => {
              this.qaCards = response
            }
          )
        }
      }
    )
    
  }

  cancelQACard() {
    this.resetComponent();
    this.isOpenQAModal = false
  }

  resetComponent() {
    this.searchVo.date = new Date();
    this.searchVo.line = null;
    this.searchVo.model = null;
    this.searchVo.shift = null;

    this.qaCard.date = new Date();
    this.qaCard.line = null;
    this.qaCard.model = null;
    this.qaCard.remark = null;
    this.qaCard.shift = null;
    this.qaCard.userCode = null;
  }


  openPrintQaCardModal(item: any) {
    console.log('item: ', item.data)
    this.qaCardSelected = item.data
    this.isOpenPrintQAModal = true
  }

  printQRCard() {
    
  }

  onCustomerClicked(item: any) {
    this.qaCardSelected = item.data
    this.isOpenQAModal = true

  }

}
