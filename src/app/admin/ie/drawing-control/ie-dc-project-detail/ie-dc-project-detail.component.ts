import { Component, OnInit } from '@angular/core';
import { DrawingControlService } from '../services/drawing-control.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectDto } from '../models/ProjectDto';
import { ToastrService } from 'ngx-toastr';
import { ProjectProgressDto } from '../models/ProjectProgressDto';
import { DrawingDto } from '../models/DrawingDto';

@Component({
  selector: 'app-ie-dc-project-detail',
  templateUrl: './ie-dc-project-detail.component.html',
  styleUrls: ['./ie-dc-project-detail.component.scss'],
})
export class IeDcProjectDetailComponent implements OnInit {

  constructor(
    private drawingControlSvc: DrawingControlService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getProjectById();
    this.getProjectProgresses();
  }

  project: ProjectDto = new ProjectDto();
  progress: ProjectProgressDto = new ProjectProgressDto();
  progresses!: ProjectProgressDto[];

  activities = [
    {
      id: 1,
      createdAt: '2024-06-23',
      content: 'Design Review',
      note: 'Meeting with OTW about comment',
    },
    {
      id: 2,
      createdAt: '2024-06-24',
      content: 'Design Review',
      note: 'Chốt phương án họp với ...',
    },
    {
      id: 3,
      createdAt: '2024-06-25',
      content: 'Investment',
      note: 'So sánh giá các bên',
    },
  ];

  drawings = [];

  isOpenProgressModal: boolean = false;
  isOpenUploadDrawingModal: boolean = false;
  isOpenActivityModal: boolean = false;

  /**
   * Expand các parent child drawing file
   */
  expandedRowKeys: number[] = [];
  onExpandedRowKeysChanged(e: any) {
    this.expandedRowKeys = e.value;
  }

  getProjectById() {
    let projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.drawingControlSvc.getProjectById(projectId).subscribe((response) => {
      this.project = response;
      console.log('project', this.project);
    });
  }

  getProjectProgresses() {
    let projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.drawingControlSvc
      .getProjectProgresses(projectId)
      .subscribe((response) => {
        this.progresses = response;
        console.log('progresses: ', this.progresses);
      });
  }

  updateProject() {
    console.log('ProjectUpdated: ', this.project);

    this.drawingControlSvc.updateProject(this.project).subscribe((response) => {
      this.project = response;
      this.toastr.success('Updated');
    });
  }

  /**
   * Xử lý khi click vào progress
   * @param event
   */
  onClickProgress(event: any) {
    this.progress = event.data;
    let projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    let progressId = Number(this.progress.projectProgressId);
    this.progress.projectId = projectId;

    console.log('Progress: ', this.progress);

    if (progressId == 3) {
      this.drawingControlSvc.getDrawings(projectId).subscribe((response) => {
        console.log('List Drawings: ', response);
        this.drawings = response;

        // Mở tất cả các hàng khi khởi tạo
        this.expandedRowKeys = this.drawings.map((item: any) => item.id);
      });
    }

    this.isOpenProgressModal = true;
  }

  updateProjectProgress() {
    this.drawingControlSvc
      .updateProjectProgress(this.progress)
      .subscribe((response) => {
        console.log('ProjectProgressUpdated: ', response);
        this.toastr.success('Updated');
        this.getProjectProgresses();
      });
  }

  

  onSavingDrawing(e: any) {
    const info = e.changes[0].data;
    console.log('onSavingDrawing: ', info);
  }

  onSavedDrawing(e: any) {
    let projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    let projectProgressId = Number(this.progress.projectProgressId);
    const info = e.changes[0].data;

    let obj: DrawingDto = {
      id: info.id,
      parentId: info.parentId == -1 ? null : info.parentId,
      drawingNo: info.drawingNo,
      drawingName: info.drawingName,
      qty: info.qty,
      unit: info.unit,
      material: info.material,
      polishing: info.polishing,
      hardness: info.hardness,
      projectId: projectId,
      projectProgressId: projectProgressId,
      supplier: info.supplier,
      version: '',
      remark: '',
      createdAt: info.createdAt,
      updatedAt: info.updatedAt,
    };

    console.log('onSavedDrawing: ', obj);

    this.drawingControlSvc.insertOrUpdateDrawing(obj).subscribe((response) => {
      console.log('saveDrawing: ', response);
    });
  }



  onCellClick(event: any) {
    let dataField = event.column.dataField;
    console.log(event.data);
    if (dataField === 'drawingName') {
      let rootURL = `D:\\Workspace\\ProjectManagement\\Project\\${this.project.projectNo}\\Drawing\\${event.data.drawingNo}.pdf`;
      let params = { url: rootURL };

      this.drawingControlSvc.previewDrawing(params).subscribe((response) => {
        let file = new Blob([response], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
    }
  }








  fileUploads: any;

  /**
   * Chọn file để upload lên server
   * @param e 
   */
  onValueChangedFile(e: any) {
    const files = e.value; // Lấy danh sách các tệp đã chọn
    if (files.length > 0) {
      this.fileUploads = files[0];
    }
  }

  drawingSelected: any;
  openUploadDrawingModal(item: any) {
    this.drawingSelected = item.data
    this.isOpenUploadDrawingModal = true;
    this.fileUploads = null;
  }

  uploadDrawing() {

    console.log(this.progress);
    
    this.drawingControlSvc.uploadDrawing(this.fileUploads,this.project.projectNo, this.drawingSelected.drawingName).subscribe(
      response => {
        this.isOpenUploadDrawingModal = false;
      }
    )

  }



  isOpenUploadDrawingTreeModal: boolean = false
  openUploadDrawingTreeModal() {
    this.fileUploads = null;
    this.isOpenUploadDrawingTreeModal = true;
  }
  uploadDrawingTreeList() {

    console.log('fileUploads: ' ,this.fileUploads);
    

    this.drawingControlSvc.uploadDrawingTreeList(this.fileUploads, this.project.id).subscribe(
      response => {
        this.isOpenUploadDrawingTreeModal = false;
      }
    )


  }




}
