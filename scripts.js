$(document).ready(function(){$("#ball").hide()})

var app = angular.module("field",[]);
app.controller("play",function($scope){
	document.onkeydown = function(){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		var action = false;
		if (keycode === 16){
			if (action === false){
				send_receiver();
				action = true;
			}
		};
		if (keycode === 13){
			throw_ball()
		};
		if (keycode === 109){
			location.reload();
		}
	};
});

function send_receiver(){
	var speed = Math.random() + 2.5;
	if (speed < 2.85){
		$("#hike").css("color","red")
	} else if (speed > 3.12){
		$("#hike").css("color","green")
	} else {
		$("#hike").css("color","yellow")		
	};
	$("#receiver").css("left","25px");
	$("#hike").fadeIn(150);
	$("#hike").delay(150).fadeOut(850);
	var z = 25;
	var sickle = setInterval(function(){
		$("#receiver").css("left",z + "px");

		var ball = parseInt($("#ball").css("left"));
		var hgt = parseInt($("#ball").css("bottom"));

		z += speed;

		if (z > 4000){
			clearInterval(sickle)
		}

	},1)
}


function throw_ball(){
	$("#qb").attr("src","images/qb_1.jpg");
	setTimeout(function(){$("#qb").attr("src","images/qb_2.jpg");},65);
	setTimeout(function(){$("#qb").attr("src","images/qb_3.jpg");ball_path()},350);
	setTimeout(function(){$("#qb").attr("src","images/qb_4.JPG");},360);
}

function ball_path(){
	$("#ball").show();
	var x = 15;
	var y = $("#ball").height();
	var half = $(window).width() * 0.35;
	var caught = false;
	var cycle = setInterval(function(){

		if (caught == false){
			$("#ball").css("left",x + "px");
			y = 500 - Math.pow((.015 * x - 22.1),2) + ($("#qb").height() * 0.85);
			$("#ball").css("bottom",y + "px");

			if (y <5){
				clearInterval(cycle)
			}

			if (x > $(window).width()){
				$("#viewport").css("left", 0 - .7 * x + "px");
			}

			var rec = parseInt($("#receiver").css("left")) + 25;

			if ((y < 35) && (y > 10) && (x > rec) && (x < rec + 40)){
				caught = true;
				$("#alert").css("background-color","#66ff99");
				$("#alert").empty().html("TOUCHDOWN! Nice throw!").fadeIn(250);
			}

			if (y < 6){
				$("#alert").css("background-color","#993333");
				$("#alert").empty().html("INCOMPLETE").fadeIn(250);
				clearInterval(cycle);
			}
		} else {
			var recspot = parseInt($("#receiver").css("left")) + 20;
			$("#ball").css("bottom","7.5%");
			$("#ball").css("left",recspot + "px");
		}


		x += 5;

	},1);
}
