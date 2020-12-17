import { Component, OnInit } from '@angular/core';

import { StudentsService } from './students.service';
import {IStudent} from './student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  errorMessage = '';

  _listFilter = null;
  get listFilter(): number {
    return this._listFilter;
  }
  set listFilter(value: number) {
    this._listFilter = value;
    this.filteredStudents = this.listFilter ? this.performFilter(this.listFilter) : this.students;
  }

  students: IStudent[] = [];
  filteredStudents:IStudent[] = [];



  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    this.studentsService.getStudents().subscribe({
      next: students => {
        this.students = students;
        this.filteredStudents =this.students;
      },
      error: err => this.errorMessage = err
    })
  }

  performFilter(filterBy: number): IStudent[] {
    return this.students.filter((student: IStudent) =>
      student.attendancePercentage <= filterBy )
  }

}
