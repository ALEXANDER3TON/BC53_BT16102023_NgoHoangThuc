const getEle = (selector) => {
  return document.querySelector(selector);
};
let listPerson = new ListPerson();
const LIST_PERSON = 'LIST_PERSON'
let data = JSON.parse(localStorage.getItem(LIST_PERSON))

//Render chung
const renderList = (list) => {
  let htmlContent = "";
  list.forEach((element, index) => {
    htmlContent += `
      <tr>
        <td>${element.type}</td>
        <td>${element.ten}</td>
        <td>${element.address}</td>
        <td>${element.email}</td>
        <td>${element.id}</td>
        <td>
          <button class="btn btn-success" onclick="edit(${
            element.id
          })" data-bs-toggle="modal"
          data-bs-target="#fillInfoModal">Sửa</button>
          <button class="btn btn-danger">Xóa</button>
          <button class="btn btn-warning">Chi tiết</button>
        </td>
      </tr>
    `;
  });
  getEle("#tbodyPerson").innerHTML = htmlContent;
};


if(data !== null) {
  renderList(data);
}
getEle("#type").addEventListener("change", function () {
  renderInput(this.value);
});

const renderInput = (value) => {
  if (value === "Học sinh") {
    getEle(".studentInfo").style.display = "block";
    getEle(".employeeInfo").style.display = "none";
    getEle(".customerInfo").style.display = "none";
  } else if (value === "Nhân viên") {
    getEle(".studentInfo").style.display = "none";
    getEle(".employeeInfo").style.display = "block";
    getEle(".customerInfo").style.display = "none";
  } else if (value === "Khách hàng") {
    getEle(".studentInfo").style.display = "none";
    getEle(".employeeInfo").style.display = "none";
    getEle(".customerInfo").style.display = "block";
  } else {
    getEle(".studentInfo").style.display = "none";
    getEle(".employeeInfo").style.display = "none";
    getEle(".customerInfo").style.display = "none";
  }
};
const resetForm = () => {
  getEle("#type").value = "";
  getEle("#ten").value = '';
  getEle("#address").value = '';
  getEle("#email").value = '';
  getEle("#id").value = '';
  getEle("#id").disabled = false;
  getEle("#toan").value = '';
  getEle("#ly").value = '';
  getEle("#hoa").value = '';
  getEle("#workDays").value = '';
  getEle("#salaryDay").value = '';
  getEle("#companyName").value = '';
  getEle("#price").value = '';
  getEle("#feedback").value = '';
}
const takeInfo = () => {
  const element = document.querySelectorAll(
    "#personForm input, #personForm select"
  );
  let doiTuong = {};
  element.forEach((ele, index) => {
    const { value, name } = ele;
    doiTuong[name] = value;
  });

  if (doiTuong.type === "Học sinh") {
    const { type, ten, address, email, id, toan, ly, hoa } = doiTuong;
    const student = new Student(type, ten, address, email, id, toan, ly, hoa);
    listPerson.add(student);
    return student;
  } else if (type === "Nhân viên") {
    const { type, ten, address, email, id, workDays, salaryDay } = doiTuong;
    const employee = new Employee(
      type,
      ten,
      address,
      email,
      id,
      workDays,
      salaryDay
    );
    listPerson.add(employee);
    return employee;
  } else if (type === "Khách hàng") {
    const { type, ten, address, email, id, companyName, price, feedback } =
      doiTuong;
    const customer = new Customer(
      type,
      ten,
      address,
      email,
      id,
      companyName,
      price,
      feedback
    );
    listPerson.add(customer);
    return customer;
  } else {
    const { type, ten, address, email, id } = doiTuong;
    const person = new Person(type, ten, address, email, id);
    listPerson.add(person);
    return person;
  }
};

window.add = () => {
  const person = takeInfo();
  localStorage.setItem(LIST_PERSON, JSON.stringify(listPerson.getAll()))
  renderList(data);
  resetForm()
};

const findPerson = (list, id) => {
  let item;
  list.forEach((element) => {
    if(Number(element.id) === Number(id)) {
      item = element;
    }
  });
  return item;
}

window.edit = (id) => {
  const data = JSON.parse(localStorage.getItem(LIST_PERSON))
  const person = findPerson(data, id)
  renderInput(person.type)
  getEle("#type").value = person.type;
  getEle("#ten").value = person.ten;
  getEle("#address").value = person.address;
  getEle("#email").value = person.email;
  getEle("#id").value = person.id;
  getEle("#id").disabled = true;
  getEle("#toan").value = person.toan;
  getEle("#ly").value = person.ly;
  getEle("#hoa").value = person.hoa;
  getEle("#workDays").value = person.workDays;
  getEle("#salaryDay").value = person.salaryDay;
  getEle("#companyName").value = person.companyName;
  getEle("#price").value = person.price;
  getEle("#feedback").value = person.feedback;
};


const update = (person) => {
  const data = JSON.parse(localStorage.getItem(LIST_PERSON));
  const index = data.findIndex((element) => {
    return element.id == person.id;
  })
  data[index] = person;
  localStorage.setItem(LIST_PERSON, JSON.stringify(data));
}
window.updatePerson = () => {
  const person = takeInfo();
  update(person);
  renderList(listPerson.getAll());
  resetForm()
}
