import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectDto } from '../models/ProjectDto';
import { ProjectProgressDto } from '../models/ProjectProgressDto';
import { DrawingDto } from '../models/DrawingDto';
import { ProjectActivityDto } from '../models/ProjectActivityDto';

@Injectable({
  providedIn: 'root',
})
export class DrawingControlService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getPersonInCharges(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IE/DrawingControl/PersonInCharges`);
  }

  public getProducts(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IE/DrawingControl/Products`);
  }

  public getProjects(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/IE/DrawingControl/Projects`,
      searchVo
    );
  }

  public insertProject(projectDto: ProjectDto): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/IE/DrawingControl/Project`,
      projectDto
    );
  }

  public updateProject(projectDto: ProjectDto): Observable<any> {
    return this.httpClient.put(
      `${this.baseUrl}/IE/DrawingControl/Project`,
      projectDto
    );
  }

  public getProjectTypes(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IE/DrawingControl/ProjectTypes`
    );
  }

  public getProjectById(projectId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IE/DrawingControl/Project/${projectId}`
    );
  }

  public getProjectProgresses(projectId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IE/DrawingControl/ProjectProgresses?projectId=${projectId}`
    );
  }

  public updateProjectProgress(
    projectProgressDto: ProjectProgressDto
  ): Observable<any> {
    return this.httpClient.put(
      `${this.baseUrl}/IE/DrawingControl/ProjectProgress`,
      projectProgressDto
    );
  }

  public getDrawings(projectId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IE/DrawingControl/Drawings?projectId=${projectId}`
    );
  }

  public insertOrUpdateDrawing(drawingDto: DrawingDto): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/IE/DrawingControl/Drawing`,
      drawingDto
    );
  }

  uploadDrawingFile(
    files: File[],
    projectNo: string
  ): Observable<any> {
    const formData = new FormData();
    files.forEach((file: File, index: any) => {
      formData.append(`files`, file, file.name);
    });
    return this.httpClient.post(
      `${this.baseUrl}/IE/DrawingControl/UploadDrawingFile?projectNo=${projectNo}`,
      formData
    );
  }

  uploadProgressFile(
    files: File[],
    projectId: number,
    progressId: number

  ): Observable<any> {
    const formData = new FormData();
    files.forEach((file: File, index: any) => {
      formData.append(`files`, file, file.name);
    });

    // In các cặp key-value của formData
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    return this.httpClient.post(
      `${this.baseUrl}/IE/DrawingControl/UploadProgressFile?projectId=${projectId}&projectProgressId=${progressId}`,
      formData
    );
  }








  uploadDrawingTreeList(file: File, projectId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(
      `${this.baseUrl}/IE/DrawingControl/UploadDrawingTreeList?projectId=${projectId}`,
      formData
    );
  }

  /**
   * Xem file Drawing
   * @param file
   * @returns
   */
  public previewDrawing(params: any) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/IE/DrawingControl/DrawingPreview`,
      params,
      {
        responseType: 'arraybuffer' as 'json',
      }
    );
  }

  insertProjectActivity(file: File, projectActivityDto: ProjectActivityDto): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('projectActivityDto', new Blob([JSON.stringify(projectActivityDto)], { type: 'application/json' }));
    // const headers = new HttpHeaders({
    //   'Accept': 'application/json'
    // });
    return this.httpClient.post(`${this.baseUrl}/IE/DrawingControl/ProjectActivity`, formData);
  }

  getProjectActivities(projectId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IE/DrawingControl/ProjectActivities?projectId=${projectId}`
    );
  }
  



  /**
   * Lấy các file trong progress theo projectId
   * @param projectId 
   * @param progressId 
   * @returns 
   */
  getProgressFiles(projectId: number, progressId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IE/DrawingControl/ProgressFiles?projectId=${projectId}&projectProgressId=${progressId}`
    );
  }


}
