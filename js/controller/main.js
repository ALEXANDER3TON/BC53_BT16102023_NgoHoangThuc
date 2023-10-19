const getEle = (selector) => {
  return document.querySelector(selector);
};

const listPerson = new ListPerson();
const LIST_PERSON = "LIST_PERSON";
const data = JSON.parse(localStorage.getItem(LIST_PERSON));

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
          <button class="btn btn-success" onclick="edit(${element.id})" data-bs-toggle="modal"
          data-bs-target="#fillInfoModal">Sửa</button>
          <button class="btn btn-danger" onclick="del(${element.id})">Xóa</button>
          <button class="btn btn-warning" onclick="details(${element.id})" data-bs-toggle="modal"
          data-bs-target="#infoModal">Chi tiết</button>
        </td>
      </tr>
    `;
  });
  getEle("#tbodyPerson").innerHTML = htmlContent;
};

if(data !== null) {
  renderList(data)
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
  getEle("#ten").value = "";
  getEle("#address").value = "";
  getEle("#email").value = "";
  getEle("#id").value = "";
  getEle("#id").disabled = false;
  getEle("#toan").value = "";
  getEle("#ly").value = "";
  getEle("#hoa").value = "";
  getEle("#workDays").value = "";
  getEle("#salaryDay").value = "";
  getEle("#companyName").value = "";
  getEle("#price").value = "";
  getEle("#feedback").value = "";
};
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
    return student;
  } else if (doiTuong.type === "Nhân viên") {
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
    return employee;
  } else if (doiTuong.type === "Khách hàng") {
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
    return customer;
  } else {
    const { type, ten, address, email, id } = doiTuong;
    const person = new Person(type, ten, address, email, id);
    return person;
  }
};
let valid;

const checkValidation = (person) => {
  // Kiểm tra đối tượng
  valid = checkOption(person.type, "tbdt", "Vui lòng chọn đối tượng");

  // Kiểm tra tên
  valid &=
    checkEmpty(person.ten, "tbten", "Vui lòng nhập tên") &&
    checkString(person.ten, "tbten", "Vui lòng chỉ nhập ký tự chữ");

  // Kiểm tra địa chỉ
  valid &= checkEmpty(person.address, "tbdc", "Vui lòng địa chỉ");

  // Kiểm tra email
  valid &= checkEmpty(person.email, "tbemail", "Vui lòng nhập Email");
  valid &= checkEmail(person.email, "tbemail", "Vui lòng nhập Email hợp lệ");

  // Kiểm tra mã
  valid &=
    checkEmpty(person.id, "tbma", "Vui lòng nhập mã") &&
    checkNumber(person.id, "tbma", "Mã gồm 4 ký tự số") &&
    checkID(person.id, 4, 4, "tbma", "Mã gồm 4 ký tự số") &&
    checkDuplicate(person.id, listPerson.list, "tbma", "Mã đã tồn tại");
  // Kiểm tra điểm học sinh
  if (person.type === "Học sinh") {
    valid &=
      checkEmpty(person.toan, "tbToan", "Vui lòng nhập điểm Toán") &&
      checkNumber(person.toan, "tbToan", "Điểm Toán phải là số");
    valid &=
      checkEmpty(person.ly, "tbLy", "Vui lòng nhập điểm Lý") &&
      checkNumber(person.ly, "tbLy", "Điểm Lý phải là số");
    valid &=
      checkEmpty(person.hoa, "tbHoa", "Vui lòng nhập điểm Hóa") &&
      checkNumber(person.hoa, "tbHoa", "Điểm Hóa phải là số");
  }

  // Kiểm tra số ngày làm và lương nhân viên
  if (person.type === "Nhân viên") {
    valid &=
      checkEmpty(person.workDays, "tbSNL", "Vui lòng nhập số ngày làm") &&
      checkNumber(person.workDays, "tbSNL", "Số ngày làm phải là số") &&
      checkLimit(
        person.workDays,
        20,
        26,
        "tbSNL",
        "Số ngày làm quy định từ 20-26 ngày"
      );
    valid &=
      checkEmpty(person.salaryDay, "tbLNL", "Vui lòng nhập lương") &&
      checkNumber(person.salaryDay, "tbLNL", "Lương phải là số") &&
      checkLimit(
        person.salaryDay,
        200000,
        400000,
        "tbLNL",
        "Vui lòng nhập lương theo quy định"
      );
  }

  // Kiểm tra thông tin khách hàng
  if (person.type === "Khách hàng") {
    valid &= checkEmpty(
      person.companyName,
      "tbTCT",
      "Vui lòng nhập tên công ty"
    );
    valid &=
      checkEmpty(person.price, "tbGTDH", "Vui lòng nhập giá trị đơn hàng") &&
      checkNumber(person.price, "tbGTDH", "Giá trị đơn hàng phải là số");
  }
  return valid;
};


const checkValidationUpdate = (person) => {
  // Kiểm tra đối tượng
  valid = checkOption(person.type, "tbdt", "Vui lòng chọn đối tượng");

  // Kiểm tra tên
  valid &=
    checkEmpty(person.ten, "tbten", "Vui lòng nhập tên") &&
    checkString(person.ten, "tbten", "Vui lòng chỉ nhập ký tự chữ");

  // Kiểm tra địa chỉ
  valid &= checkEmpty(person.address, "tbdc", "Vui lòng địa chỉ");

  // Kiểm tra email
  valid &= checkEmpty(person.email, "tbemail", "Vui lòng nhập Email");
  valid &= checkEmail(person.email, "tbemail", "Vui lòng nhập Email hợp lệ");

  
  // Kiểm tra điểm học sinh
  if (person.type === "Học sinh") {
    valid &=
      checkEmpty(person.toan, "tbToan", "Vui lòng nhập điểm Toán") &&
      checkNumber(person.toan, "tbToan", "Điểm Toán phải là số");
    valid &=
      checkEmpty(person.ly, "tbLy", "Vui lòng nhập điểm Lý") &&
      checkNumber(person.ly, "tbLy", "Điểm Lý phải là số");
    valid &=
      checkEmpty(person.hoa, "tbHoa", "Vui lòng nhập điểm Hóa") &&
      checkNumber(person.hoa, "tbHoa", "Điểm Hóa phải là số");
  }

  // Kiểm tra số ngày làm và lương nhân viên
  if (person.type === "Nhân viên") {
    valid &=
      checkEmpty(person.workDays, "tbSNL", "Vui lòng nhập số ngày làm") &&
      checkNumber(person.workDays, "tbSNL", "Số ngày làm phải là số") &&
      checkLimit(
        person.workDays,
        20,
        26,
        "tbSNL",
        "Số ngày làm quy định từ 20-26 ngày"
      );
    valid &=
      checkEmpty(person.salaryDay, "tbLNL", "Vui lòng nhập lương") &&
      checkNumber(person.salaryDay, "tbLNL", "Lương phải là số") &&
      checkLimit(
        person.salaryDay,
        200000,
        400000,
        "tbLNL",
        "Vui lòng nhập lương theo quy định"
      );
  }

  // Kiểm tra thông tin khách hàng
  if (person.type === "Khách hàng") {
    valid &= checkEmpty(
      person.companyName,
      "tbTCT",
      "Vui lòng nhập tên công ty"
    );
    valid &=
      checkEmpty(person.price, "tbGTDH", "Vui lòng nhập giá trị đơn hàng") &&
      checkNumber(person.price, "tbGTDH", "Giá trị đơn hàng phải là số");
  }
  return valid;
};

const findPerson = (list, id) => {
  let item;
  list.forEach((element) => {
    if (Number(element.id) === Number(id)) {
      item = element;
    }
  });
  return item;
};

getEle("#addPerson").addEventListener('click', () => {
  getEle("#update").style.display="none";
  getEle("#add").style.display="block"
})
window.add = () => {
  const data = JSON.parse(localStorage.getItem(LIST_PERSON));
  const person = takeInfo();
  if (data !== null) {
    listPerson.list = data;
  }
  valid = checkValidation(person);

  if (valid) {
    listPerson.add(person);
    localStorage.setItem(LIST_PERSON, JSON.stringify(listPerson.list));
    renderList(listPerson.list);
    resetForm();
  }
};



window.edit = (id) => {
  const data = JSON.parse(localStorage.getItem(LIST_PERSON));
  const person = findPerson(data, id);
  console.log(person);
  renderInput(person.type);
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

  getEle("#add").style.display="none"
  getEle("#update").style.display="block"
};

window.updatePerson = () => {
  const person = takeInfo();
  valid = checkValidationUpdate(person)
  if(valid) {
    const index = listPerson.list.findIndex((element) => {
      return element.id === person.id;
    });
  
  if(index !== -1){
    listPerson.list[index] = person;
    localStorage.setItem(LIST_PERSON, JSON.stringify(listPerson.list));
    renderList(listPerson.list);
    resetForm();
  }
  }
};

window.del = (id) => {
  const index = listPerson.list.findIndex((element) => {
    return element.id === id;
  });
  listPerson.list.splice(index, 1);
  localStorage.setItem(LIST_PERSON, JSON.stringify(listPerson.list));
  renderList(listPerson.list);
};

const renderDetails = (person) => {
  let htmlContent = "";
  switch (person.type) {
    case "Học sinh":
      htmlContent = `
        <div class="table-responsive foodTable">
          <table class="table table-striped table-sm">
            <thead>
              <tr class="bg-warning text-white">
                <th>Điểm Toán</th>
                <th>Điểm Lý</th>
                <th>Điểm Hóa</th>
                <th>Điểm Trung Bình</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${person.toan}</td>
                <td>${person.ly}</td>
                <td>${person.hoa}</td>
                <td>${
                  (Number(person.toan) +
                    Number(person.ly) +
                    Number(person.hoa)) /
                  3
                }</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      getEle("#modalDetails").innerHTML = htmlContent;
      break;
    case "Nhân viên":
      htmlContent = `
          <div class="table-responsive foodTable">
            <table class="table table-striped table-sm">
              <thead>
                <tr class="bg-warning text-white">
                  <th>Số ngày làm</th>
                  <th>Lương/Ngày</th>
                  <th>Tổng Lương</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${person.workDays}</td>
                  <td>${person.salaryDay}</td>
                  <td>${Number(person.workDays) * Number(person.salaryDay)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        `;
      getEle("#modalDetails").innerHTML = htmlContent;
      break;
    case "Khách hàng":
      htmlContent = `
            <div class="table-responsive foodTable">
              <table class="table table-striped table-sm">
                <thead>
                  <tr class="bg-warning text-white">
                    <th>Tên công ty</th>
                    <th>Giá trị đơn hàng</th>
                    <th>Đánh giá</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${person.companyName}</td>
                    <td>${person.price}</td>
                    <td>${person.feedback}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `;
      getEle("#modalDetails").innerHTML = htmlContent;
      break;
  }
};

window.details = (id) => {
  const data = JSON.parse(localStorage.getItem(LIST_PERSON));
  const person = findPerson(data, id);
  renderDetails(person);
};
