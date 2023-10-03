import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PihInventoryService } from '../services/pih-inventory.service';
@Component({
  selector: 'app-pih-inv-req-detail',
  templateUrl: './pih-inv-req-detail.component.html',
  styleUrls: ['./pih-inv-req-detail.component.scss']
})
export class PihInvReqDetailComponent implements OnInit, AfterViewInit{

  @ViewChild('labelIpt') labelIpt!: ElementRef;
  @ViewChild('importQtyIpt') importQtyIpt!: ElementRef;

  constructor(
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private pihInventorySvc: PihInventoryService
  ) {}

  requestId: any;
  requestNo: any
  inventoryData: any
  isOpenScanInventoryModal: boolean = false;
  isOpenResultSaveInventoryModal: boolean = false;
  mapLotsScanned: Map<string, any> = new Map();
  listLotsScanned: Array<any> = new Array();
  lotNoEdit: string | null = null;
  inventoryDataOK: any;

  isLoadingSaveInventoryData: boolean = false;

  resultSaveInventoryData: any;


  inventoryDataPivot: any;


  ngOnInit(): void {
    this.requestId = Number(this.activatedRoute.snapshot.params['id'])
    this.requestNo = this.activatedRoute.snapshot.queryParamMap.get('reqNo');

    console.log(this.requestNo)

    this.getInventoryData(this.requestId);
  }

  ngAfterViewInit(): void {
    
  }

  getInventoryData(requestId: any) {
    this.pihInventorySvc.getInventoryData(requestId).subscribe(
      response => {
        this.inventoryData = response;

        this.inventoryDataPivot = {
          fields: [
            {
              caption: 'Classified',
              dataField: 'classified',
              area: 'row',
              expanded: true,
            },
            {
              caption: 'Part Number',
              dataField: 'partNo',
              area: 'row',
              width: 150,
              expanded: true,
            },
            {
              caption: 'Lot No',
              dataField: 'lotNo',
              area: 'row',
              width: 250,
              expanded: true,
            },
            {
              caption: 'Qty',
              dataField: 'qty',
              dataType: 'number',
              area: 'data',
              summaryType: 'sum',
              format: {
                type: 'fixedPoint',
                precision: 2,
              },
            }
          ],
          store: response,
        };





      }
    )
  }

  onExportClient($event: any) {

  }

  openScanInventoryModal() {

    /**
     * Kiểm tra phiếu đã quá thời gian kiểm kê chưa
     * Đang để lớn hơn 5 ngày sẽ không cho kiểm kê
     */
    let reqDateStr = this.requestNo.split("-")[1];
    let pattern = /(\d{4})(\d{2})(\d{2})/;
    let reqDate = new Date(reqDateStr.replace(pattern,'$1-$2-$3'));
    let curDate = new Date();
    const diffTime = Math.abs(reqDate.getTime() - curDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if(diffDays > 15) {
      this.toastr.warning('Đã quá thời gian kiểm kê','Warning')
      return;
    }

    this.isOpenScanInventoryModal = true;

    setTimeout(() => {
      this.labelIpt.nativeElement.focus()
    }, 500)

  }

  /**
   * Lưu list danh sách Lot đã scan
   * @returns 
   */
  saveListInventoryData() {

    if(this.listLotsScanned.length <= 0) {
      this.toastr.warning("Cần scan tem QR code","Warning")
      return;
    }


    this.isLoadingSaveInventoryData = true;
    this.pihInventorySvc.saveListInventoryData(this.listLotsScanned).subscribe(
      response => {
        this.toastr.success("Đã lưu","Response")
        this.resultSaveInventoryData = response;
        this.isOpenScanInventoryModal = false;
        this.isLoadingSaveInventoryData = false;
        this.isOpenResultSaveInventoryModal = true;
        this.mapLotsScanned = new Map();
        this.listLotsScanned = new Array();

        this.getInventoryData(this.requestId);

      }
    )
  }

  scanLabel(event: any) {

    this.labelIpt.nativeElement.select();

    let data = event.target.value.split(';')

    let partNo = "";
    let qty = 0;
    let lotNo = "";

    if(event.target.value.includes(';')) {
      partNo = data[0];
      qty = data[2];
      lotNo = data[3]

      let obj = {
        lotNo: lotNo.toUpperCase() ,
        partNo: partNo.toUpperCase(),
        qty: qty,
        requestId: this.requestId
      }
      
      this.mapLotsScanned.set(lotNo, obj);
  
      this.listLotsScanned = Array.from(
        this.mapLotsScanned.values()
      ).reverse();

      return;
    }else {

      lotNo = event.target.value.substring(1);

      this.pihInventorySvc.scanLabel(lotNo).subscribe(
        response => {
          
          let data = Object.assign(response)

          let obj = {
            lotNo: lotNo,
            partNo: data.model,
            qty: data.qty,
            requestId: this.requestId
          }
          
          this.mapLotsScanned.set(lotNo, obj);
      
          this.listLotsScanned = Array.from(
            this.mapLotsScanned.values()
          ).reverse();

          return
        }
      )
    }
  }


  startEdit(data: any) {
    setTimeout(() => {
      this.importQtyIpt.nativeElement.select();
    }, 400);
    this.lotNoEdit = data.lotNo;
  }

  stopEdit(): void {
    this.lotNoEdit = null;
    this.importQtyIpt.nativeElement.select();
  }

  deleteLabelScanned(data: any) {
    this.mapLotsScanned.delete(data.lotNo);
    this.listLotsScanned = Array.from(this.mapLotsScanned.values()).reverse();
  }

  closeScanInventoryModal() {
    this.isOpenScanInventoryModal = false;
  }


  isOpenEditQtyModal: boolean = false
  lotSelected: any;
  openEditQtyModal(item: any) {

    this.lotSelected = item.data

    this.isOpenEditQtyModal = true
  }

  saveEditQty() {
    this.isOpenEditQtyModal = false
    this.pihInventorySvc.saveInventoryData(this.lotSelected).subscribe(
      response => {
        this.getInventoryData(this.requestId);
      }
    )



  }


  balanceData: any
  getBalance() {

    this.pihInventorySvc.balance(this.requestId).subscribe(
      response => {
        console.log('Balance: ', response)
        this.balanceData = response
      }
    )



  }

}
