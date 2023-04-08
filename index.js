import { defaultShortcodes as shortcutcodes } from "./default.js";

const defaultShortcodes = Object.entries({ ...shortcutcodes }).map(([key, value]) => ({ [key]: value }));

let tableHtml = "";

const data = document.getElementById("table-data");

defaultShortcodes.forEach((item) => {
  const entriesArray = Object.entries(item);

  for (const [key, value] of entriesArray) {
    // const regex = /^https?:\/\/(?:www\.)?([^.]+)\.com\/?/;

    const regex = /(?<=:\/\/)(?:[^./]+\.)?([^./]+)/;

    const middleName = String(value).match(regex);

    tableHtml += `<tr>
    <td>${key}</td>
      <td style="text-align: left; width: 350px; padding-left: 5rem;">redirects to <a href='${value}'>${middleName[1]}</a> </td>
    </tr>`;
  }

  data.innerHTML = tableHtml;
});
