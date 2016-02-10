"use strict"
jQuery(function($) {
    // $(document).ready(function() {
    var taskID = {
        val  : 1000,
        inc  : function() {
            return ++this.val;
        }
    }
    var taskList = [];

    // Delete task (when is done)
    function delTask(btn, list, tid) {
        // Find task index
        var index = $.map(list, function(e, i) {
            if(e.id === parseInt(btn.id.slice(3))) { return i; }
        });
        // Update task list (remove element from array)
        list.splice(index, 1);
        // Update task list div (remove task's sub-div)
        $(btn).parent().remove();
        // Update status pannel
        showStat(list, tid);
    }

    // Edit task list item
    function editTaskListItem(btn, list, idc) {
        // Find task index
        var index = $.map(list, function(e, i) {
            if(e.id === parseInt(btn.id.slice(3))) { return i; }
        });
        var task = list[index];
        // Update task list div (edit mode)
        var span_id = $("<span/>").
            attr("class", "w3-margin-2").
            append("ID_" + task.id);
        var in_name = $("<input/>").
            attr({
                id        : "id_" + task.id + "_inEditName",
                type      : "text",
                value     : task.name,
                autofocus : "",
                onclick   : "this.select()",
                class     : "w3-large"
            });
        var btn_update = $("<button/>").
            attr("class", "w3-btn w3-light-grey w3-margin-2"). 
            append("Update").
            click(function() {
                // Update task list array
                list[index].name = $("#id_" + task.id + "_inEditName").val();
                // Update task list div
                $(this).parent().remove();
                $("#divTaskList").prepend(genTaskItem(list[index], list, idc));
            });
        $("#" + btn.id).parent().
            empty().
            append(span_id, in_name, btn_update);
    }

    // Generate task list item
    function genTaskItem(task, list, idc) {
        var span_id = $("<span/>").
            attr("class", "w3-margin-2").
            append("ID_" + task.id);
        var span_name = $("<span/>").
            attr("class", "w3-margin-2").
            append("" + task.name + " ");
        var btn_edit = $("<button/>").
            attr({
                id    : "id_" + task.id + "_btnTaskItemEdit",
                class : "w3-btn w3-light-grey"
            }).
            append("Edit").
            click(function() { editTaskListItem(this, list, idc); });
        var btn_done = $("<button/>").
            attr({
                id    : "id_" + task.id + "_btnTaskItemDone",
                class : "w3-btn w3-light-grey"
            }).
            append("Done!").
            click(function() { delTask(this, list, idc); });
        return $("<div/>").
            attr("class", "w3-margin-2").
            append(btn_done, span_id, btn_edit, span_name);
    }

    // Show stat
    function showStat(list, idc) {
        var span_last_id = $("<span/>").
            append("Last ID: " + idc.val + "; ");
        var span_task_num = $("<span/>").
            append("Tasks: " + list.length + "; ");
        $("#divStatus").
            empty().
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
            // Reset input field
            $("#inAddNewName").val("");
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
