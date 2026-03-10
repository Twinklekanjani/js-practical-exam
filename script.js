const taskinputs = document.querySelectorAll('#form .form-control');
const submit = document.getElementById('form');
const mytable = document.querySelector('#table tbody')
let list = JSON.parse(localStorage.getItem('userlist')) || [];
let edituser = JSON.parse(localStorage.getItem('edituser')) || {};
let data = {};


taskinputs?.forEach((input)=>{
    input.addEventListener('input',(e)=>{
    const{name,value} = e.target;
    data = {...data,[name]:value};
    })
});

submit?.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(data.id){
        list=list.map((item)=>{
            if(item.id == data.id){
                return data;
            }
            return item;
        })
        edituser = {};
        data = {};
    }
    else{
    list.push({...data,id:Date.now()})
    }
    location.href='./view-task.html';
    localStorage.setItem('userlist',JSON.stringify(list));
    form.reset();
})

const handleDisplay = (list)=>{
    mytable.innerHTML = '';
    list.forEach((item,index)=>{
        const{id,title,description,duedate,priority} = item;
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${index + 1}</td>
        <td>${title}</td>
        <td>${description}</td>
        <td>${duedate}</td>
        <td>${priority}</td>
        <td>
        <button type="button" class="btn btn-danger" onclick="handleDelete(${id})">Delete</button>
        <button type="button" class="btn btn-warning" onclick="handleEdit(${id})">Edit</button>
        </td>
        `
        mytable.appendChild(row);
    })
}

if(mytable)
{
    handleDisplay(list);
}

const handleDelete =(id)=>{
    list = list.filter(item => item.id != id)
    localStorage.setItem('userlist',JSON.stringify(list));
    handleDisplay(list);
}

const handleEdit = (id)=>{
    let data = list.find(item => item.id == id)
    localStorage.setItem('edituser',JSON.stringify(data));
    location.href = './add-to-task.html';
}

const Displayedituser = ()=>{
    taskinputs.forEach((input)=>{
        const{name} = input;
        input.value = edituser[name];
    })
}

if(edituser.id){
    data = edituser;
    Displayedituser();
}
