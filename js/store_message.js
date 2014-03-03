
if(typeof localStorage.firstMessageID !== 'undefined'){
	var id = localStorage.firstMessageID;
	localStorage.removeItem(firstMessageID);
	
	window.location = "chatwala://message/" + id;

}
else{
	window.location = "chatwala://message/"
}
