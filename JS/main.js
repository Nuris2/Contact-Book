// ! ============= todo list ===============
// ? CRUD - create read update delete
let btn = document.querySelector(".btn");
let inp = document.querySelector(".task-input");
let list = document.querySelector(".task-list");
let email = document.querySelector(".task-email");
let listmail = document.querySelector(".task-list1");
let image = document.querySelector(".task-image");
let listimage = document.querySelector(".task-last2");

render();

btn.addEventListener("click", () => {
  if (inp.value === "" || image.value === "" || email.value === "") {
    alert("Заполните все поля!");
    return;
  }
  let obj = {
    task: inp.value,
    email: email.value,
    image: image.value,
  };
  setItemToStorage(obj);
  render();
  inp.value = ""; // очищает инпут
  email.value = "";
  image.value = "";
});
// list.innerHTML = "";
// todo 111111111111111111111111111111
// btn.addEventListener("click", () => {
//   if (email.value === "") {
//     alert("Заполните Email!");
//     return;
//   }
//   let obj = { task: email.value }; // Создаем на=рвый объект с ключём task и со значением инпута (inp)
//   setItemToStorage(obj); // вызываем функцию котрая добавляет наш новый созданный объект в хранилише loclStorage c ключем task-data
//   render(); // для того чтобы все данные отображались на сайте
//   email.value = ""; // очищает инпут
// });
// todo 111111111111111111111111111111111

// todo 22222222222222222222222222222222
// btn.addEventListener("click", () => {
//   // событие на кнопку добавить (Add task)
//   if (image.value === "") {
//     // Проверка на заполнения инпута
//     alert("Добавьте фото!");
//     return; // return - нужен для того чтобы код ниже не сработал
//   }
//   let obj = { task: image.value }; // Создаем на=рвый объект с ключём task и со значением инпута (inp)
//   setItemToStorage(obj); // вызываем функцию котрая добавляет наш новый созданный объект в хранилише loclStorage c ключем task-data
//   render(); // для того чтобы все данные отображались на сайте
//   image.value = ""; // очищает инпут
// });
// todo 222222222222222222222222222222222222

// Функция для создания новых тасков и отправки в localStorage
// data = []
function setItemToStorage(task) {
  let data = JSON.parse(localStorage.getItem("task-data"));
  data.push(task); // в массив data добавляем новый массив
  localStorage.setItem("task-data", JSON.stringify(data));
}

// функция для отображения данных в браузере
function render() {
  if (!localStorage.getItem("task-data")) {
    // проверка на то, есть ли что-нибудь в localStorage, а именно наш ключ task-data
    localStorage.setItem("task-data", JSON.stringify([])); // если такого ключа нет, то создаем его и добавляем первое значение пустой массив
  }

  let newData = JSON.parse(localStorage.getItem("task-data")); // стягиваем массив с localStorage и преобразовываем в обычный формат js
  list.innerHTML = ""; // очищаем страницу
  newData.forEach((item, index) => {
    // перебираем массив и для каждого элемента создаём новый li тег с кнопками delete и edit
    let li = document.createElement("li");
    let image = document.createElement("img");
    let btnDelete = document.createElement("button");
    let btnEdit = document.createElement("button");
    // let image = document.createElement(".task-image");
    li.innerText = `${item.task}  ${item.email}`;
    console.log(item.image, "url");
    image.src = item.image;
    // image.setAttribute("src", item.image);
    btnDelete.innerText = "Delete";
    btnEdit.innerText = "Edit";
    li.append(image);
    li.append(btnDelete);
    li.append(btnEdit);
    list.append(li); // Добавляем в тег ul новыый созданный li тег
    li.append(image);
    btnDelete.addEventListener("click", () => {
      // Событие на кнопку delete
      deleteElement(index); // Вызов функции, в аргументы передаем индекс кнопки
    });
    btnEdit.addEventListener("click", () => {
      editElement(index); // Вызов фнкукции Edit в аргументы передаем индекс элемента
    });
  });
}

function deleteElement(id) {
  let data = JSON.parse(localStorage.getItem("task-data"));
  data.splice(id, 1); // с помощю метода splice удаления нужный элемент
  localStorage.setItem("task-data", JSON.stringify(data));
  render();
}

let mainModal = document.querySelector(".main-modal");
let btnCloser = document.querySelector(".btn-closer");
let btnSave = document.querySelector(".btn-save");
let inpEdit = document.querySelector(".inp-edit");

function editElement(id) {
  mainModal.style.display = "block"; // для того чтоыбы отобразить модальное окно которое уже заготовлено
  let data = JSON.parse(localStorage.getItem("task-data"));
  inpEdit.setAttribute("id", id); // для того чтобы соохранить нужный нам индекс в атрибкт инпута в виде id
  inpEdit.value = data[id].task; // перезаписываем значаение инпута на нужное нам значение из массива а localStorage
}

// Событие на кнопку save
btnSave.addEventListener("click", () => {
  if (inpEdit.value.trim() === "") {
    // проверка заполнение поля

    alert("Заполните поле!");
    return;
  }
  let data = JSON.parse(localStorage.getItem("task-data"));
  let editTask = {
    // создаем новыый обект с ключем task и со значением инпута edit
    task: inpEdit.value,
  };
  let index = inpEdit.id; // в переменную  index ср=охранчем индекс нашего li тега
  data.splice(index, 1, editTask);
  console.log(data);
  localStorage.setItem("task-data", JSON.stringify(data));
  mainModal.style.display = "none"; //Закрвыаем наше модальное окно
  render(); // вызываем для отображение данных на сайте
});

// trim() - поиск пробелов в начале предложения. Не учитвыает пробелы

btnCloser.addEventListener("click", () => {
  mainModal.style.display = "none";
});
