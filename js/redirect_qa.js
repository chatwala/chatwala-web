var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
    }
};

function messageIdFromURL() {
    var URL = window.location.href;
    var res;
    if (!(URL.indexOf('#') === -1)) {
        res = URL.split("#");
    }
    else if (!(URL.indexOf('?') === -1)) {
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

    if ((isMobile.Android() || isMobile.iOS()) && messageParameter && !(messageParameter === "")) {


        _gaq.push(['_trackEvent', 'REDIRECT', isMobile.Android() ? 'ANDROID' : 'IOS']);

        //if the app is already installed bring them directly into it on iOS
        if(isMobile.iOS() && ((typeof localStorage.hasApp !== 'undefined' && localStorage.hasApp === 'true') || typeof localStorage.firstMessageID_qa !== 'undefined')){
            window.location = "chatwala-qa://message/" + messageParameter;
            return;
        }

        //make the whole screen clickable
        document.getElementById("chatwala_app_container").onclick = function (mouse_event) {
            goToAppOrStore(messageParameter);
        };

        //add messageParameter (message_id) to localStorage to retrieve during first app launch
        attemptToStore(messageParameter);

        getMessageThumbnail(messageParameter, function () {
            setTimeout(function () {
                goToAppOrStore(messageParameter);
            }, 5000)
        });
    }
    else {
        document.getElementById("chatwala_main").style.display = "block";
        document.getElementById("chatwala_app_container").style.display = "none";
    }
};

function attemptToStore(messageParameter) {
    try {
        localStorage.firstMessageID_qa = messageParameter;

    } catch (e) {

    }
}

function getMessageThumbnail(message_id, callback) {

    //select which store icon to display depending on device
    if (isMobile.Android()) {
        document.getElementById("play_store").style.display = "block";
    }
    else {
        document.getElementById("app_store").style.display = "block";
    }


    var base_url = "http://chatwala-qa-20.azurewebsites.net/";
    var endpoint = "messages/messageThumbnail?share_id=";
    var request_url = base_url + endpoint + message_id;
    var btm_container = document.getElementById("bottom_container");
    var w = 0;
    var h = 0;

    var check_image = new Image();

    check_image.onerror = function(){
        btm_container.style.backgroundImage = "url(http://chatwala.com/images/logo_landing.gif)";
        btm_container.style.backgroundSize = "70%";
        goToAppOrStore(message_id);

    }

    check_image.onload = function () {
        w = this.width;
        h = this.height;

        btm_container.style.backgroundImage = "url(" + request_url + ")";

        if ((w / h) > 1) {
            //android
            btm_container.style.zoom = 0.7;
            btm_container.style.backgroundSize = "cover";
        }
        else {
            //iOS
            btm_container.style.backgroundSize = "100%";
        }
        callback();

    }

    check_image.src = request_url;
}

function goToAppOrStore(message_id) {

    if (isMobile.Android()) {
        window.location = "http://www.chatwala.com/qa/droidredirect.html?" + message_id;
    }
    else {
        window.location = "chatwala-qa://message/" + message_id;
        setTimeout(function () {
            window.location = "itms-apps://itunes.apple.com/us/app/chatwala-video-messenger/id775982711";
        }, 200);
    }

}