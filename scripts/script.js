const todoNameElem = document.querySelector('.js-todo-name');
const addBtnElem = document.querySelector('.js-add-btn');
const todosCont = document.querySelector('.js-todos-cont');
const guide = document.querySelector('.guide');

const todosArr = JSON.parse(localStorage.getItem('todosArr')) || [];

let isTodoNameEmpty = true;

renderTodo();

addBtnElem.addEventListener('click', () =>{
  addTodo();
});

document.body.addEventListener('keydown', e => {
  if(e.key === 'Enter') {
    addTodo();
  }
});

todoNameElem.addEventListener('focus', () => {
  if(!isTodoNameEmpty){
    guide.innerHTML = `Press <code>Enter</code> to Add todo`;
  }
});

todoNameElem.addEventListener('focusout', () => {
  guide.innerHTML = '';
});

todoNameElem.addEventListener('input', () => {
  isTodoNameEmpty = String(todoNameElem.value).trim() === '';
  if(!isTodoNameEmpty){
    guide.innerHTML = `Press <code>Enter</code> to Add todo`;
  } else if(isTodoNameEmpty){
    guide.innerHTML = ``;
  }
});

function addTodo() {
  if(String(todoNameElem.value).trim() !== ''){
    const todoObject = {
      name: todoNameElem.value,
      isCompleted: false
    }
    todosArr.push(todoObject);
    localStorage.setItem('todosArr',JSON.stringify(todosArr));
    renderTodo();
    todoNameElem.value = '';
    guide.innerHTML = ``;
  }
}

function renderTodo() {
  todosCont.innerHTML = '';
  todosArr.forEach((todoObject, index) => {
    todosCont.innerHTML += 
    `
    <div class="todo">
      <input class="js-cb" type="checkbox" ${todoObject.isCompleted === true ? 'checked' : ''}/>
      <div class="bar">
        <p>${todoObject.name}</p>
        <button class="js-delete-btn">Delete</button>
      </div>
    </div>
    `;
    const deleteBtnElem = document.querySelectorAll('.js-delete-btn');
    const checkboxElem = document.querySelectorAll('.js-cb');

    deleteBtnElem.forEach((elem, index) => {
      elem.addEventListener('click', () =>{
        todosArr.splice(index, 1);
        localStorage.setItem('todosArr',JSON.stringify(todosArr));
        renderTodo();
      });
    });

    checkboxElem.forEach((elem, index) => {
      elem.addEventListener('input',() => {
        todosArr[index].isCompleted = elem.checked;
        localStorage.setItem('todosArr', JSON.stringify(todosArr));
        if(elem.checked){
          document.querySelectorAll('.todo')[index].classList.add('completed');
        } else if(!elem.checked) {
          document.querySelectorAll('.todo')[index].classList.remove('completed');
        }
      });
      if(elem.checked){
          document.querySelectorAll('.todo')[index].classList.add('completed');
        } else if(!elem.checked) {
          document.querySelectorAll('.todo')[index].classList.remove('completed');
        }
    });
  });
}