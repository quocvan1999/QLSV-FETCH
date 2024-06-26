import { SinhVien } from "../models/SinhVien.js";
import {
  kiemTraRong,
  kiemTraChu,
  kiemTraLoaiSinhVien,
  kiemTraDiem,
  kiemTraEmail,
  kiemTraSoDienThoai,
} from "../assets/util/validation.js";
import {
  getApiDataAsync,
  postApiDataAsync,
  resetInput,
  deleteApiDataAsync,
  getApiDataIDAsync,
  putApiDataAsync,
  stringToSlug,
} from "../assets/util/method.js";

let arrInput = document.querySelectorAll("#frmThongTinSinhVien .inputData");
let BASE_URL = "https://svcy.myclass.vn/api/SinhVienApi/";
let BASE_URL_GET_API = BASE_URL + "LayDanhSachSinhVien";
let BASE_URL_POST_API = BASE_URL + "ThemSinhVien";
let BASE_URL_DELETE_API = BASE_URL + "XoaSinhVien?maSinhVien=";
let BASE_URL_GET_ID_API = BASE_URL + "LayThongTinSinhVien?maSinhVien=";
let BASE_URL_PUT_ID_API = BASE_URL + "CapNhatThongTinSinhVien?maSinhVien=";
let arrTB = document.querySelectorAll(".text-tb");

document.querySelector("#valueSearch").oninput = async function () {
  try {
    let valueSearch = document.querySelector("#valueSearch").value;
    let typeSearch = document.querySelector("#typeSearch");
    let arrSinhVien = await getApiDataAsync(BASE_URL_GET_API);
    let arrNewSinhVien = [];

    switch (typeSearch.value) {
      case "tenSV":
        arrNewSinhVien = arrSinhVien.filter((sv) => {
          return (
            stringToSlug(sv.tenSinhVien).indexOf(stringToSlug(valueSearch)) !==
            -1
          );
        });
        break;
      case "loaiSV":
        arrNewSinhVien = arrSinhVien.filter((sv) => {
          return (
            stringToSlug(sv.loaiSinhVien).indexOf(stringToSlug(valueSearch)) !==
            -1
          );
        });
        break;
      default:
        break;
    }

    renderTableSinhVien(arrNewSinhVien);
  } catch (e) {
    console.log(e);
  }
};

document.querySelector("#btnLuuThongTin").onclick = async function (e) {
  try {
    e.preventDefault();
    let newSV = new SinhVien();
    let id = 0;

    for (const input of arrInput) {
      newSV[input.name] = input.value;
      id = newSV.maSinhVien;
    }

    let valid = validationForm(newSV);

    if (!valid) {
      return;
    }

    await putApiDataAsync(BASE_URL_PUT_ID_API, id, newSV);
    loadAPI(BASE_URL_GET_API);

    document.querySelector("#maSinhVien").disabled = false;
    document.querySelector("#btnThemSinhVien").classList.remove("d-none");
    document.querySelector("#btnLuuThongTin").classList.add("d-none");

    resetInput(arrInput);
    resetTb(arrTB);
  } catch (e) {
    console.log(e);
  }
};

document.querySelector("#btnThemSinhVien").onclick = async function (e) {
  e.preventDefault();
  try {
    let newSV = new SinhVien();

    for (const input of arrInput) {
      newSV[input.name] = input.value;
    }

    let valid = validationForm(newSV);

    if (!valid) {
      return;
    }

    await postApiDataAsync(BASE_URL_POST_API, newSV);
    loadAPI(BASE_URL_GET_API);
    resetInput(arrInput);
    resetTb(arrTB);
  } catch (e) {
    console.log(e);
  }
};

window.renderTableSinhVien = function (arr) {
  let stringHtml = "";
  let i = 0;

  for (const sv of arr) {
    i++;
    stringHtml += `
        <tr>
            <th scope="row">${i}</th>
            <td>${sv.maSinhVien}</td>
            <td>${sv.tenSinhVien}</td>
            <td>${sv.loaiSinhVien}</td>
            <td>${sv.diemToan}</td>
            <td>${sv.diemLy}</td>
            <td>${sv.diemHoa}</td>
            <td>${sv.diemRenLuyen}</td>
            <td>${sv.email}</td>
            <td>${sv.soDienThoai}</td>
            <td class="d-flex justify-content-around align-items-center">
                <a onclick="suaSinhVien('${sv.maSinhVien}')" class="fs-6 text-success">
                    <i class="fa-solid fa-pen-to-square"></i>
                </a>
                <a onclick="xoaSinhVien('${sv.maSinhVien}')" class="fs-5 text-danger">
                    <i class="fa-solid fa-xmark"></i>
                </a>
            </td>
        </tr>
    `;
  }

  document.querySelector("tbody").innerHTML = stringHtml;
};

window.xoaSinhVien = async function (maSV) {
  try {
    await deleteApiDataAsync(BASE_URL_DELETE_API, maSV);
    loadAPI(BASE_URL_GET_API);
  } catch (e) {
    console.log(e);
  }
};

window.suaSinhVien = async function (maSV) {
  try {
    resetTb(arrTB);
    let data = await getApiDataIDAsync(BASE_URL_GET_ID_API, maSV);

    for (const input of arrInput) {
      input.value = data[input.name];
    }

    document.querySelector("#btnThemSinhVien").classList.add("d-none");
    document.querySelector("#btnLuuThongTin").classList.remove("d-none");
    document.querySelector("#maSinhVien").disabled = true;
  } catch (e) {
    console.log(e);
  }
};

window.loadAPI = async function (url) {
  try {
    let data = await getApiDataAsync(url);

    renderTableSinhVien(data);
  } catch (e) {
    console.log(e);
  }
};

function validationForm(arr) {
  let valid = true;
  let arrInput = document.querySelectorAll(
    "#frmThongTinSinhVien input[data-typeNull=null]"
  );
  let arrInputDiem = document.querySelectorAll(
    "#frmThongTinSinhVien input[data-typeDiem=diem]"
  );
  let { tenSinhVien, loaiSinhVien, email, soDienThoai } = arr;

  for (const input of arrInput) {
    valid &= kiemTraRong(input.value, `#tb-${input.id}`, "");
  }

  if (kiemTraRong(tenSinhVien, "#tb-tenSinhVien", "")) {
    valid &= kiemTraChu(tenSinhVien, "#tb-tenSinhVien", "");
  }

  valid &= kiemTraLoaiSinhVien(loaiSinhVien, "#tb-loaiSinhVien", "");

  for (const input of arrInputDiem) {
    if (kiemTraRong(input.value, `#tb-${input.id}`, "")) {
      valid &= kiemTraDiem(input.value, `#tb-${input.id}`, "");
    }
  }

  if (kiemTraRong(email, "#tb-email", "")) {
    valid &= kiemTraEmail(email, "#tb-email", "");
  }

  if (kiemTraRong(soDienThoai, "#tb-soDienThoai", "")) {
    valid &= kiemTraSoDienThoai(soDienThoai, "#tb-soDienThoai", "");
  }

  return valid;
}

function resetTb(arr) {
  for (const tb of arr) {
    tb.innerHTML = "";
  }
}

window.loadAPI(BASE_URL_GET_API);
