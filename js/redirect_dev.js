var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
        }
    };

function messageIdFromURL(){
	var URL = window.location.href;
	var res;
	if(!(URL.indexOf('#') === -1)) {
		res = URL.split("#");
	}
	else if(!(URL.indexOf('?') === -1)) {
	  	res = URL.split("?");
	}
	
	else {
		return undefined;
	}
	
	return res[res.length - 1];
}

function appStoreLink() {
    
	var messageParameter = messageIdFromURL();
	var _gaq = _gaq || [];
	
	/*if ( isMobile.Android() && (messageParameter && !(messageParameter === ""))) {
		_gaq.push(['_trackEvent', 'REDIRECT', 'ANDROID']);

		window.location = "http://www.chatwala.com/dev/droidredirect.html?" + messageParameter;
    }
	else if (isMobile.iOS() && */


        if(messageParameter && !(messageParameter === "")) {

		_gaq.push(['_trackEvent', 'REDIRECT', isMobile.Android()? 'ANDROID' : 'IOS']);

        document.getElementById("main_body").onclick = function(messageParameter){
            goToAppOrStore(messageParameter)
        };

		//add messageParameter (message_id) to localStorage to retrieve during first app launch
		attemptToStore(messageParameter);

        getMessageThumbnail(messageParameter, function(){
            //goToAppOrStore(messageParameter);
        });
	}
};

function attemptToStore(messageParameter){
	try{
		localStorage.firstMessageID_dev = messageParameter;
		
	}catch(e){
		
	}

}


function getMessageThumbnail(message_id, callback){

    var base_url = "http://chatwala-deveast-20.azurewebsites.net/";

    var endpoint = "messages/messageThumbnail?share_id=";

    var request_url = base_url + endpoint + message_id;
    console.log(request_url);
    document.getElementById("bottom_container").style.backgroundImage="url("+request_url+")";

    callback();
}

function goToAppOrStore(message_id){
    console.log("Going to app or store!");
    if(isMobile.Android()) {
        window.location = "http://www.chatwala.com/dev/droidredirect.html?" + message_id;
    }
    else {
        window.location = "chatwala-dev://message/" + message_id;
        setTimeout(function() {
            window.location = "itms-apps://itunes.apple.com/us/app/chatwala-video-messenger/id775982711";
        }, 200);
    }

}