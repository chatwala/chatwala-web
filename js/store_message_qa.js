window.onload = function() {
	if(typeof localStorage.firstMessageID !== 'undefined'){
		var id = localStorage.firstMessageID-qa;
		window.location = "chatwala-qa://message/" + id;
	}
	else{
		window.location = "chatwala-qa://"
	}
}
