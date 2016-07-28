var imageName;
var availableChance = 3;
var isCarJump = false;
var userName = "";
var countDraggedParts = 0;

$(document).ready(function () {
    $("#build,#run,#chance,#reset,#user,#header,#track1,#trackMovable,#track2,#name,#help").hide();
    $("#run").attr('disabled','disabled');
    $("#chance").text("Available Chance: " + availableChance);
    

    $("#build").click(function () {
        $("#build").attr('disabled','disabled');
        buildingcar();
    });

    $("#run").click(function () {
        $("#run").attr('disabled','disabled');
        runCar();
    });

    $("#reset").click(function () {
        reStart();
    });

    $("#readyToBuild").click(function () {
        submitName();
    });

    $("#submit").click(function () {
        ifInputIsEmpty(userName);
    });

    $(document).keydown(function(e){
        var key = e.which;
        if (key == "13") {
            ifInputIsEmpty(userName);
        }
        if(key == "38") {
            jump();
        }
    });

    var buildingcar = function () {
        $("#wrapper").show();
        $("#help").hide();
        $("#header div").draggable();
        $("#bodyModel").droppable({
            drop: function (event,ui) {
                $(this).append(ui.draggable);
                countDraggedParts ++ ;
                if (countDraggedParts == 6) {
                    alert("Your Car Is Ready To Run");
                    $("#run").removeAttr('disabled');
                }
            }
        });
    }

    var jump = function () {
        isCarJump = true;
        $("#bodyModel").animate().stop();
        $("#bodyModel").animate({ top: "-120px" },{ duration: 500, easing: "easeOutQuad" });
        $("#bodyModel").animate({ top: "+10px" },{ duration: 2000, easing: "easeInQuad" });
    }

    var runCar = function () {
        $("#header,#blackBody").hide();
        $("#bomb,#chance").show();
        $("#track1,#track2,#trackMovable").addClass("background-image");
        $("#bodyFull,#backMirror,#headLight,#frontMirror").addClass("bobbing-car-parts");
        $("#1tyre,#2tyre").addClass("spin-car-tyre");  
        $("#bodyModel").animate({ "marginLeft":"250px"},2000);
        bombMovement(); 
    }

    var collision = function () {
        availableChance -- ;
        $("#chance").text("availableChance: " + availableChance);
        $("#bomb").animate({ "marginLeft":"0px"},"fast");
        alert("CAR CRASHED");
        if (availableChance > 0) {
            $("#bodyModel").animate({ "marginLeft":"0px"},"fast");
            $("#bodyModel").animate({ "marginLeft":"250px"},1000);
            setTimeout(function() {
                bombMovement();
            }, 50);
        }
        if (availableChance == 0) {
            alert("YOUR GAME IS OVER and BUILD YOUR CAR AGAIN and RUN IT AGAIN");
            reStart();
        }
    }

    var givingColourToButons = function () {
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

    givingColourToButons();

    var submitName = function () {
        $("#name").show();
        $(".user-name").focus();
        $("#readyToBuild").hide();
    }

    var submitUserName = function (userName) {
        $("#body1,#bomb,#wrapper").hide();
        $("#build,#run,#user,#header,#track1,#trackMovable,#track2,#reset").show();
    }

    var ifInputIsEmpty = function (userName) {
        $("#help").show();
        userName = $("#userName").val();
        if(userName == ''){
            alert("Please first enter your name");
        }else {
            submitUserName();
        }
        $("#user").text("Welcome " + userName + "!");
    }

    var bombMovement = function () {
        $("#bomb").animate({ "marginLeft":"-600px"},4000,function () {
            if (isCarJump) {
                $("#bomb").animate({ "marginLeft":"0px"},0,function () {
                    bombMovement();
                });
                isCarJump = !isCarJump;
            } else{
                collision();
            }
        }); 
    }

    var removeImages = function () {
        $("#bodyFull,#backSideMirror,#tyre1,#tyre2,#light,#frontSideMirror").remove();
        $("#backMirror,#fullBody,#1tyre,#2tyre,#headLight,#frontMirror").remove();
        $("#header").append("<div id='backSideMirror' class='back-side-mirror'><img src='mirror.png' id='backMirror' class='back-mirror'></div>");
        $("#header").append("<div id='bodyFull' class='body-full'><img src='body.svg' id='fullBody' class='full-body'></div>");
        $("#header").append("<div id='tyre1' class='tyre-1'><img src='tyre.png' id='1tyre' class='first-tyre'></div>");
        $("#header").append("<div id='tyre2' class='tyre-2'><img src='tyre.png' id='2tyre' class='second-tyre'></div>");
        $("#header").append("<div id='light' class='light'><img src='headlight.png' id='headLight' class='head-light'></div>");
        $("#header").append("<div id='frontSideMirror' class='front-side-mirror'><img src='frontmirror.png' id='frontMirror' class='front-mirror'></div>");
    }

    var reStart = function () {
        $("#bomb").animate().stop();
        $("#bodyFull,#backMirror,#headLight,#frontMirror").removeClass("bobbing-car-parts");
        $("#1tyre,#2tyre").removeClass("spin-car-tyre");
        $("#track1,#track2,#trackMovable").removeClass("background-image");
        $("#bodyModel").animate({ "marginLeft":"0px"},"fast");
        $("#blackBody,#body1,#readyToBuild").show();
        $("#bomb,#build,#run,#chance,#reset,#name,#user,#help,#header,#track1,#trackMovable,#track2").hide();
        removeImages();
        $("#userName").val('');
        $("#run").attr('disabled','disabled');
        $("#build").removeAttr('disabled');
    }
});