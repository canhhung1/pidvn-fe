import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PihInventoryService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  getInventoryArea() {
    return this.httpClient.get(
      `${this.baseUrl}/PIH/Inventory/InventoryArea`
    );
  }

  getInventoryRequests(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/PIH/Inventory/Requests`
    );
  }

  getInventoryRequestById(requestId: number) : Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/PIH/Inventory/Request/${requestId}`
    );
  }

  createInventoryRequest(request: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/PIH/Inventory/Request`,
      request
    );
  }


  saveListInventoryData(inventoryDataList: any, requestId: any, inventoryArea: any, goodsType: any) {
    return this.httpClient.post(
      `${this.baseUrl}/PIH/Inventory/SaveListInventoryData?requestId=${requestId}&inventoryArea=${inventoryArea}&goodsType=${goodsType}`,
      inventoryDataList
    );
  }

  saveInventoryData(inventoryData: any) {
    return this.httpClient.post(
      `${this.baseUrl}/PIH/Inventory/InventoryData`,
      inventoryData
    );
  }


  getInventoryData(requestId: any) {
    return this.httpClient.get(
      `${this.baseUrl}/PIH/Inventory/InventoryData?requestId=${requestId}`
    );
  }


  scanLabel(lotNo: any) {
    return this.httpClient.get(
      `${this.baseUrl}/PIH/Inventory/ScanLabel?lotNo=${lotNo}`
    );
  }


  balance(requestId: any, inventoryArea: any) {
    return this.httpClient.get(
      `${this.baseUrl}/PIH/Inventory/Balance?requestId=${requestId}&inventoryArea=${inventoryArea}`
    );
  }


  /**
   * 
   * 
   */


  getRawMaterialInventoryData(requestId: any) {
    return this.httpClient.get(
      `${this.baseUrl}/PIH/Inventory/RawMaterialInventoryData?requestId=${requestId}`
    );
  }

  public downloadTemplateUploadRawMaterialInventory(): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/PIH/Inventory/DownloadTemplateUploadRawMaterialInventory`,
      {},
      { responseType: 'blob' }
    );
  }
}
