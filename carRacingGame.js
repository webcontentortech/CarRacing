$(document).ready(function () {
    $("#wrapper").hide();
    $("#build").click(function () {
        $("#wrapper").show();
        $('#header img').draggable();
        $('#bodyModel').droppable({
            accept: "#Component1",
            drop: function (event) {
                var draggable = ui.draggable;
                var offset = draggable.offset();
                draggable.appendTo( this ).offset( offset );
            }
        });
    });
});