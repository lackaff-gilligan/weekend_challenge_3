console.log('js sourced');
// global variables
var taskComplete = false;
var taskId;

$(document).ready(readyNow);

function readyNow(){
   // load existing tasks
   getTasks();
   // click handlers
   $('#submitBtn').on("click", submitClicked);
   $('#taskList').on("click", ".btn-success", toDoCompleted);
   $('#taskList').on("click", ".btn-danger", deleteTask);
} // end readyNow

function submitClicked(){
    console.log('in submitClicked');
    var addedTask = $('#taskIn').val();
    // create object
    var taskToSend = {
        task: addedTask,
        completedStatus: false
    };
    //call function that makes POST request
    sendTask(taskToSend);
    //clear input field
    $('#taskIn').empty();
}

function getTasks(){
    console.log('in getTasks');
    //ajax GET request
    $.ajax({
      method: 'GET',
      url: '/tasks'
    }).done(function(response){
        var tasks = response;
        console.log(tasks);
        appendToDom(tasks);
    }).fail(function(error){
        alert('something went wrong');
    });
} // end getTasks

function appendToDom(arr){
    //clear table at start
    $('#taskList').empty();
    for (var i = 0; i < arr.length; i++){
        var taskItem = arr[i];
        var $tr = $('<tr></tr>');
        $tr.data('taskItem', taskItem);
        $tr.append('<td>' + taskItem.task + '</td>');
        if(!taskItem.completedStatus){
        $tr.append('<button type="button" class="btn btn-success">COMPLETE</button>');
        }
        $tr.append('<button type="button" class="btn btn-danger">DELETE</button>');
        $('#taskList').append($tr);
    }
}

function sendTask(objToSend){
   //ajax POST request
   $.ajax({
       method: 'POST',
       url: '/tasks',
       data: objToSend
   }).done(function (response){
       console.log('response from server:', response);
       //make GET request to refresh task list
       getTasks();
   }).fail(function(error){
       alert('Something went wrong');
   });
}

toDoCompleted(){
 $(this).closest('tr')... //122 client.js
}

deleteTask(){

}