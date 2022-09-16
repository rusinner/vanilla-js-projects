//variables declaration
let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let msg = document.getElementById('msg');
let dateInput = document.getElementById('dateInput');
let textarea = document.getElementById('textarea');
let tasks = document.getElementById('tasks');
let add = document.getElementById('add');
let noTasks = document.getElementById('noTasks');



//click add button
form.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation();
    
});

//submit task button and error alerts
let formValidation = () => {
    if(textInput.value === ''){
        
        msg.innerHTML = 'Task cannot be blank';
    }
    else{
        msg.innerHTML = '';
        acceptData();
        add.setAttribute('data-bs-dismiss',"modal");
        add.click();

        (() => {
            add.setAttribute('data-bs-dismiss',"");  
        })();
    }
    
};
//accept and store data
let data = [];



let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value
    });

    //local storage
    localStorage.setItem('data',JSON.stringify(data));


createTasks();
};
//upload tasks on screen
let createTasks = () => {
    
    data.map((x,y) => {
        return tasks.innerHTML += `
        <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>
          <span class="options">
            <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
        `;
    });
        
    

resetForm();
};
//delete task button
let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id,1);
    localStorage.setItem('data',JSON.stringify(data));


}
//edit task button
let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement; 
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
    deleteTask(e);
};

//reset form when submit
let resetForm = () => {
    textInput.value = '';
    dateInput.value = '';
    textarea.value = '';

};
//error handling when data array is empty
(() => {
   data =JSON.parse(localStorage.getItem('data')) || []; 
   createTasks();
   
})();