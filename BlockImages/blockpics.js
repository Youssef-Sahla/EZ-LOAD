var rememberMe = '0'; //random variable
if (rememberMe == '0') {
    chrome.browserAction.setIcon({ // change browser icon.
        path: "images/icon19-disabled.png"
    });
	
	
} 
var changeVariables = function (e) { // function
	

    if (rememberMe == '0') {
        rememberMe = '1';
        chrome.browserAction.setIcon({
            path: "images/icon19.png"
			
        });

    } else {
        chrome.browserAction.setIcon({  // a browswer acton that will change the icon in the chrome toolbar.(ezload logo bijv)
            path: "images/icon19-disabled.png"
        });
        if (rememberMe == '1') {
            chrome.tabs.executeScript({  // voer een script uit.
                file: '/scripts/contentscripts.js'
            });
        }
        rememberMe = '0';
    }
}
chrome.browserAction.onClicked.addListener(function (e) { // when browser action icon gets clicked (ezload logo), run dan deze funtie.


    changeVariables(e) // voer deze functie uit

    if (rememberMe == '1') {
        chrome.tabs.executeScript({
            file: '/scripts/contentscripts.js'
        });
    }

    

});



chrome.webRequest.onBeforeRequest.addListener(function (details) { // used to block pictures or objects. onbefore request (fired when a request is about to occur), webrequest used to analyze traffic.
   
	if (rememberMe == '1') {
        return {
			redirectUrl: "data:image/svg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==" //changes all pictures in website in plain text as a SVG format.		
        };
    }
	
	
}, {
	
    urls: ["http://*/*", "https://*/*"],
    types: ["image", "object"]
}, ["blocking"]);   // all pictures shall be blocked.


chrome.tabs.onUpdated.addListener(function () { //gets fired when a tab gets updated.
	
    if (rememberMe == '1') {
        chrome.tabs.insertCSS(null, { //insert CSS into webpage
            code: "img{visibility: none;}", // picture gets canvas
            runAt: "document_start" //run at document start, when crhome is launched
        });
    }
});  

var EnableViewingPics = function(){
	rememberMe = 1;
        chrome.browserAction.setIcon({
        path: "images/icon19.png"
    });
}

function ReloadImage(info, tab) {
	rememberMe = '0';
        chrome.browserAction.setIcon({
        path: "images/icon19-disabled.png"
    });
    theCode = "var srcUrl ='" + info.srcUrl + "';";
    chrome.tabs.executeScript(null, {
        code: theCode,
        allFrames: true	
    });
   
chrome.tabs.executeScript(null, {
        file: 'inject.js',
        allFrames: true
		
    });	
};

chrome.contextMenus.create({
    title: "Enable Block pics Next Tab",
    "contexts": ["image"],
    "onclick": EnableViewingPics
});
 
var title = "View Images EZload";
var id = chrome.contextMenus.create({
    "title": title,
    "contexts": ["image"],
    "onclick": ReloadImage
});


var toggle = true;
	
function disable_javascript() {
    update_content_settings('javascript', 'block');
	toggle = false;
}

function enable_javascript() {
    update_content_settings('javascript', 'allow');
	toggle = true;
}


function update_content_settings(type, value) {
    chrome.contentSettings[type].set({
        'primaryPattern': '<all_urls>',
        'setting': value,
        'scope': 'regular'
    });
}


var setState = function(){
	
	if(toggle){
		disable_javascript();
	}else{
		enable_javascript();
	}
	chrome.tabs.executeScript({
            file: '/scripts/contentscripts.js'
        });
	
}
    
var contextID = chrome.contextMenus.create({
	
    title: "block javascript",
    "contexts": ['page'],
    onclick: setState,
	
});