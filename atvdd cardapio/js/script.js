window.addEventListener("load", start);

var globalNames = [];
var inputzin = null;
var isEditing = false;
var currentIndex = null;

function start() {
  inputzin = document.querySelector("#inputzin");
  preventFormSubmit();
  activateInput();
  render();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  var form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmit);
}

function activateInput() {
  function insertName(newName) {
    globalNames.push(newName);
    render();
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
    render();
  }

  function handleTyping(event) {
    if (event.key === "Enter" && inputzin.value!=' ') {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }
      isEditing = false;
      clearInput();
    }
  }
  inputzin.focus();
  inputzin.addEventListener("keyup", handleTyping);
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      render();
    }
    var button = document.createElement("button");
    button.classList.add("deleteButton");
    button.textContent = "x";
    button.addEventListener("click", deleteName);
    return button;
  }
  function createSpan(currentName, index) {
    function editItem() {
      inputzin.value = currentName;
      inputzin.focus();
      isEditing = true;
      currentIndex = index;
    }
    var span = document.createElement("span");
    
    span.classList.add("clickable");

    span.textContent = currentName;

    span.addEventListener("click", editItem);

    return span;
  }
  var divNames = document.querySelector("#names");
  divNames.innerHTML = "";

  var ul = document.createElement("ul");
  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];
    var li = document.createElement("li");
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);
    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }
  divNames.appendChild(ul);

  clearInput();
}
function clearInput() {
  inputzin.value = " ";
  inputzin.focus();
}
