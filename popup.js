// popup.js
document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-button");
  const error = document.getElementById("error");

  function addShortcode() {
    const shortcodeInput = document.getElementById("shortcode-input");
    const urlInput = document.getElementById("url-input");
    const shortcode = shortcodeInput.value.trim().toLowerCase();
    const url = urlInput.value.trim();
    if (shortcode && url) {
      // Send message to background script to save the shortcode

      if (
        !String(url).match(
          /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i
        )
      ) {
        return (error.innerHTML = "Please submit valid URL");
      }
      chrome.runtime.sendMessage({
        type: "saveShortcode",
        payload: {
          shortcode: shortcode,
          url: url,
        },
      });

      // Clear inputs and show success message
      shortcodeInput.value = "";
      urlInput.value = "";
      console.log("Shortcode added successfully!");
    } else {
      error.innerHTML = "Please enter both shortcode and URL";
      setTimeout(() => (error.innerHTML = ""), 2000);
    }
  }

  addButton?.addEventListener("click", addShortcode);

  const helpButton = document.getElementById("help-button");
  helpButton.addEventListener("click", () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
  });
});
