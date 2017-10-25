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
   $('#taskList').on("click", ".btn-success", completeClicked);
  $('#taskList').on("click", ".btn-danger", deleteTask);
} // end readyNow

function submitClicked(){
    console.log('in submitClicked');
    taskComplete = false;
    var addedTask = $('#taskIn').val();
    // create object
    var taskToSend = {
        task: addedTask,
        completedStatus: taskComplete //change from 'false' to the variable
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
        console.log('something went wrong in GET req:', error);
    });
} // end getTasks

function appendToDom(arr){
    //clear table at start
    $('#taskList').empty();
    for (var i = 0; i < arr.length; i++){
        var taskItem = arr[i];
        var $tr = $('<tr></tr>');
        $tr.data('taskItem', taskItem);
        $tr.append('<td class="col-md-4">' + taskItem.task + '</td>');
        if(taskItem.completed === false){
            $tr.append('<td><button type="button" data-id="' + taskItem.id + '"class="btn btn-success">COMPLETE</button></td>');
        }
        else {
            $tr.append('<td><p>COMPLETED</p></td>');
            $tr.addClass("green");
        }
        $tr.append('<td class="col-md-4"><button type="button" data-id="' + taskItem.id + '"class="btn btn-danger">DELETE</button></td>');
        $('#taskList').append($tr);
    } //END Loop
}//END appendToDom

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
       console.log('Something went wrong in POST req:', error);
   });
}

function completeClicked() {
    console.log('in completeClicked');
   //switch to true
    taskComplete = true; 
 //var taskId = $(this).closest('tr').data('id');
 var taskId = $(this).data('id');
 console.log('var taskId:', taskId);
 console.log('this button', $(this));
 
 
 var currentTask = $(this).closest('tr').data('taskItem'); //122 client.js
 console.log(currentTask);

 //create new obj to send with completed = true
 var taskCompToSend = {
    task: currentTask.task,
    completedStatus: taskComplete //change from 'false' to the variable
};


 //ajax put request
 $.ajax({
     method: 'PUT',
     url: '/tasks/' + taskId, //req.params
     data: taskCompToSend //req.body
 }).done(function(response){
     getTasks(); //run the GET request
 }).fail(function(error){
     console.log('something went wrong in PUT req:', error);
 });

}

function deleteTask(){
  var taskId = $(this).data('id');
  console.log('Delete task with id:', taskId);

  //ajax DELETE request
  $.ajax({
      method: 'DELETE',
      url: '/tasks/' + taskId
  }).done(function(response){
      getTasks();
  }).fail(function(error){
      console.log('something went wrong in DELETE req:', error);
  })
  
}