"use strict";

//lấy các DOM element
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const healthyBtn = document.getElementById("healthy-btn");
const bmiCalc = document.getElementById("bmi-btn");
const tableBodyEl = document.getElementById("tbody");

const petArr = [];

submitBtn.addEventListener("click", function () {
  //lấy dữ liệu từ form
  const time = new Date();
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: ageInput.value,
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    //bmi: bmiCalc.value,
    date: `${time.getDate()}/ ${time.getMonth() + 1}/ ${time.getFullYear()}`,
  };

  //kiểm tra dữ liệu bị thiếu
  const validateData = function (data) {
    if (data.id === "") {
      alert("Please enter an ID!");
      return false;
    } else if (data.name === "") {
      alert("Please enter a name");
      return false;
    } else if (data.age < 1 || data.age > 15 || data.age === "") {
      alert("Age must be between 1 and 15!");
      return false;
    } else if (data.type === "Select Type") {
      alert("Please select type!");
      return false;
    } else if (data.weight < 1 || data.weight > 15 || data.weight === "") {
      alert("Weight must be between 1 and 15!");
      return false;
    } else if (data.length < 1 || data.length > 100 || data.length === "") {
      alert("Length must be between 1 and 100!");
      return false;
    } else if (data.breed === "Select Breed") {
      alert("Please select Breed!");
      return false;
    } else {
      return true;
    }
  };

  //kiểm tra trùng ID
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unique!");
    }
  }

  //thêm thú cưng vào danh sách
  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    clearInput();
    renderTableData(petArr);
  }
});

function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<th>${petArr[i].id} </th>  <td>${
      petArr[i].name
    } </td>  <td>${petArr[i].age} </td> <td>${petArr[i].type} </td>  
    <td>${petArr[i].weight} kg</td>  <td>${petArr[i].length} cm</td>  <td>${
      petArr[i].breed
    } </td>  <td><i class="bi bi-square-fill" style="color: ${
      petArr[i].color
    }"></i></td>  <td>${
      petArr[i].vaccinated === true
        ? "<i class='bi bi-check-circle-fill'></i>"
        : "<i class='bi bi-x-circle-fill'> </i>"
    }</td>  <td>${
      petArr[i].dewormed === true
        ? "<i class='bi bi-check-circle-fill'></i>"
        : "<i class='bi bi-x-circle-fill'> </i>"
    }</td>  <td>${
      petArr[i].sterilized === true
        ? "<i class='bi bi-check-circle-fill'></i>"
        : "<i class='bi bi-x-circle-fill'> </i>"
    }</td> <td>${petArr[i].bmi ?? "?"} </td> <td>${
      petArr[i].date
    }</td> <td><button type="button" class="btn btn-danger" onclick="deletePet('${
      petArr[i].id
    }')">Delete</button></td>`;
    tableBodyEl.appendChild(row);
  }
}

//xóa dữ liệu ở form
const clearInput = function () {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

//xóa thú cưng
const deletePet = function (petId) {
  //xác nhận trước khi xóa thứ cưng
  if (confirm("Are you sure?")) {
    for (let i = 0; i < petId.length; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
        renderTableData(petArr);
      }
    }
  }
};

//hiển thị thú cưng khỏe mạnh
let healthyCheck = false;
healthyBtn.addEventListener("click", function () {
  if (healthyCheck === true) {
    let healthyPetArr = petArr.filter(function (petArr) {
      return petArr.vaccinated && petArr.dewormed && petArr.sterilized;
    });
    renderTableData(healthyPetArr);
    healthyBtn.textContent = "Show all pet";
    healthyCheck = false;
  } else {
    renderTableData(petArr);
    healthyBtn.textContent = "Show healthy pet";
    healthyCheck = true;
  }
});

//tính chỉ số BMI cho thú cưng
bmiCalc.addEventListener("click", calculateBMI(petArr));
function calculateBMI(petArr) {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].type === "Dog") {
      //tính BMI chó
      petArr[i].bmi = (petArr[i].weight * 703) / petArr[i].length ** 2;
      console.log(petArr[i].bmi);
    } else {
      //tính BMI mèo
      petArr[i].bmi = (petArr[i].weight * 886) / petArr[i].length ** 2;
      console.log(petArr[i].bmi);
    }
  }
  renderTableData(petArr);
  console.log(petArr);
}
