"use strict"

$(document).ready(function() {
  // *** Add new task pannel
  // Show/Hide pannel
  $("#btnAddNewToggle").click(function(){
    $("#divAddNew").toggle();
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
