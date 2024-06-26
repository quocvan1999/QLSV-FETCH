export function kiemTraRong(value, selectorError, name) {
  if (value.trim() === "") {
    document.querySelector(
      selectorError
    ).innerHTML = `${name} không được bỏ trống!`;
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}

export function kiemTraChu(value, selectorError, name) {
  let regexString = /^[A-Za-z]+$/;
  if (regexString.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }

  document.querySelector(selectorError).innerHTML = `${name} phải là chữ!`;
  return false;
}

export function kiemTraEmail(value, selectorError, name) {
  let regexEmail = /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/;
  if (regexEmail.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML = `${name} không hợp lệ!`;
  return false;
}

export function kiemTraLoaiSinhVien(value, selectorError, name) {
  if (value.trim() === "") {
    document.querySelector(
      selectorError
    ).innerHTML = `${name} Chọn loại sinh viên hợp lệ!`;
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}

export function kiemTraDiem(value, selectorError, name) {
  let number = +value;
  if (number < 0 || number > 10) {
    document.querySelector(
      selectorError
    ).innerHTML = `${name} phải là số từ 0 - 10!`;
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}

export function kiemTraSoDienThoai(value, selectorError, name) {
  let regexPhoneVN = /^0[3|5|7|8|9][0-9]{8}$/;
  if (regexPhoneVN.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML = `${name} không hợp lệ!`;
  return false;
}
