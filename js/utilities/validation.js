
function checkEmpty(value, idErr, message) {
    if (value === "") {
      document.getElementById(idErr).innerHTML = message;
      document.getElementById(idErr).style.display = "block";
      return false;
    } else {
      document.getElementById(idErr).innerHTML = "";
      document.getElementById(idErr).style.display = "none";
      return true;
    };
  };
  
  function checkEmail(value, idErr, message) {
    const reMail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  
    var email = reMail.test(value);
    if (email) {
      document.getElementById(idErr).innerHTML = "";
      document.getElementById(idErr).style.display = "none";
      return true;
    } else {
      document.getElementById(idErr).innerHTML = message;
      document.getElementById(idErr).style.display = "block";
      return false;
    };
  };

  function checkDuplicate(value, ds, idErr, message) {
    var index = ds.findIndex(function (nv) {
      return nv.account == value;
    });
  
    if (index != -1) {
      document.getElementById(idErr).innerHTML = message;
      document.getElementById(idErr).style.display = "block";
      return false;
    } else {
      document.getElementById(idErr).innerHTML = "";
      document.getElementById(idErr).style.display = "none";
      return true;
    };
  };
  
  function checkString(value, idErr, message) {
    const reString =
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g;
  
    var testString = reString.test(value);
    if (testString) {
      document.getElementById(idErr).innerHTML = "";
      document.getElementById(idErr).style.display = "none";
      return true;
    } else {
      document.getElementById(idErr).innerHTML = message;
      document.getElementById(idErr).style.display = "block";
      return false;
    };
  };
  
  function checkLimit(value, min, max, idErr, message) {
    if (value >= min && value <= max) {
      document.getElementById(idErr).innerHTML = "";
      document.getElementById(idErr).style.display = "none";
      return true;
    } else {
      document.getElementById(idErr).innerHTML = message;
      document.getElementById(idErr).style.display = "block";
      return false;
    };
  };
  function checkAcount(value, min, max, idErr, message) {
    var length = value.length;
    if (length >= min && length <= max) {
      document.getElementById(idErr).innerHTML = "";
      document.getElementById(idErr).style.display = "none";
      return true;
    } else {
      document.getElementById(idErr).innerHTML = message;
      document.getElementById(idErr).style.display = "block";
      return false;
    };
  };
  
  function checkNumber(value, idErr, message) {
    const reNumber = /^[0-9]+$/;
    var checkNum = reNumber.test(value);
    if (checkNum) {
      document.getElementById(idErr).innerHTML = "";
      document.getElementById(idErr).style.display = "none";
      return true;
    } else {
      document.getElementById(idErr).innerHTML = message;
      document.getElementById(idErr).style.display = "block";
      return false;
    };
  };
  
  function checkEmptyNum(value, idErr, message){
    if(value === ''){
      document.getElementById(idErr).innerHTML = message;
      document.getElementById(idErr).style.display = "block";
      return false;
    } else {
      document.getElementById(idErr).innerHTML = "";
      document.getElementById(idErr).style.display = "none";
      return true;
    }
  }

  function checkOption(value, idErr, message){
  
    if(value === "Chọn đối tượng"){
      document.getElementById(idErr).innerHTML = message;
      document.getElementById(idErr).style.display = "block";
      return false;
    } else {
      document.getElementById(idErr).innerHTML = "";
      document.getElementById(idErr).style.display = "none";
      return true;
    }
  }