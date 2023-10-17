const getEle = (selector) => {
  document.querySelector(selector);
};

const takeInfo = () => {
  const element = document.querySelectorAll(
    "#personForm input, #personForm select"
  );
  console.log(element);
  let doiTuong ={} ;
  element.forEach((ele, index) => {
    const { value, name } = ele;
        doiTuong[name] = value;

 
  });
  console.log(doiTuong);
  
  if (doiTuong.type === "hs") {
    // nhu vay ne okay
    const { type, ten, address, email, id, toan, ly, hoa } = doiTuong;
    return new Student(type, ten, address, email, id, toan, ly, hoa);
  } else if (type === "nv") {
    const { type, ten, address, email, id, workDays, salaryDay } = doiTuong;
    return new Employee(
      type,
      ten,
      address,
      email,
      id,
      workDays,
      salaryDay
    );
    a
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
  };


};
// const getInfor = () => {
//   let ten = document.getElementById("ten").value;
//   let diemToan = document.getElementById("toan").value;
//   console.log('diemToan: ', diemToan);
//   // let ten = document.getElementById("ten").value;

//   console.log("ten: ", ten);
//   // ctrlS
// };
window.add = () => {
  console.log(takeInfo())
};
