async function doFetch() {
  try {
    const res = await fetch("http://localhost:3000/");
    console.log(`${res.status} ${res.statusText}\n${await res.text()}`);
  } catch (e) {
    console.error(e);
  }
}

chrome.action.onClicked.addListener(doFetch);
