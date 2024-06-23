/**
 * Hàm chuyển đổi chuỗi thành định dạng không dấu để làm chức năng tìm kiếm
 * @param {*} title chuỗi cần chuyển đổi
 * @returns trả về chuỗi đã được định dạng
 */
export function stringToSlug(title) {
  //Đổi chữ hoa thành chữ thường
  let slug = title.toLowerCase();
  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");
  //Xóa các ký tự đặt biệt
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ""
  );
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, "-");
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-/gi, "-");
  slug = slug.replace(/\-\-/gi, "-");
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = "@" + slug + "@";
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");

  return slug;
}

/**
 * Hàm set id cho các item trong mảng giúp tranh việc trùng id giữa các item
 * @param {*} arr mảng cần set id cho các item
 * @returns trả về id
 */
export function setId(arr) {
  let id = 0;

  if (arr.length === 0) {
    id = 0;
  } else {
    id = arr[arr.length - 1].maNhanVien + 1;
  }

  return id;
}

export async function getApiDataAsync(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getApiDataIDAsync(url, id) {
  try {
    const response = await fetch(`${url}${id}`);
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function postApiDataAsync(url, data) {
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error(err);
  }
}

export async function putApiDataAsync(url, id, data) {
  try {
    await fetch(`${url}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error(err);
  }
}

export async function deleteApiDataAsync(url, id) {
  try {
    await fetch(`${url}${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.error(err);
  }
}

export function resetInput(arrElement) {
  for (const input of arrElement) {
    input.value = "";
  }
}
