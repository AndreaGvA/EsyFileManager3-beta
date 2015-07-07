function pxToNumber(px) {
     $num=Number(px.substr(0 , px.length-2), 10);
     return $num;
  }
  
  function position(element, margin){
  	$fm=new Array();
  
  	
  	
	//if big window
	//Check if i can position the element on the left
	
		$my="left top";
		$at="left top";
		$of="body";
		$w="95%";
		$h="95%";
	
	
	
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