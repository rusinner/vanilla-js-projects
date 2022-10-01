//when window loads receives data from local storage

window.addEventListener('load',() =>{
todos = JSON.parse(localStorage.getItem('todos')) || [];

    //variables declaration
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    const userName = localStorage.getItem('username') || '';

    nameInput.value = userName;
    nameInput.addEventListener('change', e => {
        localStorage.setItem('username',e.target.value);
    });
//create local storage object on submit
    newTodoForm.addEventListener('submit', e => {
        //build the object type
      const todo = {
        content: e.target.elements.content.value,
        category:e.target.category.value,
        done:false,
        createdAt:new Date().getTime()
      }
     //push it on the array
      todos.push(todo);
      //convert it to json
      localStorage.setItem('todos',JSON.stringify(todos));
     
      e.target.reset();

      DisplayTodos();
    });
    DisplayTodos();

});
//when i add a todo item on the list appear on screen
function DisplayTodos(){
    const todoList = document.querySelector('#todo-list');
//for each one i create
    todoList.innerHTML = '';
 //tasks sort by date
    todos
    .sort((a,b) => b.createdAt - a.createdAt)
    .forEach(todo => {
      const todoItem = document.createElement('div');
      todoItem.classList.add('todo-item');
//all the other elements in it
      const label = document.createElement('label');
      const input = document.createElement('input');
      const span = document.createElement('span');
      const content =document.createElement('div');
      const actions = document.createElement('div');
      const edit = document.createElement('button');
      const deleteButton = document.createElement('button');
//if done add bubble
      input.type = 'checkbox';
      input.checked = todo.done;
      span.classList.add('bubble');
//split the categories
      if(todo.category == 'personal'){
        span.classList.add('personal');
      }else{
        span.classList.add('business');
      }
 //add classes to elements
      content.classList.add('todo-content');
      actions.classList.add('actions');
      edit.classList.add('edit');
      deleteButton.classList.add('delete');
      
      //create edit and delete buttons
      content.innerHTML = `<input type = "text" value = "${todo.content}" readonly>`;
      edit.innerHTML = 'Edit';
      deleteButton.innerHTML = 'Delete';
     
      //add them to inputs
      label.appendChild(input);
      label.appendChild(span);
      actions.appendChild(edit);
      actions.appendChild(deleteButton);
      todoItem.appendChild(label);
      todoItem.appendChild(content);
      todoItem.appendChild(actions);

      todoList.appendChild(todoItem);
  //linethrough when done
      if(todo.done){
        todoItem.classList.add('done');
      }
  //done true in storage
      input.addEventListener('click', e =>{
      todo.done = e.target.checked;
      localStorage.setItem('todos',JSON.stringify(todos));
//and remove accordingly
      if(todo.done){
        todoItem.classList.add('done');
      }else{
        todoItem.classList.remove('done');
      }

      DisplayTodos();

      });
//edit button functionality
        edit.addEventListener('click', e =>{
        const input = content.querySelector('input');
        input.removeAttribute('readonly');
        input.focus();
        input.addEventListener('blur' , e => {
            input.setAttribute('readonly' ,true);
            todo.content = e.target.value;
            DisplayTodos();
        });
      });

    //delete button functionality
    deleteButton.addEventListener('click',e => {
    todos = todos.filter(t => t != todo);
    localStorage.setItem('todos',JSON.stringify(todos));
    DisplayTodos();
    });

     });
}

