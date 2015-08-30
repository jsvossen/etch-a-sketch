var gridCols;
var gridRows;

function drawGrid( cols, rows ) {

	gridCols = cols;
	gridRows = rows;

	var totWidth = $("#canvas").width();

	var cellSize = totWidth / gridCols;
	var numCells = gridCols * gridRows;

	for ( var i = 0; i < numCells; i++ ) {
		var col = i % gridCols + 1;
		var row = Math.floor( i/gridCols + 1 );
		$("#canvas .container").append('<div class="cell" id="cell-'+col+'-'+row+'"><div></div></div>');
	}
	$(".cell").css({
	    "width": cellSize+"px",
		"height": cellSize+"px"
	});

	if ($("input#ctrl-mouse").prop('checked')) {
	 	enableMouse();
	 } else {
	 	$("body").off( "keydown" );
	  	enableKeys();
	 }

}

function clearGrid() {
	$(".cell").css({ "background-color":"white"});
}


function defineGrid() {
	var gridX = prompt("Grid Width:");

	if( gridX != null && gridX != "" & gridX != 0) {
		var gridY = prompt("Grid Height:");
	}

	if( gridY != null && gridY != "" && gridY != 0 ) {
		$("#canvas .container").empty();
		drawGrid(gridX,gridY);
	}

}

function enableMouse() {
	$("body").off( "keydown" );

	$(".cell.active").removeClass("active");

	$(".cell").hover(function(){
		$(this).css({ "background-color":"black"});
	});
}

function enableKeys() {

	$(".cell").off("mouseenter mouseleave");

	var midX = Math.floor(gridCols/2);
	var midY = Math.floor(gridRows/2);
	$("#cell-"+midX+"-"+midY).addClass("active");

	$("body").keydown(function(event) {

		var key = event.keyCode;
		var active = $(".cell.active").attr("id").match(/^cell-(\d+)-(\d+)$/);
	
		switch (key) {
			case 37: //left
				console.log( active[1] +" > 1", parseInt(active[1]) > 1 );
				if( parseInt(active[1]) > 1 ){
					console.log("left to "+"#cell-"+(parseInt(active[1])-1)+"-"+active[2]);
					$(".cell.active").css({"background-color":"black"}).removeClass("active");
					$("#cell-"+(parseInt(active[1])-1)+"-"+active[2]).addClass("active");
				}
				break;
			case 38: //up
				console.log( active[2] +" > 1", parseInt(active[2]) > 1 );
				if( parseInt(active[2]) > 1 ){
					console.log("up to "+"#cell-"+active[1]+"-"+(parseInt(active[2])-1));
					$(".cell.active").css({"background-color":"black"}).removeClass("active");
					$("#cell-"+active[1]+"-"+(parseInt(active[2])-1)).addClass("active");
				}
				break;
			case 39: //right
				console.log( active[1] +" < "+ gridCols, parseInt(active[1]) < gridCols );
				if( parseInt(active[1]) < gridCols ){
					console.log("right to "+"#cell-"+(parseInt(active[1])+1)+"-"+active[2]);
					$(".cell.active").css({"background-color":"black"}).removeClass("active");
					$("#cell-"+(parseInt(active[1])+1)+"-"+active[2]).addClass("active");
				}
				break;
			case 40: //down
				console.log( active[2] +" < "+ gridRows, parseInt(active[2]) < gridRows );
				if( parseInt(active[2]) < gridRows ){
					console.log("down to "+"#cell-"+active[1]+"-"+(parseInt(active[2])+1));
					$(".cell.active").css({"background-color":"black"}).removeClass("active");
					$("#cell-"+active[1]+"-"+(parseInt(active[2])+1)).addClass("active");
				}
				break;
		}

	});
}


function gridInit() {

	drawGrid(64,32);
	$("input[name='controls']").change(function(e){
		console.log($(this).val());
		if ( $(this).val() == "mouse") {
			enableMouse();
		} else {
			enableKeys();
		}
		$(e.target).blur();
	});

}
