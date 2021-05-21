import { Component, OnInit } from '@angular/core';
import { IEmployeeDataModel, DistinctData } from './employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
employeeData: IEmployeeDataModel[] = {} as IEmployeeDataModel[];
experiencedEmployees: IEmployeeDataModel[] = {} as IEmployeeDataModel[];
distinctDept = [];
toSearch: string;

  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.getEmployeeData();
  }

  getEmployeeData(): void {
    this.employeeData = this.employeeService.getEmployeeDetails();
    if (this.employeeData && this.employeeData.length) {
     this.getExperiencedEmployee();
     this.getDistinctDepartments();
    }
  }

  sortNameColumn(order: string): void {
    if (order === 'asc') {
      this.employeeData.sort( (a, b) => a.name.localeCompare(b.name));
    } else {
      this.employeeData.sort( (a, b) => b.name.localeCompare(a.name));
    }
  }

  sortDateColumn(order: string): IEmployeeDataModel[] {
    if (order === 'asc') {
      return this.employeeData.sort((a, b) => {
       return new Date(a.joiningDate).getTime() - new Date(new Date(b.joiningDate)).getTime();
    });
  } else {
    return this.employeeData.sort((a, b) => {
      return new Date(b.joiningDate).getTime() - new Date(new Date(a.joiningDate)).getTime();
   });
  }
  }

  removeDept(): void {
    this.employeeData = this.employeeData.filter((e) => {
      return e.department !== 'Development';
    });
  }

  getExperiencedEmployee(): void {
    this.experiencedEmployees = this.employeeData.filter((e) => {
      const Days = Math.floor((new Date().getTime() - new Date(e.joiningDate).getTime()) / (1000 * 3600 * 24));
      return Days > 730;
    });
  }

  getDistinctDepartments() {
    const distinctData = this.employeeData.reduce((acc, cur) => {
      acc[cur.department] = (acc[cur.department] || 0) + 1;
      return acc;
    }, {});

    const keys = Object.keys(distinctData);
    const values = Object.values(distinctData);
    keys.forEach( (k, idx) => {
      this.distinctDept.push({department: k, count: values[idx]});
    });
  }
}
