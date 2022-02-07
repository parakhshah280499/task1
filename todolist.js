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

  var editButtonId = "";
var totaltaskscount = 0;
var countactivetasks = 0;
let todoArray = []; 

var flag = 1;

function addTask()
{
    let entered_text = document.getElementById("activ");
    let task_new = entered_text.value;
    let task_new_string = String(task_new);
    
    let valid = true;

    let length = task_new_string.length;
    if(length == 0)
        valid = false;
    
    let non_space = false;
    for(let i = 0; i < length; ++i)
        if(task_new_string.charAt(i) != ' ')
            {
            non_space = true;
            break;
            }
    
    valid = non_space;
        
    if(valid == false)  
        {
        alert("Task is INVALID !! \n Please add a valid task");
        return;
        }
        
    entered_text.value = "";
        
    if(editButtonId.length > 0)
        {
        tasknamenew(task_new_string);
        editButtonId = "";
        return;
        }    
        
    countactivetasks += 1;
    
    totaltaskscount += 1;
    
    if(totaltaskscount > 0)
        {
        let para = document.getElementById("remaining");
        para.innerHTML = String(countactivetasks) + " tasks remaining";
        }
    else
        {
        let para = document.getElementById("remaining");
        para.innerHTML = "";  
        }   
        
    let newID = String(Math.floor(Math.random() * 1000_000_000));
        
    let checkboxNew= document.createElement("input"); 
    checkboxNew.setAttribute("type", "checkbox");
    checkboxNew.setAttribute("id", newID + "-checkbox");
    checkboxNew.setAttribute("onchange", "checkboxclick(this)");
    
    let checkmarkNew = document.createElement("span");
    checkmarkNew.setAttribute("class", "checkmark");
    checkmarkNew.setAttribute("id", newID + "-checkmark");
    
    let labelNew = document.createElement("label");
    labelNew.setAttribute("class", "container");
    labelNew.setAttribute("id", newID + "-label");
    labelNew.innerHTML = task_new_string;
    
    labelNew.appendChild(checkboxNew);
    labelNew.appendChild(checkmarkNew);
  
    let editbuttonNew = document.createElement("button");
    editbuttonNew.setAttribute("type", "button");
    editbuttonNew.setAttribute("class", "edit_button");
    editbuttonNew.setAttribute("id", newID + "-edit");
    editbuttonNew.setAttribute("onclick", "edittask(this)");
    editbuttonNew.innerHTML = "Edit"; 
        
    let deletebuttonNew = document.createElement("button");
    deletebuttonNew.setAttribute("type", "button");
    deletebuttonNew.setAttribute("class", "delete_button");
    deletebuttonNew.setAttribute("id", newID + "-delete");
    deletebuttonNew.setAttribute("onclick", "deletetask(this)");
    deletebuttonNew.innerHTML = "Delete";
    
    let buttton_combined_new = document.createElement("div");
    buttton_combined_new.setAttribute("class", "button_group");
    
    buttton_combined_new.appendChild(editbuttonNew);
    buttton_combined_new.appendChild(deletebuttonNew);
    
    let task_space_new = document.createElement("div");
    task_space_new.setAttribute("class", "new-task");
    task_space_new.setAttribute("id", newID);
    
    task_space_new.appendChild(labelNew);
    
    task_space_new.appendChild(buttton_combined_new);
    
    (document.getElementById("div2")).appendChild(task_space_new);
    
    todoArray.push(task_space_new);
    
    if(flag == 3)
        task_space_new.style["display"] = "none";
}

function checkboxclick( checkbox )
{
    let label = checkbox.parentElement;
    
    let taskBlock = label.parentElement;
    
    if(checkbox.checked)
        {
        countactivetasks -= 1;
        
        if(flag == 2)
            taskBlock.style["display"] = "none";
        
        label.style["text-decoration"] = "line-through";
        label.style["text-decoration-color"] = "maroon";
        
        }
    else
        {
        countactivetasks += 1;
        
        if(flag == 3)
            taskBlock.style["display"] = "none";
        
        label.style["text-decoration"] = "initial";
        }
        
    let para = document.getElementById("remaining");
    para.innerHTML = String(countactivetasks) + " tasks remaining";    
}

function deletetask( deleteButton )
{    
    let buttonGroup = deleteButton.parentElement;
    
    let taskBlock = buttonGroup.parentElement;
    
    let taskBlockId = taskBlock.getAttribute("id");
    
    if(taskBlockId == editButtonId)
        {
        editButtonId = "";
        let entered_text = document.getElementById("activ");
        entered_text.value = "";
        }    
    
    let checkBoxId = taskBlockId + "-checkbox";
    
    let checkBox = document.getElementById(checkBoxId); 
    
    if(checkBox.checked == false)
        countactivetasks -= 1;
        
    totaltaskscount -= 1;    
    
    if(totaltaskscount > 0)
        {
        let para = document.getElementById("remaining");
        para.innerHTML = String(countactivetasks) + " tasks remaining";   
        }
     else
        {
        let para = document.getElementById("remaining");
        para.innerHTML = "";  
        }   
    
    (document.getElementById("div2")).removeChild(taskBlock);
    
    todoArray = todoArray.filter(item => (item.getAttribute("id")) !== taskBlockId);
}

function edittask( editButton )
{
    let buttonGroup = editButton.parentElement;
    
    let taskBlock = buttonGroup.parentElement;
    
    editButtonId = taskBlock.getAttribute("id");
    
    let label = taskBlock.firstChild;
    
    let innerHTMLContent = String(label.innerHTML);
    
    let firstIndex = innerHTMLContent.indexOf("<");
    let task = innerHTMLContent.substring(0, firstIndex);
    
    let entered_text = document.getElementById("activ");
    entered_text.value = task;
}

function tasknamenew( task_new_string )
{
    let taskBlock = document.getElementById(editButtonId);

    let checkboxId = editButtonId + "-checkbox";
    let checkmarkId = editButtonId + "-checkmark";
    let labelId = editButtonId + "-label";

    let checkbox = document.getElementById(checkboxId);
    let checkmark = document.getElementById(checkmarkId);
    let label = document.getElementById(labelId);
    
    label.innerHTML = task_new_string;
    
    label.appendChild(checkbox);
    label.appendChild(checkmark);
}

function clickAll()
{
    let all = document.getElementById("all2");
    let active = document.getElementById("activ2");
    let completed = document.getElementById("comp");
    
    all.setAttribute("class", "all");
    active.setAttribute("class", "a");
    completed.setAttribute("class", "a");

    for(let i = 0 ; i < todoArray.length; ++i)
        {
        let taskBlock = todoArray[i];
      
        taskBlock.style["display"] = "inline-block";
        }
    
    flag = 1;
}

function clickActive()
{
    let all = document.getElementById("all2");
    let active = document.getElementById("activ2");
    let completed = document.getElementById("comp");
    
    all.setAttribute("class", "a");
    active.setAttribute("class", "all");
    completed.setAttribute("class", "a");

    for(let i = 0 ; i < todoArray.length; ++i)
        {
        let taskBlock = todoArray[i];
        
        let taskBlockId = taskBlock.getAttribute("id");
        
        let checkBoxId = taskBlockId + "-checkbox";
    
        let checkBox = document.getElementById(checkBoxId); 
        
        if(checkBox.checked)
            taskBlock.style["display"] = "none";
        else
            taskBlock.style["display"] = "inline-block";
        }
    
    flag = 2;
}

function clickCompleted()
{
    let all = document.getElementById("all2");
    let active = document.getElementById("activ2");
    let completed = document.getElementById("comp");
    
    all.setAttribute("class", "a");
    active.setAttribute("class", "a");
    completed.setAttribute("class", "all");
    
    for(let i = 0 ; i < todoArray.length; ++i)
        {
        let taskBlock = todoArray[i];
        
        let taskBlockId = taskBlock.getAttribute("id");
        
        let checkBoxId = taskBlockId + "-checkbox";
    
        let checkBox = document.getElementById(checkBoxId); 
        
        if(checkBox.checked == false)
            taskBlock.style["display"] = "none";
        else
            taskBlock.style["display"] = "inline-block";
        }
    
    flag = 3;
}

