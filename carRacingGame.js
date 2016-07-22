var imageName;
var RemainingChance=3;
var jumping=false;
var userName="";

$(document).ready(function () {
    $("#lightbox").hide();
    $("#build,#run,#chance,#reset,#user").hide();
    $("#header,#track1,#trackmovable,#track2").hide();
    $("#name").hide();
    $("#run").attr('disabled','disabled');
    $("#chance").text("RemainingChance:"+RemainingChance);
    buttonColour();

    $("#build").click(function () {
        $("#run").removeAttr('disabled');
        buildingcar();
    });

    $("#run").click(function () {
        runCar();
    });

    $("#reset").click(function () {
        reStart();
    });

    $("#readyToBuild").click(function () {
        submitName();
    });

    $("#submit").click(function () {
        if($('#userName').val() == ''){
            console.log("hii");
            alert("Please first enter your name");
            console.log("hii");       
        }else {
            submitUserName();
        }
    });

    $(document).keydown(function(e){
        jumping=true;
        var key = e.which;
        if (key == "13") {
            userName = $("#userName").val();
            console.log(userName);
        }
        if(key == "38") {
            jump();
        }
    });

    function buildingcar() {
        console.log("hii")
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
        $("#blackbody").hide();
        $("#bomb").show();
        $("#track1,#track2,#trackmovable").addClass("background-image");
        $("#backSideMirror,#bodyfull,#light,#frontSideMirror").addClass("bobbing-car-parts");
        $("#1tyre,#2tyre").addClass("spin-car-tyre");  
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
        }
    }

    function buttonColour() {
        $("#readyToBuild,#submit").mouseover(function() {
            $("#readyToBuild,#submit").addClass("bgcolour");
        });
        $("#build").mouseover(function() {
            $("#build").addClass("bgcolour");
        });
        $("#run").mouseover(function() {
            $("#run").addClass("bgcolour");
        });
        $("#reset").mouseover(function() {
            $("#reset").addClass("bgcolour");
        });
        $("#readyToBuild,#submit,#build,#run,#reset").mouseout(function() {
            $("#readyToBuild,#submit,#build,#run,#reset").removeClass("bgcolour");
        });
    }

    function submitName() {
        $("#name").show();
        $("#readyToBuild").hide();
    }

    function submitUserName(argument) {
        $("#body1,#bomb").hide();
        $("#wrapper").hide();
        $("#build,#run,#chance,#user").show();
        $("#header,#track1,#trackmovable,#track2,#reset").show();
        userName = $("#userName").val();
        $("#user").text("Welcome "+userName+ " To The Game");
    }

    function reStart() {
        $("#body1").show();
        $("#readyToBuild").show();
        $("#build,#run,#chance,#reset").hide();
        $("#name").hide();
        runCar().stop();
        collision().stop();
        alert().stop();
    }
});