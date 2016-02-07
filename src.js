"use strict"
$(document).ready(function() {
  var taskID = {
    val  : 1000,
    inc  : function() {
       return ++this.val;
    }
  }
  var taskList = [];

  // Delete task (when is done)
  function delTask(btn, list, id) {
    // Find task index
    var index = $.map(list, function(e, i) {
      if(e.id === parseInt(btn.id)){ return i; }
    });
    // Update task list (remove element from array)
    list.splice(index, 1);
    // Update task list div (remove task's sub-div)
    $(btn).parent().remove();
    // Update status pannel
    showStat(list, id);
  }

  // Edit task list item
  function editTaskListItem(btn, list, id) {
    // Find task index
    var index = $.map(list, function(e, i) {
      if(e.id === parseInt(btn.id)){ return i; }
    });
    var task = list[index];
    // Update task list div (edit mode)
    var span_id = $("<span></span>").
      append("ID_" + task.id + ": ");
    var in_name = $("<input></input>").
      attr({
        "type"      : "text",
        "value"     : task.name,
        "id"        : "" + task.id + "_inEditName",
        "size"      : 32,
        "maxlength" : 32,
        "autofocus" : "",
        "onclick"   : "this.select()"
      });
    var btn_update = $("<button></button>").
      append("Update").
      click(function() {
        // Update task list array
        list[index].name = $("#" + task.id + "_inEditName").val();
        // Update task list div
        $(this).parent().remove();
        $("#divTaskList").prepend(genTaskItem(list[index], list, id));
      });
    $("#" + btn.id).parent().
      empty().
      append(span_id, in_name, btn_update);
  }

  // Generate task list item
  function genTaskItem(task, list, id) {
    var span_id = $("<span></span>").append("ID_" + task.id + ": ");
    var span_name = $("<span></span>").append("" + task.name + " ");
    var btn_edit = $("<button></button>").
      attr("id", "" + task.id + "_btnTaskItemEdit").
      append("Edit").
      click(function() { editTaskListItem(this, list, id); });
    var btn_done = $("<button></button>").
      attr("id", "" + task.id + "_btnTaskItemDone").
      append("Done!").
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
