window.onload = function() {
    try{
        localStorage.hasApp = 'true';
    }
    catch(e){}

	if(typeof localStorage.firstMessageID_dev !== 'undefined'){
		var id = localStorage.firstMessageID_dev;
	    window.location = "chatwala-dev://message/" + id;
	}
	else{
		window.location = "chatwala-dev://"
	}
}
