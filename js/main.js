import TaskService from  "./task-service.js";
import Task from "./task.js";
const ListTaskService = new TaskService();
const getELE = (id) =>  document.getElementById(id);

const renderData =(arr) =>{
        let contentToDo ="";
        let contentCompleted ="";
        arr?.forEach((task,)=>{
            if(task.status === "todo"){
                contentToDo += `
                <li>
                    <span>${task.textTask}</span>
                    <div class="buttons">
                      <button onclick="delTask(${task.id})" class="remove" >
                        <i class="fa fa-trash-alt"></i>
                      </button>
                      <button onclick="changeTask(${task.id})" class="complete">
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-check-circle"></i>
                      </button>
                    </div>
                  </li>
                `
            }
            else{
              contentCompleted +=`
              <li>
              <span>${task.textTask}</span>
              <div class="buttons">
                <button onclick="delTask(${task.id})" class="remove">
                  <i class="fa fa-trash-alt"></i>
                </button>
                <button onclick="changeTask(${task.id})" class="complete">
                  <i class="far fa-check-circle"></i>
                  <i class="fas fa-check-circle"></i>
                </button>
              </div>
            </li>
              `
            }
        })
            getELE("completed").innerHTML = contentCompleted;
            getELE("todo").innerHTML = contentToDo;
}
const fetchData = () =>{
    ListTaskService.getListTaskApi()
    .then((result)=>{
        renderData(result.data);
    })
    .catch((error)=>{
        console.log(error);
    })
}
fetchData();
// Delete
const delTask = (id) =>{
    ListTaskService.deleteTaskApi(id)
    .then(()=>{
      alert("Xóa thành công");
        fetchData();
    })
    .catch((error)=>{
        console.log(error);
    })
}
window.delTask = delTask;
//Add
getELE("addItem").addEventListener("click",()=>{
    var newTask = getELE("newTask").value;
    const task = new Task("",newTask,"todo");
    ListTaskService.addTaskApi(task)
    .then(()=>{
      alert("Thêm thành công");
        fetchData();
    })
    .catch((error)=>{
        console.log(error);
    })
})
// Change
const changeTask = async (id) =>{
  
    const taskDetail = await ListTaskService.getTaskApi(id)
    // console.log(taskDetail.data);
    if(taskDetail.data.status == "completed"){
      const task = new Task(id , taskDetail.data.textTask,"todo")

      const result =  await ListTaskService.updateTaskApi(task);
      if(result.status == 200){
          alert("Chuyển thành công");
          fetchData();
      }
    }else{
      const task = new Task(id , taskDetail.data.textTask,"completed")
      
      const result =  await ListTaskService.updateTaskApi(task);
      if(result.status == 200){
          alert("Chuyển thành công");
          fetchData();
      }
    }
}

window.changeTask = changeTask;