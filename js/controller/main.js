const getEle = (selector) => {
  document.querySelector(selector);
};

const takeInfo = () => {
  const element = document.querySelectorAll(
    "#personForm input, #personForm select"
  );

  let doiTuong = {};
  element.forEach((ele, index) => {
    // console.log(ele.value, ele.name)
    const { value, name } = ele;

    doiTuong[name] = value;

    console.log(doiTuong[name])
  });

  if (doiTuong.type === "hs") {
    const { type, ten, address, email, id, toan, ly, hoa } = doiTuong;
    return new Student(type, ten, address, email, id, toan, ly, hoa);
  } else if (doiTuong.type === "nv") {
    const { type, ten, address, email, id, workDays, salaryDay } = doiTuong;
    return new Employee(type, ten, address, email, id, workDays, salaryDay);
  } else {
    const { type, ten, address, email, id, companyName, price, feedback } =
      doiTuong;
    return new Customer(
      type,
      ten,
      address,
      email,
      id,
      companyName,
      price,
      feedback
    );
  }
};

window.addPerson = () => {
  const i = takeInfo();
  console.log(i)
};
