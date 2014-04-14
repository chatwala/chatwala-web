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

    if(messageParameter && !(messageParameter === "")) {
        document.getElementById("chatwala_main").style.display = "none";
        document.getElementById("chatwala_app_container").style.display = "block";

		_gaq.push(['_trackEvent', 'REDIRECT', isMobile.Android()? 'ANDROID' : 'IOS']);

       document.getElementById("chatwala_app_container").onclick = function(mouse_event){
            goToAppOrStore(messageParameter);
        };

		//add messageParameter (message_id) to localStorage to retrieve during first app launch
		attemptToStore(messageParameter);

        getMessageThumbnail(messageParameter, function(){
            setTimeout(function(){
                goToAppOrStore(messageParameter);
            },2000)
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

    document.getElementById("bottom_container").style.backgroundImage="url("+request_url+")";

    if(isMobile.Android()) {
        document.getElementById("play_store").style.display = "block";
    }
    else{
        document.getElementById("app_store").style.display = "block";
    }
    callback();
}

function goToAppOrStore(message_id){

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