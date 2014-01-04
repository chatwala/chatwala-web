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
	
	else {
		return undefined;
	}
	
	return res[res.length - 1];
}

function appStoreLink() {
	var messageParameter = messageIdFromURL();
	var _gaq = _gaq || [];
	
	if ( isMobile.Android() && (messageParameter && !(messageParameter === ""))) {
		_gaq.push(['_trackEvent', 'REDIRECT', 'ANDROID']);
		window.location = "market://details?id=com.chatwala.chatwala&message=" + messageParameter;			
    }
	else if (isMobile.iOS() && (messageParameter && !(messageParameter === ""))) {
		_gaq.push(['_trackEvent', 'REDIRECT', 'IOS']);	
		setTimeout(function() {
  			window.location = "http://itunes.apple.com/us/app/youtube/id544007664?mt=8";
		}, 10);
		
		window.location = "chatwala://message/" + messageParameter;
	}
	else {} // Don't do anything here - let them sit on the homepage
};