$(document).ready(function () {
    $("#wrapper").hide();
    $("#build").click(function () {
        buildingcar();
    });

    function buildingcar() {
        $("#wrapper").show();
        $("#header div").draggable();
        $("#bodyModel").droppable({
            drop: function (event,ui) {
                $(this).append(ui.draggable);
            }
        });
    }

    $("#run").click(function () {
        $("#blackcar").animate({ "marginLeft":"485px"},4000);
        $("#backmirror").animate({ "marginLeft":"485px"},4000);
        $("#upperbody").animate({ "marginLeft":"485px"},4000);
        $("#tire1").animate({ "marginLeft":"485px"},4000);
        $("#tire2").animate({ "marginLeft":"485px"},4000);
        $("#headlight").animate({ "marginLeft":"485px"},4000);
        $("#frontmirror").animate({ "marginLeft":"485px"},4000);
    })

    // function runningcar() {
    //     $("#Modelody").draggable();
    //     $("#bodyModel").droppable({
    //         drop: function (event,ui) {
    //             $(this).append(ui.draggable);
    //         }
    //     });
    // }
});