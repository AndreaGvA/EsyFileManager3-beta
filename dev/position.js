function pxToNumber(px) {
     $num=Number(px.substr(0 , px.length-2), 10);
     return $num;
  }
  
  function position(element, margin){
  	$fm=new Array();
  	//get the element position
  	$pos=$(element).position();
  	//get the element width
  	$width=Number($(element).width());
  	//get the element height
  	$height=Number($(element).height());
  	//get the element margin left
  	$marginLeft=pxToNumber($(element).css('margin-left'));
  	//get the element margin right
  	$marginRight=pxToNumber($(element).css('margin-right'));
  	//Get the element margin top
  	$marginTop=pxToNumber($(element).css('margin-top'));
  	//get the element margin bottom
  	$maroginBottom=pxToNumber($(element).css('margin-bottom'));
  	//get the element padding left
  	$paddingLeft=pxToNumber($(element).css('padding-left'));
  	//get the element padding right
  	$paddingRight=pxToNumber($(element).css('padding-right'));
  	//Get the element padding top
  	$paddingTop=pxToNumber($(element).css('padding-top'));
  	//get the element padding bottom
  	$paddingBottom=pxToNumber($(element).css('padding-bottom'));
  	//get the right+margin position
  	$left=($pos.left+$marginLeft+$paddingLeft+$paddingRight+$width+margin);
  	//get the window width and height
  	$screenWidth=Number($(window).width());
  	$screenHeight=Number($(window).width());
  	
  	
	//if big window
	//Check if i can position the element on the left
	$rightSpace=$screenWidth-($pos.left+$marginLeft+$paddingLeft+$paddingRight+$width+margin);
	$leftSpace=($pos.left+$marginLeft);
	if($screenWidth>500){
		//debug($pos.left);
		$w=o.width+"px";
		$h=o.height+"px";
		
		if($rightSpace>o.width) {
			//$left=($pos.left+$marginLeft+$paddingLeft+$paddingRight+$width+margin);
			//$top=($pos.top+$marginTop);
			$my="left top";
			$at="right+"+margin+" top";
			$of=$this;
		} else if($leftSpace>o.width) {
			//debug($screenWidth-$pos.left);
			//debug($screenWidth);
			//Check if i can position the element on the right
			$my="right top";
			$at="left-"+margin+" top";
			$of=$this;
			//$left=$pos.left-o.width-margin;
			//$top=($pos.top+$marginTop);
		}
		
		if(o.position.mode!="auto") {
			$my=o.position.my;
			$at=o.position.at
		}
		
	} else {
		//$left=0;
		//$top=0;
		$my="left top";
		$at="left top";
		$of="body";
		$w="100%";
		$h="100%";
	}
	
	
  	//Filemanager top & left position
  	var $fm ={
  		my:$my,
  		at:$at,
  		of:$of,
  		width:$w,
  		height: $h
  	};
  	//Filemanager top & left position
  	return $fm;
  }