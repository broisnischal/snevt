import { defaultShortcodes } from "./default.js";

chrome.omnibox.onInputEntered.addListener((inputText, suggest) => {
  chrome.storage.sync.get(["shortcodes"], (result, suggest) => {
    const userShortcodes = result.shortcodes || {};

    const shortcodes = { ...defaultShortcodes, ...userShortcodes };
    const url = shortcodes[inputText.trim().toLowerCase()] || shortcodes[inputText.trim().toLowerCase().split(" ")[0]];

    if (!!!url) {
      chrome.tabs.update({ url: "https://www.google.com/search?q=" + inputText });
      //   chrome.settingsPrivate.getDefaultSearchProvider((engine) => {
      //     console.log(engine);
      //     // Replace {searchTerms} with the user's input
      //     const searchUrl = engine.searchUrl.replace("", inputText);
      //     console.log(searchUrl);
      //     // Perform the search
      //     chrome.tabs.update({ url: searchUrl });
      //   });
    } else {
      chrome.tabs.update({ url });
    }

    // if (url) {
    // }
    // suggest(suggestions.filter((suggestion) => suggestion.description.includes(inputText)));
  });

  //   const url = shortcodes[inputText.trim().toLowerCase()];
  //   if (url) {
  //     chrome.tabs.update({ url });
  //   }
});

// chrome.omnibox.onInputChanged.addListener((text, suggest) => {
//   // Shortcodes
//   const shortcodes = {
//     yt: "https://www.youtube.com",
//     fb: "https://www.facebook.com",
//     tw: "https://www.twitter.com",
//     ig: "https://www.instagram.com",
//   };

//   // Convert shortcodes object to array of objects
//   const shortcodeSuggestions = Object.entries(shortcodes).reduce(
//     (acc, [key, value]) => [...acc, { content: value, description: `Go to ${key}` }],
//     []
//   );

//   // Combine all suggestions
//   const allSuggestions = [...shortcodeSuggestions];

//   const url = shortcodes[inputText.trim().toLowerCase()];
//   if (url) {
//     chrome.tabs.update({ url });
//   }

//   // Return suggestions
//   suggest(allSuggestions.filter((suggestion) => suggestion.description.includes(text)));
// });

// //fires when select option and press enter
// chrome.omnibox.onInputEntered.addListener(function (text) {
//   chrome.tabs.update({ url });
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "saveShortcode") {
    const { shortcode, url } = message.payload;

    // Get existing user-defined shortcodes from storage
    chrome.storage.sync.get(["shortcodes"], (result) => {
      const userShortcodes = result.shortcodes || {};

      // Add new shortcode to user-defined shortcodes and store it
      chrome.storage.sync.set({
        shortcodes: { ...userShortcodes, [shortcode]: url },
      });
    });
  }
});

chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
  chrome.storage.sync.get(["shortcodes"], (result) => {
    const userShortcodes = result.shortcodes || {};

    const shortcodes = { ...defaultShortcodes, ...userShortcodes };

    const suggestions = Object.entries(shortcodes).reduce(
      (acc, [key, value]) => [...acc, { deletable: true, content: `${key} ${value}`, description: `Proceed to ${value} with code - ${key}` }],
      []
    );

    suggest(suggestions.filter((suggestion) => suggestion.description.includes(text.toLowerCase())));
    // suggest(suggestions.filter((suggestion) => suggestion.description.includes(inputText)));
  });
});

chrome.omnibox.onInputEntered.addListener(function (text) {
  const key = String(text).split(" ")[0];
  chrome.tabs.update({ url: key });
  //   chrome.tabs.update({ url: text });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  //   if (changeInfo.status === "complete") {
  //     chrome.omnibox.setDefaultSuggestion({ description: "" });
  //   }
});

// (tab) => {
//     // Inject a content script to unselect the URL after the tab is created
//     chrome.tabs.executeScript(tab.id, {
//       code: `
//             const el = document.activeElement;
//             if (el instanceof HTMLElement && el.blur) {
//               el.blur();
//             }
//           `,
//     });
//   };

// Add a message listener that responds to the "open-extension" message
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "open-extension") {
//     // Open the extension functionality
//     chrome.tabs.create({ url: "index.html" });
//   }
// });

// chrome.action.onClicked.addListener(() => {
//   chrome.tabs.create({ url: chrome.runtime.getURL("help.html") });
// });
