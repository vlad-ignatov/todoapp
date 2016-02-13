"use strict"
// ID counter
var taskID = {
    val: 1000,
    getID: function() {return ++this.val;}
};
// Clock
var clock = {
getTime: function(time) {
        var hours = time.getHours();
        if(hours < 10) hours = "0" + hours;
        var minutes = time.getMinutes();
        if(minutes < 10) minutes = "0" + minutes;
        return "" + hours + ":" + minutes;
    }
};
// Backbone model
var Task = Backbone.Model.extend({
    defaults: {
        tid: null,
        name: "",
        updatedAt: ""
    }
});
// Backbone collection
var List = Backbone.Collection.extend({});
var list = new List();
// Just for testing purposes
// var test_task = new Task({name: "Go to the Moon"});
// var test_list = new List([test_task]);
////task_list.create({name: "Go to the Moon"}); // !!! URL
//task_list.add(task);
//console.log(task_list.pluck("name"));
//console.log(task_list.pluck("isUpdated));
//console.log(JSON.stringify(task_list));

// Backbone views
// Backbone view for one item
var TaskView = Backbone.View.extend({
    model: new Task(),
    tagName: "tr",
    initialize: function() {
        this.template = _.template($(".list-template").html());
    },
    events: {
        "click .btn-edit": "edit",
        "click .btn-update": "update",
        "click .btn-done": "done"
    },
    edit: function() {
        $(".btn-edit").hide();
        $(".btn-done").hide();
        this.$(".btn-update").show();
        this.$(".task-name").hide();
        this.$(".in-update-name").show().val(this.$(".task-name").html());
    },
    update: function() {
        this.model.set( {
            name: this.$(".in-update-name").val(),
            updatedAt: clock.getTime(new Date())
        });
    },
    done: function() {
        this.model.destroy();
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});
// Backbone view for all items
var ListView = Backbone.View.extend({
    model: list,
    el: $("#list"),
    initialize: function() {
        this.model.on("add", this.render, this);
        this.model.on("change", this.render, this);
        this.model.on("remove", this.render, this);
    },
    render: function() {
        var keep_this = this;
        this.$el.html("");
        _.each(this.model.toArray(), function(task) {
            keep_this.$el.append((new TaskView({model: task})).render().$el);
        });
        return this; // Not needed in our case...
    }
});
var listView = new ListView();

jQuery(function($) { // $(document).ready(function() {
    // Add button
    $("#btnAddNew").on("click", function() {
        var new_task = new Task({
            tid: taskID.getID(),
            name: $("#inAddNew").val(),
            updatedAt: clock.getTime(new Date())
        });
        $("#inAddNew").val("");
        list.add(new_task);
    });
});
