import {Component, OnInit} from '@angular/core';
import {ExamCount, GradeCount} from "@core/models";
import {DataService} from "@core/http";
import {FormControl, FormGroup} from "@angular/forms";
import {UtilsService} from "@ng/services";

@Component({
  selector: 'ng-exam',
  templateUrl: './exam.page.html',
  styleUrls: ['./exam.page.scss']
})
export class ExamPage implements OnInit {
  form = new FormGroup({
    province_id: new FormControl(),
    major: new FormControl(),
    school_type: new FormControl(),
    school_id: new FormControl(),
    gender_id: new FormControl(),
    grade: new FormControl(),
    stage: new FormControl(),
    field: new FormControl(),
  });
  count: ExamCount = {};
  filterEnabled: boolean = false;
  genders = this.dataService.genders;

  constructor(private dataService: DataService, private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  async loadData() {
    this.count = await this.dataService.getExamCount()
  }

  async clearFilter() {
    this.count = await this.dataService.getExamCount();
    this.form.reset();
    this.filterEnabled = false;
  }

  bothDatesValidator(group: FormGroup) {
    const start_time = group.get('start_time').value;
    const end_time = group.get('end_time').value;
    const bothFilled = !!start_time && !!end_time;
    const bothEmpty = !start_time && !end_time;
    return (bothFilled || bothEmpty) ? null : {invalidDate: true};
  }

  async onSubmitFilter() {
    const filters = this.utilsService.getDirtyControls(this.form);
    if (!filters) {
      return;
    }
    this.count = await this.dataService.getExamCount(filters)
    this.filterEnabled = true;
  }
}
