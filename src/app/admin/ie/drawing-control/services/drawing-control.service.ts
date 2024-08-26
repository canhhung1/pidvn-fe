import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DrawingControlService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getUsers(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IE/DrawingControl/Users`);
  }

  public getProjects(): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/IE/DrawingControl/Projects`,
      {}
    );
  }

  public getProject(projectId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IE/DrawingControl/Project/${projectId}`
    );
  }

  public getProjectTypes(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IE/DrawingControl/ProjectTypes`
    );
  }

  public createProject(projectDto: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/IE/DrawingControl/Project`,
      projectDto
    );
  }

  public getProcesses(projectId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IE/DrawingControl/Processes?projectId=${projectId}`
    );
  }

  uploadDrawingStructure(file: File, projectId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(
      `${this.baseUrl}/IE/DrawingControl/UploadDrawingStructure?projectId=${projectId}`,
      formData
    );
  }

  public getDrawingStructure(projectId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IE/DrawingControl/DrawingStructure?projectId=${projectId}`
    );
  }


  uploadDrawingFile(files: File[], projectId: number): Observable<any> {
    const formData = new FormData();
    
    // Append each file individually
    files.forEach(file => {
      formData.append('files', file);
    });
  
    return this.httpClient.post(
      `${this.baseUrl}/IE/DrawingControl/DrawingFiles?projectId=${projectId}`,
      formData
    );
  }


  
  /**
   * Xem file Drawing
   * @param file
   * @returns
   */
  public previewDrawingFile(params: any, controlNo: string) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/IE/DrawingControl/DrawingPreview?controlNo=${controlNo}`,
      params,
      {
        responseType: 'arraybuffer' as 'json',
      }
    );
  }
  


}
