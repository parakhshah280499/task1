const container = document.querySelector('.div2');
var inputValue = document.querySelector('.activ');
const add = document.querySelector('.add');

if(window.localStorage.getItem("todos") == undefined){
     var todos = [];
     window.localStorage.setItem("todos", JSON.stringify(todos));
}

var todosEX = window.localStorage.getItem("todos");
var todos = JSON.parse(todosEX);


class item{
	constructor(name){
		this.createItem(name);
	}
    createItem(name){
    	var itemBox = document.createElement('div');
        itemBox.classList.add('item');

    	var input = document.createElement('input');
    	input.type = "text";
    	input.disabled = true;
    	input.value = name;
    	input.classList.add('item_input');
        input.style.marginBottom="70px";
        input.style.position="realtive";
        input.style.marginLeft="80px";
        input.style.fontSize="15px";
        input.style.width="40%";

        var chec=document.createElement("INPUT");
        chec.setAttribute("type", "checkbox");
        //chec.classList.add("input");
        chec.style.position="relative";
        chec.style.bottom="85px";


    	var edit = document.createElement('button');
    	edit.classList.add('edit');
    	edit.innerHTML = "Edit";
    	edit.addEventListener('click', () => this.edit(input, name));

    	var remove = document.createElement('button');
    	remove.classList.add('delete');
    	remove.innerHTML = "Delete";
    	remove.addEventListener('click', () => this.remove(itemBox, name));

    	container.appendChild(itemBox);

        itemBox.insertAdjacentElement("beforebegin",input);
        itemBox.insertAdjacentElement("beforebegin",chec);
        itemBox.appendChild(remove);
        itemBox.insertAdjacentElement("afterbegin",edit);

    }

    edit(input, name){
        if(input.disabled == true){
           input.disabled = !input.disabled;
        }
    	else{
            input.disabled = !input.disabled;
            let indexof = todos.indexOf(name);
            todos[indexof] = input.value;
            window.localStorage.setItem("todos", JSON.stringify(todos));
        }
    }

    remove(itemBox, name){
        itemBox.parentNode.removeChild(itemBox);
        let index = todos.indexOf(name);
        todos.splice(index, 1);
        window.localStorage.setItem("todos", JSON.stringify(todos));
    }
}

add.addEventListener('click', check);
window.addEventListener('keydown', (e) => {
	if(e.which == 13){
		check();
	}
})

function check(){
	if(inputValue.value != ""){
		new item(inputValue.value);
        todos.push(inputValue.value);
        window.localStorage.setItem("todos", JSON.stringify(todos));
		inputValue.value = "";
	}
}


for (var v = 0 ; v < todos.length ; v++){
    new item(todos[v]);
}


