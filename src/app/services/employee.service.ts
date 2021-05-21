import { Injectable } from '@angular/core';
import { IEmployeeDataModel } from '../employee/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor() { }


  getEmployeeDetails(): IEmployeeDataModel[] {
    const candidateData: IEmployeeDataModel[] = [
     { id: 11,
      name: 'Ash',
      department: 'Finance',
      joiningDate: '08/10/2016'
    },
    { id: 12, name: 'John', department: 'HR', joiningDate: '01/18/2011'},
    { id: 13, name: 'Zuri', department: 'Operations', joiningDate: '11/28/2019'},
    { id: 14, name: 'Vish', department: 'Development',   joiningDate: '07/07/2017'},
    { id: 15, name: 'Barry', department: 'Operations', joiningDate: '08/19/2014'},
    { id: 16, name: 'Ady',  department: 'Finance',  joiningDate: '10/05/2014'},
    { id: 17, name: 'Gare', department: 'Development',  joiningDate: '04/06/2014'},
    { id: 18, name: 'Hola', department: 'Development',  joiningDate: '12/08/2010'},
    { id: 19, name: 'Ola',  department: 'Development',  joiningDate: '05/07/2011'},
    { id: 20, name: 'Kim',  department: 'Finance',  joiningDate: '10/20/2010'}
  ];
    return candidateData;
  }
}
