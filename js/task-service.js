export default class TaskService{

    getListTaskApi(){
        return axios({
            url:"https://6183cb0191d76c00172d1b6b.mockapi.io/api/test1",
            method: "GET",
        });
    }
    deleteTaskApi(id){
        return axios({
            url:`https://6183cb0191d76c00172d1b6b.mockapi.io/api/test1/${id}`,
            method: "DELETE"
        })
    }
    addTaskApi(task){
        return axios({
            url:"https://6183cb0191d76c00172d1b6b.mockapi.io/api/test1",
            method:"POST",
            data: task,
        })
    }
    getTaskApi(id){
        return axios({
            url :`https://6183cb0191d76c00172d1b6b.mockapi.io/api/test1/${id}`,
            method: "GET",
        })
    }
    updateTaskApi(task){
        return axios({
            url :`https://6183cb0191d76c00172d1b6b.mockapi.io/api/test1/${task.id}`,
            method: "PUT",
            data: task,
        })
    }
}