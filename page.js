//Do work after small pause
setTimeout(function () {
    // get url
    let path = location.host;
    console.log("path ", path)

    chrome.storage.local.get("exclude", function (settings) {

        console.log('settings ', settings)
        if (settings["exclude"].some(word => path.includes(word))) {
            console.log("Match using '" + path + "'");
        } else {
            console.log('content script work, domain: ', location.host)
        }
    });
}, 50); // setTimeout
