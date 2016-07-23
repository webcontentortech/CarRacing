var imageName;
var AvailableChance=3;
var jumping=false;
var userName="";

$(document).ready(function () {
    $("#lightbox").hide();
    $("#build,#run,#chance,#reset,#user").hide();
    $("#header,#track1,#trackmovable,#track2").hide();
    $("#name").hide();
    $("#run").attr('disabled','disabled');
    $("#chance").text("Available Chance: "+AvailableChance);
    buttonColour();

    $("#build").click(function () {
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
        ifInputIsEmpty();
    });

    $(document).keydown(function(e){
        var key = e.which;
        if (key == "13") {
            userName = $("#userName").val();
        }
        if(key == "38") {
            jumping=true;
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
                    $("#run").removeAttr('disabled');
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
        $("#build").attr('disabled','disabled');
        $("#track1,#track2,#trackmovable").addClass("background-image");
        $("#bodyfull,#backmirror,#1tyre,#2tyre,#headlight,#frontmirror").addClass("bobbing-car-parts");
        $("#1tyre,#2tyre").addClass("spin-car-tyre");  
        $("#bodyModel").animate({ "marginLeft":"250px"},2000);
        for (var i = 0; i < 100; i++) {
            $("#bomb").animate({ "marginLeft":"-600px"},4000,function () {
                if (jumping) {
                    jumping = !jumping;
                }else {
                    alert("CAR CRASHED");
                    collision();
                }
            });
            $("#bomb").animate({ "marginLeft":"0px"},0);      
        }
    }

    function collision() {
        AvailableChance--;
        $("#chance").text("AvailableChance:"+AvailableChance);
        $("#bodyModel").animate({ "marginLeft":"0px"},"fast");
        $("#bodyModel").animate({ "marginLeft":"250px"},500);
        if (AvailableChance==0) {
            alert("YOUR GAME IS OVER and BUILD YOUR CAR AGAIN and RUN IT AGAIN");
            reStart();
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

    function submitUserName() {
        $("#body1,#bomb").hide();
        $("#wrapper").hide();
        $("#build,#run,#chance,#user").show();
        $("#header,#track1,#trackmovable,#track2,#reset").show();
        userName = $("#userName").val();
        $("#user").text("Welcome "+userName+"!");
    }

    function ifInputIsEmpty() {
        if($('#userName').val() == ''){
            alert("Please first enter your name");
        }else {
            submitUserName();
        }
    }

    function reStart() {
        $("#body1").show();
        $("#readyToBuild").show();
        $("#build,#run,#chance,#reset").hide();
        $("#name,#user").hide();
    }
});