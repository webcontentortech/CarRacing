var imageName;
var AvailableChance=3;
var jumping=false;
var userName="";

var carDragableParts = {frontMirror: { isDragable: true, id: "frontSideMirror" },backMirror: { isDragable: true, id: "backSideMirror" },bodyFull: { isDragable: true, id: "bodyFull" },tyre1: { isDragable: true, id: "tyre1" },tyre2: { isDragable: true, id: "tyre2" },light: { isDragable: true, id: "light" }}
$(document).ready(function () {
    $("#build,#run,#chance,#reset,#user,#header,#track1,#trackMovable,#track2,#name").hide();
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
        userName = $("#userName").val();
        ifInputIsEmpty();
    });

    $(document).keydown(function(e){
        var key = e.which;
        if (key == "13") {
            userName = $("#userName").val();
            ifInputIsEmpty();
        }
        if(key == "38") {
            jumping=true;
            jump();
        }
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
        $("#header,#blackBody").hide();
        $("#bomb").show();
        $("#build").attr('disabled','disabled');
        $("#track1,#track2,#trackMovable").addClass("background-image");
        $("#bodyFull,#backMirror,#headLight,#frontMirror").addClass("bobbing-car-parts");
        $("#1tyre,#2tyre").addClass("spin-car-tyre");  
        $("#bodyModel").animate({ "marginLeft":"250px"},2000);
        setInterval(bombMovement, 0); 
    }

    function collision() {
        alert("CAR CRASHED");
        AvailableChance--;
        $("#chance").text("AvailableChance: "+ AvailableChance);
        $("#bodyModel").animate({ "marginLeft":"0px"},"fast");
        $("#bodyModel").animate({ "marginLeft":"250px"},500);
        if (AvailableChance == 0) {
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
        $("#body1,#bomb,#wrapper").hide();
        $("#build,#run,#chance,#user,#header,#track1,#trackMovable,#track2,#reset").show();
        $("#user").text("Welcome "+userName+"!");
        console.log(userName)
    }

    function ifInputIsEmpty() {
        if($('#userName').val() == ''){
            alert("Please first enter your name");
        }else {
            submitUserName();
        }
    }

    function bombMovement() {
        $("#bomb").animate({ "marginLeft":"-600px"},4000,function () {
            if (jumping) {
                jumping = !jumping;
            }else {
                collision();                }
        });
        $("#bomb").animate({ "marginLeft":"0px"},0);
    }

    function reStart() {
        $("#bodyFull,#backMirror,#headLight,#frontMirror").removeClass("bobbing-car-parts");
        $("#1tyre,#2tyre").removeClass("spin-car-tyre");
        $("#track1,#track2,#trackMovable").removeClass("background-image");
        $("#bodyModel").animate({ "marginLeft":"0px"},"fast");
        $("#header,#blackBody").show();
        $("#bomb").hide();
        for (var i = 0; i < 100; i++) {
            $("#bomb").animate().stop();
        }

        
        $.each( carDragableParts, function( key, value ) {
            console.log( key + ": " + value );
            console.log(key.id)
        });
        //$('#userName').val() == ('');
        // $("#body1,#readyToBuild").show();
        // $("#build,#run,#chance,#reset,#name,#user").hide();
        // $("#run").attr('disabled','disabled');
        // $("#build").removeAttr('disabled');
    }
});