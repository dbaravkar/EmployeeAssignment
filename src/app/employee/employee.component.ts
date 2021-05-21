import { Component, OnInit } from '@angular/core';
import { IEmployeeDataModel } from './employee.model';
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

  sortNameColumn(orderby: string): void {
    if (orderby === 'asc') {
      this.employeeData.sort( (a: IEmployeeDataModel, b: IEmployeeDataModel) => {
        return a.name.localeCompare(b.name);
      });
    } else {
      this.employeeData.sort( (a: IEmployeeDataModel, b: IEmployeeDataModel) => {
        return b.name.localeCompare(a.name);
      });
    }
  }

  sortDateColumn(orderby: string): IEmployeeDataModel[] {
    if (orderby === 'asc') {
      return this.employeeData.sort((a: IEmployeeDataModel, b: IEmployeeDataModel) => {
       return new Date(a.joiningDate).getTime() - new Date(new Date(b.joiningDate)).getTime();
    });
  } else {
    return this.employeeData.sort((a: IEmployeeDataModel, b: IEmployeeDataModel) => {
      return new Date(b.joiningDate).getTime() - new Date(new Date(a.joiningDate)).getTime();
   });
  }
  }

  removeDept(): void {
    this.employeeData = this.employeeData.filter((e: IEmployeeDataModel) => {
      return e.department !== 'Development';
    });
  }

  getExperiencedEmployee(): void {
    this.experiencedEmployees = this.employeeData.filter((e: IEmployeeDataModel) => {
      const Days = Math.floor((new Date().getTime() - new Date(e.joiningDate).getTime()) / (1000 * 3600 * 24));
      return Days > 730;
    });
  }

  getDistinctDepartments() {
    const distinctData = this.employeeData.reduce((acc: {}, cur: IEmployeeDataModel) => {
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
