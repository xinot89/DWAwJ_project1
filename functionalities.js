/*Hajotetaan sivu itse, kunnes saan koodin toimimaan, siksi kommentoitu pois.*/
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskTable = document.getElementById('taskTable');
    const taskList = document.getElementById('taskList');
    if (taskInput.value.trim() === '') {
        alert('Please enter a task!');
        return;
    }
    // Create task row & column:
    const taskRow = document.createElement('tr');
    const taskColumn = document.createElement('td');
    taskColumn.textContent = taskInput.value;
    taskRow.appendChild(taskColumn);
    // Make Done -column
    const doneColumn = document.createElement('td');
    const doneButton = document.createElement('input');
    doneButton.type = "checkbox";
    doneButton.name = "Task done";
    doneButton.addEventListener('change', markTaskAsDone);
    doneColumn.appendChild(doneButton);
    taskRow.appendChild(doneColumn);
    // Make remove -column
    const removeColumn = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', removeTask);
    removeColumn.appendChild(removeButton);
    taskRow.appendChild(removeColumn);
    // Add task row to the table
    taskList.appendChild(taskRow);
    saveTasks();
    taskInput.value = '';
}
//markTaskAsDone adds/removes class from task name which effects styling.
//Could probably be done so, that it only checks edited entries instead of all.
function markTaskAsDone() {
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
    this.parentNode.parentNode.remove();
    saveTasks();
}
function removeHardCodedTask(theone) {
    theone.parentNode.parentNode.remove();
    saveTasks();
}
function purgeList() {
    const taskList = document.getElementById('taskList');
    if (confirm("Are you sure to remove all contents from task list?")) {
        taskList.innerHTML="";
        if ("tasks" in localStorage){
            localStorage.removeItem("tasks");
        }
    }
}
//started making removeDone 16.3.2024 10:30.
//feature done 16.3.2024 11:15.
function removeDone() {
    if (confirm("Are you sure to remove all done tasks?")) {
        const taskList = document.getElementById('taskList');
        const taskRows = taskList.querySelectorAll('tr');
        //Develop ability to iterate through checkboxes.
        taskRows.forEach(taskRow => {
            //const task = {};
            //task.name = taskRow.querySelector('td').textContent;
            // Save the state of the checkbox
            const checkbox = taskRow.querySelector('input[type="checkbox"]');
            //console.log("removeDone checkboxes: " + checkbox.checked);
            if (checkbox.checked) {
                taskRow.remove();
            }
            //task.done = checkbox.checked;
            //tasks.push(task);
        });
        saveTasks();
    }
    
}
/* Original saveTasks, ditched as it won't save checkboxe's states.
Also storing whole html for to-do list on localstorage seems bit unnecessary:
function saveTasks() {
    const taskTable = document.getElementById('taskTable');
    // Save tasks to localStorage
    localStorage.setItem('tasks', taskTable.innerHTML);
}
*/
function saveTasks() {
    const taskList = document.getElementById('taskList');
    const taskRows = taskList.querySelectorAll('tr');
    const tasks = [];
    // Loop through each task row
    taskRows.forEach(taskRow => {
        const task = {};
        task.name = taskRow.querySelector('td').textContent;
        // Save the state of the checkbox
        const checkbox = taskRow.querySelector('input[type="checkbox"]');
        task.done = checkbox.checked;
        tasks.push(task);
    });
    // Save tasks to localStorage as JSON
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasks() {
    if ("tasks" in localStorage){
        const taskList = document.getElementById('taskList');
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(task => {
                const taskRow = document.createElement('tr');
                const taskColumn = document.createElement('td');
                if (task.done) {
                    taskColumn.classList.add('donetasks');
                }
                taskColumn.textContent = task.name;
                //console.log("Put task to td with following name: " + task.name);
                taskRow.appendChild(taskColumn);
                //Checkbox:
                const doneColumn = document.createElement('td');
                const doneButton = document.createElement('input');
                doneButton.type = "checkbox";
                doneButton.name = "Task done";
                if (task.done) {
                    doneButton.checked = true;
                }
                doneButton.addEventListener('change', markTaskAsDone);
                doneColumn.appendChild(doneButton);
                taskRow.appendChild(doneColumn);
                //removebutton
                const removeColumn = document.createElement('td');
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.addEventListener('click', removeTask);
                removeColumn.appendChild(removeButton);
                taskRow.appendChild(removeColumn);
            
                // Add task row to the table
                taskList.appendChild(taskRow);
            });
        }
    } else {
        console.log("No tasks in localStorage")
    }
}