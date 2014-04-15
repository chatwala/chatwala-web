window.onload = function() {
    try{
        localStorage.hasApp = 'true';
    }
    catch(e){}

	if(typeof localStorage.firstMessageID_qa !== 'undefined'){
		var id = localStorage.firstMessageID_qa;
		window.location = "chatwala-qa://message/" + id;
	}
	else{
		window.location = "chatwala-qa://"
	}
}
