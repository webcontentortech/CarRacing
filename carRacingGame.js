var imageName;
var AvailableChance=3;
var isCarJump=false;
var userName="";

var carDragableParts = {"backMirror": { isDragable: true, mainId: "backSideMirror", mainClass: "back-side-mirror", imageSrc: "mirror.png", imageId: "backMirror", imageClass: "back-mirror" },"frontMirror": { isDragable: true, mainId: "frontSideMirror", mainClass: "front-side-mirror", imageSrc: "frontmirror.png", imageId: "frontMirror", imageClass: "front-mirror" },"bodyFull": { isDragable: true, mainId: "bodyFull", mainClass: "body-full", imageSrc: "body.svg", imageId: "fullBody", imageClass: "full-body" },"tyre1": { isDragable: true, mainId: "tyre1", mainClass: "tyre-1", imageSrc: "tyre.png", imageId: "1tyre", imageClass: "first-tyre" },"tyre2": { isDragable: true, mainId: "tyre2", mainClass: "tyre-2", imageSrc: "tyre.png", imageId: "2tyre", imageClass: "second-tyre" },"light": { isDragable: true, mainId: "light", mainClass: "light", imageSrc: "headlight.png", imageId: "headLight", imageClass: "head-light" }}
$(document).ready(function () {
    $("#build,#run,#chance,#reset,#user,#header,#track1,#trackMovable,#track2,#name").hide();
    $("#run").attr('disabled','disabled');
    $("#chance").text("Available Chance: "+AvailableChance);
    buttonColour();

    $("#build").click(function () {
        $("#build").attr('disabled','disabled');
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
            isCarJump=true;
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
                if (imageName == "frontmirror.png") {
                    alert("Your Car Is Ready To Run");
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
        $("#track1,#track2,#trackMovable").addClass("background-image");
        $("#bodyFull,#backMirror,#headLight,#frontMirror").addClass("bobbing-car-parts");
        $("#1tyre,#2tyre").addClass("spin-car-tyre");  
        $("#bodyModel").animate({ "marginLeft":"250px"},2000);
        bombMovement(); 
    }

    function collision() {
        alert("CAR CRASHED");
        AvailableChance--;
        console.log("CAR CRASHED after alert");
        $("#chance").text("AvailableChance: "+ AvailableChance);
        $("#bodyModel").animate({ "marginLeft":"0px"},"fast");
        $("#bodyModel").animate({ "marginLeft":"250px"},500);
        if (AvailableChance == 0) {
            alert("YOUR GAME IS OVER and BUILD YOUR CAR AGAIN and RUN IT AGAIN");
            reStart();
        }
         bombMovement();
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
            if (isCarJump) {
                $("#bomb").animate({ "marginLeft":"0px"},0,function () {
                    bombMovement();
                });
                isCarJump = !isCarJump;
            } else{
                $("#bomb").animate({ "marginLeft":"0px"},0,function () {
                    collision();
                });
            }
        }); 
    }

    function removeImages() {
        $("#bodyFull,#backSideMirror,#tyre1,#tyre2,#light,#frontSideMirror").remove();
        $("#backMirror,#fullBody,#1tyre,#2tyre,#headLight,#frontMirror").remove();
        $("#header").append("<div id='backSideMirror' class='back-side-mirror'><img src='mirror.png' id='backMirror' class='back-mirror'></div>");
        $("#header").append("<div id='bodyFull' class='body-full'><img src='body.svg' id='fullBody' class='full-body'></div>");
        $("#header").append("<div id='tyre1' class='tyre-1'><img src='tyre.png' id='1tyre' class='first-tyre'></div>");
        $("#header").append("<div id='tyre2' class='tyre-2'><img src='tyre.png' id='2tyre' class='second-tyre'></div>");
        $("#header").append("<div id='light' class='light'><img src='headlight.png' id='headLight' class='head-light'></div>");
        $("#header").append("<div id='frontSideMirror' class='front-side-mirror'><img src='frontmirror.png' id='frontMirror' class='front-mirror'></div>");
    }

    function reStart() {
        $("#bomb").animate().stop();
        $("#bodyFull,#backMirror,#headLight,#frontMirror").removeClass("bobbing-car-parts");
        $("#1tyre,#2tyre").removeClass("spin-car-tyre");
        $("#track1,#track2,#trackMovable").removeClass("background-image");
        $("#bodyModel").animate({ "marginLeft":"0px"},"fast");
        $("#header,#blackBody,#body1,#readyToBuild").show();
        $("#bomb,#build,#run,#chance,#reset,#name,#user").hide();
        removeImages();
        $('#userName').val('');
        $("#build,#run,#chance,#reset,#name,#user").hide();
        $("#run").attr('disabled','disabled');
        $("#build").removeAttr('disabled');
    }
});