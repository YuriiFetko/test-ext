$(function () {
    let arr = [];
    chrome.tabs.query({currentWindow: true, active: true},
        function (foundTabs) {
            if (foundTabs.length > 0) {
                let regex = /([\w]+\.){1}([\w]+\.?)+/
                let url = foundTabs[0].url.match(regex)[0];
                console.log(url)
                $('#saveExclude').click(function () {
                    arr.push(url)
                    chrome.storage.local.set({"exclude": arr}, function () {
                        console.log('yees')
                        console.log(arr);
                    });
                });

            } else {
                console.log("error with oprion page");
            }
        }
    )
})
