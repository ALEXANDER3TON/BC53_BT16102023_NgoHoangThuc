const getEle = (selector) => {
  return document.querySelector(selector);
};
let listPerson = new ListPerson();

//Render chung
const renderList = (list) => {
  console.log(list);
  let htmlContent = "";
  list.forEach((element, index) => {
    htmlContent += `
      <tr>
        <td>${element.mapType()}</td>
        <td>${element.ten}</td>
        <td>${element.address}</td>
        <td>${element.email}</td>
        <td>${element.id}</td>
        <td>
          <button class="btn btn-success">Sửa</button>
          <button class="btn btn-danger">Xóa</button>
          <button class="btn btn-warning">Chi tiết</button>
        </td>
      </tr>
    `;
  });
  getEle("#tbodyPerson").innerHTML = htmlContent;
};

getEle("#type").addEventListener('change', function () {
  console.log(this.value)
  renderInput(this.value)
})

const renderInput = (value) => {
  if(value === 'hs') {
    getEle('.studentInfo').style.display = "block";
    getEle('.employeeInfo').style.display = "none";
    getEle('.customerInfo').style.display = "none";
  } else if(value === 'nv') {
    getEle('.studentInfo').style.display = "none";
    getEle('.employeeInfo').style.display = "block";
    getEle('.customerInfo').style.display = "none";
  } else {
    getEle('.studentInfo').style.display = "none";
    getEle('.employeeInfo').style.display = "none";
    getEle('.customerInfo').style.display = "block";
  } 
  
}
const takeInfo = () => {
  const element = document.querySelectorAll(
    "#personForm input, #personForm select"
  );
  console.log(element);
  let doiTuong = {};
  element.forEach((ele, index) => {
    const { value, name } = ele;
    doiTuong[name] = value;
  });

  console.log(doiTuong);

  if (doiTuong.type === "hs") {
    const { type, ten, address, email, id, toan, ly, hoa } = doiTuong;
    const student = new Student(type, ten, address, email, id, toan, ly, hoa);
    listPerson.add(student);
    return student;
  } else if (type === "nv") {
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
  } else {
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
  }
};

window.add = () => {
  const person = takeInfo();
  console.log(listPerson.getAll());
  renderList(listPerson.getAll());
};
