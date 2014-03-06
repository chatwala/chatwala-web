window.onload = function() {
	if(typeof localStorage.firstMessageID !== 'undefined'){
		var id = localStorage.firstMessageID-sandbox;
		window.location = "chatwala-sandbox://message/" + id;
	}
	else{
		window.location = "chatwala-sandbox://"
	}
}
