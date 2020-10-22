/**
 * Possible parameters for request:
 *  action: "xhttp" for a cross-origin HTTP request
 *  method: Default "GET"
 *  url   : required, but not validated
 *  data  : data to send in a POST request
 *
 * The callback function is called upon completion of the request */
chrome.runtime.onMessage.addListener(function (request, sender, callback) {
    if (request.action == "xhttp") {
        var xhttp = new XMLHttpRequest();
        var method = request.method ? request.method.toUpperCase() : 'GET';

        xhttp.onload = function () {
            callback(xhttp.responseText);
        };

        xhttp.onerror = function () {
            // Do whatever you want on error. Don't forget to invoke the
            // callback to clean up the communication port.
            callback();
        };

        xhttp.open(method, request.url, true);

        if (method == 'POST') {
            xhttp.setRequestHeader('Content-Type', 'application/json');
        }

        xhttp.send(request.data);

        return true; // prevents the callback from being called too early on return
    }
});


chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (var key in changes) {
        console.log(changes)
        var storageChange = changes[key];
        console.log('Storage key "%s" in namespace "%s" changed. ' +
            'Old value was "%s", new value is "%s".',
            key,
            namespace,
            storageChange.oldValue,
            storageChange.newValue);
    }
});
