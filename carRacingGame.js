var imageName;
var RemainingChance=3;
var jumping=false;

$(document).ready(function () {
    $("#wrapper").hide();
    $("#chance").text("RemainingChance:"+RemainingChance);

    $("#build").click(function () {
        buildingcar();
    });

    $("#jump").click(function () {
        jumping=true;
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
        $("#bodyModel").animate({ "marginLeft":"250px"},2000);
        for (var i = 0; i < 100; i++) {
            $("#bomb").animate({ "marginLeft":"-600px"},4000,function () {
                if (jumping) {
                    jumping = !jumping;
                }else {
                    collision();
                }
            });
            $("#bomb").animate({ "marginLeft":"0px"},0)      
        }
    }

    function collision() {
        alert("CAR CRASHED");
        RemainingChance--;
        $("#chance").text("RemainingChance:"+RemainingChance);
        $("#bodyModel").animate({ "marginLeft":"0px"},"fast");
        $("#bodyModel").animate({ "marginLeft":"250px"},500);
        if (RemainingChance==0) {
            alert("YOUR GAME IS OVER and BUILD YOUR CAR AGAIN and RUN IT AGAIN");
            window.location.href = "index1.html";
        }
    }
});