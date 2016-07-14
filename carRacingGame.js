$(document).ready(function () {
    $("#wrapper").hide();
    $("#build").click(function () {
        $("#wrapper").show();
        $('#header img').draggable();
        $('#bodyModel').droppable({
            accept: "#Component1",
            drop: function (event, ui) {
            var draggable = ui.draggable;
            var offset = draggable.offset();
            draggable.appendTo( this ).offset( offset );
    }
});
        // $( function() {
        //     $( "#header img" ).draggable();
        //     $( "#bodyModel" ).droppable({
        //         drop: function( event, ui ) {
        //             $( this ).addClass( "ui-state-highlight" ).html( "Dropped!" );
        //         }
        //     });
        // });
    });
});