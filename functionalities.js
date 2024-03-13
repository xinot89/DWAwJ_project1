/*Hajotetaan sivu itse, kunnes saan koodin toimimaan, siksi kommentoitu pois.*/
document.addEventListener('DOMContentLoaded', () => {
    // Load tasks from localStorage when the page loads
    loadTasks();
});


function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    //console.log("addTask taskList palauttaa: " + taskList);

    /*if (!taskList) {
        console.log ("!taskList laukesi")
        taskList = document.createElement('tbody');
        taskTable.appendChild(taskList);
    }
    */
    if (taskInput.value.trim() === '') {
        alert('Please enter a task!');
        return;
    }

    // Create task row
    const taskRow = document.createElement('tr');
    //Give 13 digit timestamp as id to each row, so editing and deletion operations can be focused on that.
    //UNNECESSARY, parentNode.parentNode.... works good enough.
    //taskRow.id = 'task-' + Date.now();

    // Task column
    const taskColumn = document.createElement('td');
    taskColumn.textContent = taskInput.value;
    taskRow.appendChild(taskColumn);

    // Done column
    /* Alkuperäinen, yksisuuntainen nappitoteutus:
    const doneColumn = document.createElement('td');
    const doneButton = document.createElement('button');
    doneButton.textContent = 'Done';
    doneButton.addEventListener('click', markTaskAsDone);
    doneColumn.appendChild(doneButton);
    taskRow.appendChild(doneColumn);
    */
    const doneColumn = document.createElement('td');
    const doneButton = document.createElement('input');
    doneButton.type = "checkbox";
    doneButton.name = "Task done"
    doneButton.addEventListener('change', markTaskAsDone);
    doneColumn.appendChild(doneButton);
    taskRow.appendChild(doneColumn);

    // Remove column
    const removeColumn = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', removeTask);
    removeColumn.appendChild(removeButton);
    taskRow.appendChild(removeColumn);

    // Add task row to the table
    taskList.appendChild(taskRow);

    // Save tasks to localStorage
    saveTasks();

    // Clear input field
    taskInput.value = '';
}

function markTaskAsDone() {
    //this.parentNode.parentNode.style.color = 'tomato';
    //this.parentNode.parentNode.style.borderColor = "black";
    //Easier to make common class for done tasks instead of defining each separately:
    //this.parentNode.parentNode.classList.add('donetasks');
    //this.parentNode.classList.add('donetasks');
    var cells = this.parentNode.parentNode.children;
    //For loop which sets donetasks class into each cell.
    if (this.checked) {
        for (var i = 0; i <cells.length; i++) {
            cells[i].classList.add('donetasks');
        }
    } else {
        for (var i = 0; i <cells.length; i++) {
            cells[i].classList.remove('donetasks');
        }
    }

    saveTasks();
}

function removeTask() {
    // Add your logic here to remove the task
    this.parentNode.parentNode.remove();
    saveTasks();
}

function saveTasks() {
    const taskTable = document.getElementById('taskTable');
    // Save tasks to localStorage
    localStorage.setItem('tasks', taskTable.innerHTML);
}

function loadTasks() {
    const taskTable = document.getElementById('taskTable');
    // If taskList does not exist, create it
    let taskList = document.getElementById('taskList');
    if (!taskList) {
        taskList = document.createElement('tbody');
        taskTable.appendChild(taskList);
    } else {
        // Load tasks from localStorage
        taskTable.innerHTML = localStorage.getItem('tasks') || '';
    }
    
    // query all objects, which have class "donetasks"
    const donetasksElements = taskTable.querySelectorAll('.donetasks');
    //console.log("loadTasks DonetasksElements: "+donetasksElements);
    donetasksElements.forEach((donetasksElement, index) => {
        //console.log("loadTasks DonetasksElements foreach run: "+index);
        const checkbox = donetasksElement.querySelector('input[type="checkbox"]');
        if (checkbox) {
            //checkbox.checked = checkboxStates[index];
            checkbox.checked = true;
        }
    });
}
