console.log('js sourced');
// global variables
var taskComplete = false;
var taskId;

$(document).ready(readyNow);

function readyNow(){
   // load existing tasks
   getTasks();

} // end readyNow

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
    })
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