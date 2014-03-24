window.onload = function() {
	if(typeof localStorage.firstMessageID_qa !== 'undefined'){
		var id = localStorage.firstMessageID_qa;
		window.location = "chatwala-qa://message/" + id;
	}
	else{
		window.location = "chatwala-qa://"
	}
}
