import { SinhVien } from "../models/SinhVien.js";
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

document.querySelector("#valueSearch").oninput = async function () {
  let valueSearch = document.querySelector("#valueSearch").value;
  let typeSearch = document.querySelector("#typeSearch");
  let arrSinhVien = await getApiDataAsync(BASE_URL_GET_API);
  let arrNewSinhVien = [];

  switch (typeSearch.value) {
    case "tenSV":
      arrNewSinhVien = arrSinhVien.filter((sv) => {
        return (
          stringToSlug(sv.tenSinhVien).indexOf(stringToSlug(valueSearch)) !== -1
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
};

document.querySelector("#btnLuuThongTin").onclick = async function (e) {
  e.preventDefault();
  let newSV = new SinhVien();
  let id = 0;

  for (const input of arrInput) {
    newSV[input.name] = input.value;
    id = newSV.maSinhVien;
  }

  await putApiDataAsync(BASE_URL_PUT_ID_API, id, newSV);
  loadAPI(BASE_URL_GET_API);

  document.querySelector("#maSinhVien").disabled = false;
  document.querySelector("#btnThemSinhVien").classList.remove("d-none");
  document.querySelector("#btnLuuThongTin").classList.add("d-none");

  resetInput(arrInput);
};

document.querySelector("#btnThemSinhVien").onclick = async function (e) {
  e.preventDefault();
  let newSV = new SinhVien();

  for (const input of arrInput) {
    newSV[input.name] = input.value;
  }

  await postApiDataAsync(BASE_URL_POST_API, newSV);
  loadAPI(BASE_URL_GET_API);
  resetInput(arrInput);
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
  await deleteApiDataAsync(BASE_URL_DELETE_API, maSV);
  loadAPI(BASE_URL_GET_API);
};

window.suaSinhVien = async function (maSV) {
  let data = await getApiDataIDAsync(BASE_URL_GET_ID_API, maSV);

  for (const input of arrInput) {
    input.value = data[input.name];
  }

  document.querySelector("#btnThemSinhVien").classList.add("d-none");
  document.querySelector("#btnLuuThongTin").classList.remove("d-none");
  document.querySelector("#maSinhVien").disabled = true;
};

window.loadAPI = async function (url) {
  let data = await getApiDataAsync(url);

  renderTableSinhVien(data);
};

window.loadAPI(BASE_URL_GET_API);
