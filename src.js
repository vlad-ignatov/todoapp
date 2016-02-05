"use strict"

var taskList = [];

// Compose task list item
function createTaskListItem(new_task) {
  return    "<div>" +
              taskList[taskList.length-1].id + " " +
              taskList[taskList.length-1].name +
            "</div>";
}

// Task prototype
function Task(id, name) {
  this.id = id;
  this.name = name;
}

// Task ID counter
var taskID = {
  val  : 0,
  inc  : function() {
     return ++this.val;
  }
}

// jQuery
$(document).ready(function() {
  // *** Add new task pannel
  // Show/Hide pannel
  $("#btnAddNewToggle").click(function(){
    $("#divAddNew").toggle();
  });

  //Add new task (Closures!)
  $("#btnAddNew").click(function() {
    return function(id, list) {
      var new_id = id.inc();
      var new_name = $("#inAddNewName").val();
      var new_task = new Task(new_id, new_name);
      // Update task list array
      list.push(new_task);
      // Update task list div
      $("#divTaskList").prepend(createTaskListItem(new_task));
    }(taskID, taskList);
  });

  // *** Status pannel
  // Show/Hide pannel
  $("#btnStatusToggle").click(function(){
    $("#divStatus").toggle();
  });

  // *** Task list pannel
  // Show/Hide pannel
  $("#btnTaskListToggle").click(function(){
    $("#divTaskList").toggle();
  });

  // *** About pannel
  // Show/Hide pannel
  $("#btnAboutToggle").click(function(){
    $("#divAbout").toggle();
  });
});
