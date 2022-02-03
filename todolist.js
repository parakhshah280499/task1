// const container = document.querySelector('.div2');
// var inputValue = document.querySelector('.activ');
// const add = document.querySelector('.add');

// var flag=false;

// if(window.localStorage.getItem("todos") == undefined){
//      var todos = [];
//      window.localStorage.setItem("todos", JSON.stringify(todos));
// }


// var todosEX = window.localStorage.getItem("todos");
// var todos = JSON.parse(todosEX);


// class item{
// 	constructor(name){
// 		this.createItem(name);
// 	}
//     createItem(name){
//     	var itemBox = document.createElement('div');
//         itemBox.classList.add('item');

//     	var input = document.createElement('input');
//     	input.type = "text";
//     	input.disabled = true;
//     	input.value = name;
//     	input.classList.add('item_input');
//         input.style.marginBottom="70px";
//         input.style.position="realtive";
//         input.style.marginLeft="80px";
//         input.style.fontSize="15px";
//         input.style.width="40%";


//         var chec=document.createElement("INPUT");
//         chec.setAttribute("type", "checkbox");
//         //chec.classList.add("input");
//         chec.style.position="relative";
//         chec.style.bottom="85px";

//     	var edit = document.createElement('button');
//     	edit.classList.add('edit');
//     	edit.innerHTML = "Edit";
//     	edit.addEventListener('click', () => this.edit(input, name));

//     	var remove = document.createElement('button');
//     	remove.classList.add('delete');
//     	remove.innerHTML = "Delete";
//     	remove.addEventListener('click', () => this.remove(itemBox, name));

//     	container.appendChild(itemBox);
//         // itemBox.insertAdjacentElement("beforebegin",input);
//         // itemBox.insertAdjacentElement("beforebegin",chec);
//         itemBox.appendChild(edit);
//         itemBox.appendChild(remove);
//         itemBox.appendChild(input);
//         itemBox.appendChild(chec);

//         // itemBox.insertAdjacentElement("afterbegin",edit);

//     }

//     edit(input, name){
//         if(input.disabled == true){
//            input.disabled = !input.disabled;
//         }
//     	else{
//             input.disabled = !input.disabled;
//             // inputValue.value=input.value;
//             let indexof = todos.indexOf(name);
//             todos[indexof] = input.value;
//             window.localStorage.setItem("todos", JSON.stringify(todos));
//             flag=true;
//         }
//     }


//     remove(itemBox, name){
//         for(let i=0;i<todos.length;i++)
//         {
//             let index = todos.indexOf(name);
//             todos.splice(index, 1);
//             window.localStorage.setItem("todos", JSON.stringify(todos));
//             itemBox.parentNode.removeChild(itemBox);
 
//         }
//     }

// }

// add.addEventListener('click', check);
// window.addEventListener('keydown', (e) => {
// 	if(e.which == 13){
// 		check();
// 	}
// })

// function check(){
// 	if(inputValue.value != ""){
// 		new item(inputValue.value);
//         todos.push(inputValue.value);
//         window.localStorage.setItem("todos", JSON.stringify(todos));
// 		inputValue.value = "";
        
// 	}
// }


// for (var v = 0 ; v < todos.length ; v++){
//     new item(todos[v]);
// }

// window.setTimeout(function () {
//     window.location.reload();
//   }, 5000);

  var editId = "";
var countOfAllTasks = 0;
var countOfActiveTasks = 0;
let allTaskBlocks = []; 

var tab = 1;

function onAddTask()
{
    let textField = document.getElementById("activ");
    let newTask = textField.value;
    let newTaskString = String(newTask);
    
    let valid = true;

    let length = newTaskString.length;
    if(length == 0)
        valid = false;
    
    let nonSpace = false;
    for(let ch = 0; ch < length; ++ch)
        if(newTaskString.charAt(ch) != ' ')
            {
            nonSpace = true;
            break;
            }
    
    valid = nonSpace;
        
    if(valid == false)  
        {
        alert("Task is INVALID !! \n Please add a valid task");
        return;
        }
        
    textField.value = "";
        
    if(editId.length > 0)
        {
        changeTaskName(newTaskString);
        editId = "";
        return;
        }    
        
    countOfActiveTasks += 1;
    
    countOfAllTasks += 1;
    
    if(countOfAllTasks > 0)
        {
        let para = document.getElementById("remaining");
        para.innerHTML = String(countOfActiveTasks) + " tasks remaining";
        }
    else
        {
        let para = document.getElementById("remaining");
        para.innerHTML = "";  
        }   
        
    let newID = String(Math.floor(Math.random() * 1000_000_000));
        
    let newCheckBox = document.createElement("input"); 
    newCheckBox.setAttribute("type", "checkbox");
    newCheckBox.setAttribute("id", newID + "-checkbox");
    newCheckBox.setAttribute("onchange", "onCheckBoxStateChange(this)");
    
    let newCheckmark = document.createElement("span");
    newCheckmark.setAttribute("class", "checkmark");
    newCheckmark.setAttribute("id", newID + "-checkmark");
    
    let newLabel = document.createElement("label");
    newLabel.setAttribute("class", "container");
    newLabel.setAttribute("id", newID + "-label");
    newLabel.innerHTML = newTaskString;
    
    newLabel.appendChild(newCheckBox);
    newLabel.appendChild(newCheckmark);
  
    let newEditButton = document.createElement("button");
    newEditButton.setAttribute("type", "button");
    newEditButton.setAttribute("class", "edit_button");
    newEditButton.setAttribute("id", newID + "-edit");
    newEditButton.setAttribute("onclick", "onEditTask(this)");
    newEditButton.innerHTML = "Edit"; 
        
    let newDeleteButton = document.createElement("button");
    newDeleteButton.setAttribute("type", "button");
    newDeleteButton.setAttribute("class", "delete_button");
    newDeleteButton.setAttribute("id", newID + "-delete");
    newDeleteButton.setAttribute("onclick", "onDeleteTask(this)");
    newDeleteButton.innerHTML = "Delete";
    
    let newButtonGroup = document.createElement("div");
    newButtonGroup.setAttribute("class", "button_group");
    
    newButtonGroup.appendChild(newEditButton);
    newButtonGroup.appendChild(newDeleteButton);
    
    let newTaskBlock = document.createElement("div");
    newTaskBlock.setAttribute("class", "new-task");
    newTaskBlock.setAttribute("id", newID);
    
    newTaskBlock.appendChild(newLabel);
    
    newTaskBlock.appendChild(newButtonGroup);
    
    (document.getElementById("div2")).appendChild(newTaskBlock);
    
    allTaskBlocks.push(newTaskBlock);
    
    if(tab == 3)
        newTaskBlock.style["display"] = "none";
}

function onCheckBoxStateChange( checkbox )
{
    let label = checkbox.parentElement;
    
    let taskBlock = label.parentElement;
    
    if(checkbox.checked)
        {
        countOfActiveTasks -= 1;
        
        if(tab == 2)
            taskBlock.style["display"] = "none";
        
        label.style["text-decoration"] = "line-through";
        label.style["text-decoration-color"] = "maroon";
        
        }
    else
        {
        countOfActiveTasks += 1;
        
        if(tab == 3)
            taskBlock.style["display"] = "none";
        
        label.style["text-decoration"] = "initial";
        }
        
    let para = document.getElementById("remaining");
    para.innerHTML = String(countOfActiveTasks) + " tasks remaining";    
}

function onDeleteTask( deleteButton )
{    
    let buttonGroup = deleteButton.parentElement;
    
    let taskBlock = buttonGroup.parentElement;
    
    let taskBlockId = taskBlock.getAttribute("id");
    
    if(taskBlockId == editId)
        {
        editId = "";
        let textField = document.getElementById("activ");
        textField.value = "";
        }    
    
    let checkBoxId = taskBlockId + "-checkbox";
    
    let checkBox = document.getElementById(checkBoxId); 
    
    if(checkBox.checked == false)
        countOfActiveTasks -= 1;
        
    countOfAllTasks -= 1;    
    
    if(countOfAllTasks > 0)
        {
        let para = document.getElementById("remaining");
        para.innerHTML = String(countOfActiveTasks) + " tasks remaining";   
        }
     else
        {
        let para = document.getElementById("remaining");
        para.innerHTML = "";  
        }   
    
    (document.getElementById("div2")).removeChild(taskBlock);
    
    allTaskBlocks = allTaskBlocks.filter(item => (item.getAttribute("id")) !== taskBlockId);
}

function onEditTask( editButton )
{
    let buttonGroup = editButton.parentElement;
    
    let taskBlock = buttonGroup.parentElement;
    
    editId = taskBlock.getAttribute("id");
    
    let label = taskBlock.firstChild;
    
    let innerHTMLContent = String(label.innerHTML);
    
    let firstIndex = innerHTMLContent.indexOf("<");
    let task = innerHTMLContent.substring(0, firstIndex);
    
    let textField = document.getElementById("activ");
    textField.value = task;
}

function changeTaskName( newTaskString )
{
    let taskBlock = document.getElementById(editId);

    let checkboxId = editId + "-checkbox";
    let checkmarkId = editId + "-checkmark";
    let labelId = editId + "-label";

    let checkbox = document.getElementById(checkboxId);
    let checkmark = document.getElementById(checkmarkId);
    let label = document.getElementById(labelId);
    
    label.innerHTML = newTaskString;
    
    label.appendChild(checkbox);
    label.appendChild(checkmark);
}
