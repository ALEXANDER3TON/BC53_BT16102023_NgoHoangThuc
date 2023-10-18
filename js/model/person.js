class Person {
  constructor(type, ten, address, email, id) {
    this.type = type;
    this.ten = ten;
    this.address = address;
    this.email = email;
    this.id = id;
  }

  mapType() {
    if(this.type === 'hs'){
      return "Học sinh";
    } else if(this.type === 'nv') {
      return "Nhân viên"
    } else {
      return "Khách Hàng";
    }
  }
}

class Student extends Person {
  constructor(type, ten, address, email, id, toan, ly, hoa) {
    super(type, ten, address, email, id);
    this.toan = toan;
    this.ly = ly;
    this.hoa = hoa;
  }

  avg() {
    return (this.toan + this.ly + this.hoa) / 3;
  }
}

class Employee extends Person {
  constructor(type, ten, address, email, id, workDays, salaryDay) {
    super(type, ten, address, email, id);
    this.workDays = workDays;
    this.salaryDay = salaryDay;
  }

  totalSalary() {
    return this.workDays * this.salaryDay;
  }
}

class Customer extends Person {
  constructor(type, ten, address, email, id, companyName, price, feedback) {
    super(type, ten, address, email, id);
    this.companyName = companyName;
    this.price = price;
    this.feedback = feedback;
  }
}

class ListPerson {
  constructor() {
    this.list = [];
  }

  add(person) {
    this.list.push(person);
  }

  get(index) {
    return this.list[index];
  }
  getAll() {
    return this.list;
  }
}
