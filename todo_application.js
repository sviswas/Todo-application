let todoItemsContainer = document.getElementById("todoItemsContainer");
let add_todo_element = document.getElementById("add_todo_btn");
let save_todo_button = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
  // this function will get the JSON string from localStorage and if their is null in localStorage,this function will
  //  return empty array,else it will return JS array consists of objects.
  let stringifiedTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(stringifiedTodoList);
  if (parsedTodoList === null) {
    return [];
  } else {
    return parsedTodoList;
  }
}
let todoList = getTodoListFromLocalStorage(); //function call
let todoCount = todoList.length;

save_todo_button.onclick = function () {
  // on clicking the save button ,it saves the todoList array in the browser's localStorage.
  // localStorage values should be string type,so that we are converting JS array to string by using JSON.stringify().
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

function add_todo() {
  // add_todo function is used to add newTodo to the user interface.
  // when we give text input in the inputTextBox and after clicking ADD button the text in the inputBox with add as newTodo.
  let input_user_text = document.getElementById("todoUserInput");
  if (input_user_text.value === "") {
    // if inputBoxText is empty we are giving alert pop up to enter any text.
    alert("Enter Valid Text");
    return;
  }
  todoCount = todoCount + 1;
  let newTodo = {
    // we are creating newTodo object.
    text: input_user_text.value,
    uniqueNo: todoCount,
    isChecked: false,
  };
  todoList.push(newTodo);
  createAndAppendTodo(newTodo); // calling the function to append todo to the user interface.
  input_user_text.value = ""; //clearing the inputTextBox as empty after newTodo is appended to the user interface.
}

// for static todolist items the below array is used.
// creating the todoList array that consists of objects.
// let todoList = [
//     {
//         text: "Learn HTML",
//         uniqueNo:1
//     },
//     {
//         text: "Learn CSS",
//         uniqueNo:2
//     },
//     {
//         text: "Learn JavaScript",
//         uniqueNo:3
//     }
//     ];

add_todo_element.onclick = function () {
  // when we click on ADD button in the user interface then the funtion will be called and newTodo will be added.
  add_todo(); //function call
};

function onDeleteTodo(todo_id) {
  // Here we are deleting the todoList element from todoItemsContainer when we click on deleteIcon.
  // for deleting the todoList element we are getting unique todoListId from todoList element through function passing parameter.
  let todo_element = document.getElementById(todo_id);
  todoItemsContainer.removeChild(todo_element);
  let todo_delete_item_index = todoList.findIndex(function (each_item) {
    let each_todo_id = "todo_id" + each_item.uniqueNo;
    if (todo_id === each_todo_id) {
      return true;
    } else {
      return false;
    }
  });
  todoList.splice(todo_delete_item_index, 1); //splice is the array method.
}

function onTodoChange(check_id, label_id, todo_id) {
  let checkBoxElement = document.getElementById(check_id);
  let labelElement = document.getElementById(label_id);

  //  if(checkBoxElement.checked===true){
  //      labelElement.classList.add("checked");
  //  }
  //  else{
  //      labelElement.classList.remove("checked");
  //  }
  // Instead of writing this we can simply use toggle button.
  labelElement.classList.toggle("checked"); // if checkBox is clicked is becomes true then toggle button will add "checked" className to labelElement's classList ,else it removes className from classList.

  let todoObjectIndex = todoList.findIndex(function (each_todo) {
    let each_item = "todo_id" + each_todo.uniqueNo;
    if (each_item === todo_id) {
      return true;
    } else {
      return false;
    }
  });
  let todoObject = todoList[todoObjectIndex];
  if (todoObject.isChecked === true) {
    todoObject.isChecked = false;
  } else {
    todoObject.isChecked = true;
  }
}

function createAndAppendTodo(todo) {
  // we are creating unique id for labelElement and inputElement to identify the each element uniquely.
  let checkbox_id = "checkboxInput" + todo.uniqueNo;
  let label_id = "label_id" + todo.uniqueNo;
  let todo_id = "todo_id" + todo.uniqueNo;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoElement.id = todo_id;
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkbox_id;
  inputElement.checked = todo.isChecked;
  inputElement.classList.add("checkbox-input");
  inputElement.onclick = function () {
    onTodoChange(checkbox_id, label_id, todo_id); //we are calling function to check whether the inputElement checkbox is clicked or not clicked.
  };
  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkbox_id);
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
  labelElement.id = label_id;
  if (todo.isChecked === true) {
    labelElement.classList.add("checked");
  }
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.onclick = function () {
    // when deleteIcon is clicked then that particular todoList Item should be deleted.
    // for this we are passing unique todoList Id through function call.
    onDeleteTodo(todo_id); //function call
  };
  deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}
