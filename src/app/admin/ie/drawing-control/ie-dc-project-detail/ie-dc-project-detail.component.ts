import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ie-dc-project-detail',
  templateUrl: './ie-dc-project-detail.component.html',
  styleUrls: ['./ie-dc-project-detail.component.scss'],
})
export class IeDcProjectDetailComponent implements OnInit {

  ngOnInit() {
    // Mở tất cả các hàng khi khởi tạo
    this.expandedRowKeys = this.items.map(item => item.id);
  }

  items = [
    {
      id: 1,
      item: 'Disscusing',
      content: 'Thảo luận về giá',
      startPlan: '2024-03-25',
      endPlan: '2024-03-26',
      startAction: '2024-03-25',
      endAction: '2024-03-27',
      progress: 100,
    },
    {
      id: 2,
      item: 'Design',
      content: 'Thiết kế và review',
      startPlan: '2024-03-25',
      endPlan: '2024-03-26',
      startAction: '2024-03-25',
      endAction: '',
      progress: 85,
    },
    {
      id: 3,
      item: 'Drawing',
      content: 'Xuất bản vẽ',
      startPlan: '2024-03-25',
      endPlan: '2024-03-26',
      startAction: '2024-03-25',
      endAction: '',
      progress: 85,
    },
    {
      id: 4,
      item: 'PO',
      content: 'Xin báo giá',
      startPlan: '2024-03-25',
      endPlan: '2024-03-26',
      startAction: '2024-03-25',
      endAction: '',
      progress: 90,
    },
    {
      id: 5,
      item: 'Processing',
      content: 'Gia công',
      startPlan: '2024-03-25',
      endPlan: '2024-03-26',
      startAction: '2024-03-25',
      endAction: '',
      progress: 0,
    },
    {
      id: 6,
      item: 'Setup',
      content: 'Setup',
      startPlan: '2024-03-25',
      endPlan: '2024-03-26',
      startAction: '2024-03-25',
      endAction: '',
      progress: 0,
    },
  ];

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
      note: 'So sánh giá các bên'
    },
  ];




  files = [
    {
      id: 1,
      name: 'TD-17000-0000',
      parentId: null,
      rootPath: 'D:\\Project',
      path:'RE-T0001',
      fileName: null,
      type: 'folder'
    },
    {
      id: 2,
      name: 'TD-17005-0000',
      parentId: 1,
      rootPath: 'D:\\Project',
      path:'RE-T0001\\TD-17000-0000',
      fileName: null,
      type: 'folder'
    },
    {
      id: 3,
      name: 'TD-17005-0100',
      parentId: 2,
      rootPath: 'D:\\Project',
      path:'RE-T0001\\TD-17000-0000\\TD-17005-0100',
      fileName: null,
      type: 'folder'
    },
    {
      id: 4,
      name: 'TD-17005-0101',
      parentId: 3,
      rootPath: 'D:\\Project',
      path:'RE-T0001\\TD-17000-0000\\TD-17005-0100',
      fileName: 'TD-17005-0101.pdf',
      type: 'file'
    },
    {
      id: 5,
      name: 'TD-17005-0102',
      parentId: 3,
      rootPath: 'D:\\Project',
      path:'RE-T0001\\TD-17000-0000\\TD-17005-0100',
      fileName: 'TD-17005-0102.pdf',
      type: 'file'
    },
    {
      id: 6,
      name: 'TD-17005-0103',
      parentId: 3,
      rootPath: 'D:\\Project',
      path:'RE-T0001\\TD-17000-0000\\TD-17005-0100',
      fileName: 'TD-17005-0103.pdf',
      type: 'file'
    },
    {
      id: 7,
      name: 'TD-17005-0104',
      parentId: 3,
      rootPath: 'D:\\Project',
      path:'RE-T0001\\TD-17000-0000\\TD-17005-0100',
      fileName: 'TD-17005-0104.pdf',
      type: 'file'
    },
    {
      id: 8,
      name: 'TD-17005-0105',
      parentId: 3,
      rootPath: 'D:\\Project',
      path:'RE-T0001\\TD-17000-0000\\TD-17005-0100',
      fileName: 'TD-17005-0105.pdf',
      type: 'file'
    },
    {
      id: 9,
      name: 'TD-17005-0106',
      parentId: 3,
      rootPath: 'D:\\Project',
      path:'RE-T0001\\TD-17000-0000\\TD-17005-0100',
      fileName: 'TD-17005-0106.pdf',
      type: 'file'
    }
  ]


  isOpenProgressModal: boolean = false
  progressSelected: any;


  expandedRowKeys: number[] = []

  onRowClick(event: any) {
    console.log('onRowClick: ', event.data);
    
    this.progressSelected = event.data
    this.isOpenProgressModal = true

    
  }

  onExpandedRowKeysChanged(e: any) {
    this.expandedRowKeys = e.value;
  }


  isOpenActivityModal: boolean = false;
  







  onSaveClick(data: any) {
    // Xử lý lưu dữ liệu
    alert('Save button clicked');
    // Thêm logic để lưu dữ liệu tại đây
  }

  onCancelClick() {
    // Xử lý hủy bỏ
    alert('Cancel button clicked');
    // Thêm logic để hủy bỏ tại đây
  }


employees = [
  {
    ID: 1,
    Head_ID: -1,
    Full_Name: 'John Heart',
    Prefix: 'Mr.',
    Title: 'CEO',
    City: 'Los Angeles',
    State: 'California',
    Email: 'jheart@dx-email.com',
    Skype: 'jheart_DX_skype',
    Mobile_Phone: '(213) 555-9392',
    Birth_Date: '1964-03-16',
    Hire_Date: '1995-01-15',
  }, {
    ID: 2,
    Head_ID: 1,
    Full_Name: 'Samantha Bright',
    Prefix: 'Dr.',
    Title: 'COO',
    City: 'Los Angeles',
    State: 'California',
    Email: 'samanthab@dx-email.com',
    Skype: 'samanthab_DX_skype',
    Mobile_Phone: '(213) 555-2858',
    Birth_Date: '1966-05-02',
    Hire_Date: '2004-05-24',
  }, {
    ID: 3,
    Head_ID: 1,
    Full_Name: 'Arthur Miller',
    Prefix: 'Mr.',
    Title: 'CTO',
    City: 'Denver',
    State: 'Colorado',
    Email: 'arthurm@dx-email.com',
    Skype: 'arthurm_DX_skype',
    Mobile_Phone: '(310) 555-8583',
    Birth_Date: '1972-07-11',
    Hire_Date: '2007-12-18',
  }, {
    ID: 4,
    Head_ID: 1,
    Full_Name: 'Robert Reagan',
    Prefix: 'Mr.',
    Title: 'CMO',
    City: 'Bentonville',
    State: 'Arkansas',
    Email: 'robertr@dx-email.com',
    Skype: 'robertr_DX_skype',
    Mobile_Phone: '(818) 555-2387',
    Birth_Date: '1974-09-07',
    Hire_Date: '2002-11-08',
  }, {
    ID: 5,
    Head_ID: 1,
    Full_Name: 'Greta Sims',
    Prefix: 'Ms.',
    Title: 'HR Manager',
    City: 'Atlanta',
    State: 'Georgia',
    Email: 'gretas@dx-email.com',
    Skype: 'gretas_DX_skype',
    Mobile_Phone: '(818) 555-6546',
    Birth_Date: '1977-11-22',
    Hire_Date: '1998-04-23',
  }, {
    ID: 6,
    Head_ID: 3,
    Full_Name: 'Brett Wade',
    Prefix: 'Mr.',
    Title: 'IT Manager',
    City: 'Reno',
    State: 'Nevada',
    Email: 'brettw@dx-email.com',
    Skype: 'brettw_DX_skype',
    Mobile_Phone: '(626) 555-0358',
    Birth_Date: '1968-12-01',
    Hire_Date: '2009-03-06',
  }, {
    ID: 7,
    Head_ID: 5,
    Full_Name: 'Sandra Johnson',
    Prefix: 'Mrs.',
    Title: 'Controller',
    City: 'Beaver',
    State: 'Utah',
    Email: 'sandraj@dx-email.com',
    Skype: 'sandraj_DX_skype',
    Mobile_Phone: '(562) 555-2082',
    Birth_Date: '1974-11-15',
    Hire_Date: '2005-05-11',
  }, {
    ID: 8,
    Head_ID: 4,
    Full_Name: 'Ed Holmes',
    Prefix: 'Dr.',
    Title: 'Sales Manager',
    City: 'Malibu',
    State: 'California',
    Email: 'edwardh@dx-email.com',
    Skype: 'edwardh_DX_skype',
    Mobile_Phone: '(310) 555-1288',
    Birth_Date: '1973-07-14',
    Hire_Date: '2005-06-19',
  }]
}
