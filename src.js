"use strict"

$(document).ready(function() {
  var taskList = [];

  // Task ID
    var taskID = {
    val  : 1000,
    inc  : function() {
       return ++this.val;
    }
  }

  // Delete task (when is done)
  function delTask(btn, list, id) {
    // Find task index
    var index = $.map(list, function(e, i) {
      if(e.id === parseInt(btn.id)){ return i; }
    });
    // Update task list (remove element from array)
    list.splice(index, 1);
    // Update task list div
    $("#" + parseInt(btn.id) + "_divTaskItem").remove();
    // Update status pannel
    showStat(list, id);
  }

  // Edit task list item
  function editTaskListItem(btn, list) {
    // Find task index
    // var index = $.map(list, function(e, i) {
    //  if(e.id === parseInt(btn.id)){ return i; }
    //});

    console.log(btn.id);
    // Update task list div (edit mode)
    // var span_id = $("<span></span>").append("ID_" + "TBD" + ": ");
    // var in_name = $("<input></input>").
    //   attr("type", "text");
    //////append("" + task.name + " ");
    //$("#" + btn.id).parent().empty().append(span_id, in_name);
  }

  // Generate task list item
  function genTaskItem(task, list, id) {
    var span_id = $("<span></span>").append("ID_" + task.id + ": ");
    var span_name = $("<span></span>").append("" + task.name + " ");
    var btn_edit = $("<button></button>").
      attr("id", "" + task.id + "_btnTaskItemEdit").append("Edit").
      click(function() { editTaskListItem(this, list); });
    var btn_done = $("<button></button>").
      attr("id", "" + task.id + "_btnTaskItemDone").append("Done!").
      click(function() { delTask(this, list, id); });
    return $("<div></div>").attr({
      "id"      : "" + task.id + "_divTaskItem",
      "style"   : "background-color:#bdc3c7",
    }).append(span_id, span_name, btn_edit, btn_done);
  }

  // Show stat
  function showStat(list, id) {
    var span_last_id = $("<span></span>").
      append("Last ID: " + id.val + "; ");
    var span_task_num = $("<span></span>").
      append("Tasks: " + list.length + "; ");
    $("#divStatus").empty().
      append(span_last_id, span_task_num);
  }

  // Task prototype
  function Task(id, name) {
    this.id = id;
    this.name = name;
  }

  // Main functionality implementation starts here...
  // *** New task pannel
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
      $("#divTaskList").prepend(genTaskItem(new_task, list, id));
      // Update status pannel
      showStat(list, id);
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

  // *** Update status pannel
  showStat(taskList, taskID);
});
