var imageName;
var i=3;

$(document).ready(function () {
    $("#wrapper").hide();
    $("#chance").text("RemainingChance:"+i);

    $("#build").click(function () {
        buildingcar();
    });

    $("#jump").click(function () {
        jump();
    });

    $("#run").click(function () {
        runCar();
    });


    function buildingcar() {
        $("#wrapper").show();
        $("#header div").draggable();
        $("#bodyModel").droppable({
            drop: function (event,ui) {
                $(this).append(ui.draggable);
                imageName=ui.draggable.find('img').attr('src');
                if (imageName == "forntmirror.png") {
                    alert("Your Car Is Ready To Run and To Run It Click On -- Run Your Car -- button.");
                }
            }
        });
    }

    function jump() {
        $("#bodyModel").animate().stop();
        $("#bodyModel").animate({ top: "-120px" },{ duration: 500, easing: "easeOutQuad" });
        $("#bodyModel").animate({ top: "+10px" },{ duration: 2000, easing: "easeInQuad" });
    }

    function runCar() {
        $("#header").hide();
        $("#bodyModel").animate({ "marginLeft":"250px"},1000);
        for (var i = 0; i < 100; i++) {
            $("#bomb").animate({ "marginLeft":"-1200px"},4000, function () {
                $("#bomb").hide();
                });
            $("#bomb").animate({ "marginLeft":"0px"},0, function () {
                $("#bomb").show();
            });
        }
    }

    function getPositions() {
        var $box = $("#bodyModel");
        var pos = $box.position();
        var width = $box.width();
        var height = $box.height();
        return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
        console.log(width,height);
    }
        
    function comparePositions(p1, p2) {
        var x1 = p1[0] < p2[0] ? p1 : p2;
        var x2 = p1[0] < p2[0] ? p2 : p1;
        return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;
        console.log(x1,x2);
    }

    function checkCollisions(){
        var box = $(".bomb")[0];
        var pos = getPositions(box);

        var pos2 = getPositions(this);
        var horizontalMatch = comparePositions(pos[0], pos2[0]);
        var verticalMatch = comparePositions(pos[1], pos2[1]);            
        var match = horizontalMatch && verticalMatch;
        if (match) { $("body").append("<p>COLLISION !!!</p>"); }
    }
});