window.onload = function() {
	if(typeof localStorage.firstMessageID !== 'undefined'){
		var id = localStorage.firstMessageID;
		
		window.location = "chatwala://message/" + id;

	}
	else{
		window.location = "chatwala://"
	}
}
