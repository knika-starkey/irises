let tan = document.getElementById("tan");
let pink = document.getElementById("pink");
let showCoords = document.getElementById("showCoords");
let state = document.getElementById("state");

let dogss = document.getElementsByClassName("dog");

for (let i = 0; i < dogss.length; i++) {
  dogss[i].onmousedown = go;
}

let dogsState = [];

for (let i = 0; i < dogss.length; i++) {
  dogsState[dogss[i].id] = false;
}

console.log(dogsState);

//проверка, попадает ли на поле f цветок с координатами left, top
function onField(f, left, top) {
  let field = getCoords(f); // получили координаты top и left, а также width и height текущего поля f

  if (
    left > field.left &&
    left < field.left + field.width &&
    top > field.top &&
    top < field.top + field.height &&
    (f == tan || f == pink)
  )
    return true;
  return false;
}

function go(event) {
  let dog = document.getElementById(event.target.id);
  let breed = dog.dataset.breed;
  let coords = getCoords(dog);
  let shiftX = event.pageX - coords.left;
  let shiftY = event.pageY - coords.top;

  moveAt(event);

  // функция перемещения объекта под координаты курсора
  function moveAt(event) {
    // сдвиг курсора на shiftX и shiftY относительно верхнего левог7о угла
    let left = event.pageX - shiftX;
    let top = event.pageY - shiftY;

    dog.style.left = left + "px";
    dog.style.top = top + "px";
    showCoords.innerHTML = `x: ${dog.style.left}, y: ${dog.style.top}`;

    if (onField(tan, left, top)) {
      if (breed == "tan") {
        tan.style.border = "2px solid green";
        pink.style.border = "none";
      } else {
        tan.style.border = "2px solid red";
        pink.style.border = "none";
      }
    }
    if (onField(pink, left, top)) {
      if (breed == "pink") {
        pink.style.border = "2px solid green";
        tan.style.border = "none";
      } else {
        pink.style.border = "2px solid red";
        tan.style.border = "none";
      }
    }
  }

  // событие перемещения мыши
  document.onmousemove = function (event) {
    moveAt(event);
  };

  // событие  отпускания мыши
  dog.onmouseup = function (event) {
    res(event);
  };

  function res(event) {
    let left = event.pageX - shiftX;
    let top = event.pageY - shiftY;
    dogsState[dog.id] = false; // сброс состояния текущего цветка
    tan.style.border = "none";
    pink.style.border = "none";
    if (onField(tan, left, top)) {
      if (breed == "tan") {
        dogsState[dog.id] = true;
      } else {
        dogsState[dog.id] = false;
      }
    }
    if (onField(pink, left, top)) {
      if (breed == "pink") {
        dogsState[dog.id] = true;
      } else {
        dogsState[dog.id] = false;
      }
    }
    //реализовать - если цветок находится на своем поле, то  dogsState[dog.id] = true, иначе - dogsState[dog.id] = false
    document.onmousemove = null;
    dog.onmouseup = null;
  }

  dog.ondragstart = function () {
    return false; // отмена drag and drop браузера
  };
}

// функция возвращает размер элемента и его координаты относительно объемлющего элемента.
function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  //scrollX и scrollY возвращают скроллирование окна в пикселях
  return {
    height: box.height,
    width: box.width,
    top: box.top + scrollY,
    left: box.left + scrollX,
  };
}

function check() {
  let istrue;
  for (let i = 0; i < dogss.length; i++) {
    if (
      (dogss[i].breed =
        "tan" &&
        dogss[i].left > tan.left &&
        dogss[i].left < tan.left + tan.width &&
        dogss[i].top > tan.top &&
        dogss[i].top < tan.top + tan.height)
    ) {
      istrue = true;
    } else if (
      (dogss[i].breed =
        "pink" &&
        dogss[i].left > pink.left &&
        dogss[i].left < pink.left + pink.width &&
        dogss[i].top > pink.top &&
        dogss[i].top < pink.top + pink.height)
    ) {
      istrue = true;
    } else {
      istrue = false;
      return istrue;
    }
  }
  return istrue;
  // Проверка, все ли ирисы на своем поле
  // реализовать - если в массиве dogsState хотя бы одно значение false, то выдавать сообщение "Error", если все true - то "OK". Сообщение писать в state
}
