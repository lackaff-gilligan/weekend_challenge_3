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
} // end readyNow

function submitClicked(){
    console.log('in submitClicked');
    var newTask = $('#taskIn').val();
    // create object
    var taskToSend = {
        task: newTask,
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
        taskItem = arr[i];
        var $tr = $('<tr></tr>');
        $tr.data('taskItem', taskItem);
        $tr.append('<td>' + taskItem.task + '</td>');
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