import { SinhVien } from "../models/SinhVien.js";
import { getApiDataAsync } from "../assets/util/method.js";

let BASE_URL_GET_API =
  "https://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien";

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
  console.log(maSV);
};

window.suaSinhVien = async function (maSV) {
  console.log(maSV);
};

window.loadAPI = async function (url) {
  let data = await getApiDataAsync(url);

  renderTableSinhVien(data);
};

window.loadAPI(BASE_URL_GET_API);
