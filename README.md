# Reproducible test case for a cross origin request bug with background service workers in Safari

Adding hosts to `host_permissions` in Manifest V3 or `permissions` in Manifest V2 is supposed to grant access to those origins without cross-origin restrictions, but for Safari web extensions this only works for _background pages/event pages_, not _background service workers_.

## Set up and reproduce the issue
1. Set up an Xcode project for the Safari web extension with `xcrun safari-web-extension-converter src`
2. Run a server on `http://localhost:3000` to serve `cross-origin-content` without CORS enabled, such as `serve -n cross-origin-content` with [serve](https://www.npmjs.com/package/serve).
Alternatively, change the request origin to any page which does not support CORS in both `manifest.json` and `background.js`.
3. In Xcode, build and install the extension in Safari on your Mac.
4. In Safari, open the Web Inspector for the background service worker from the Develop menu > "Web Extension Background Pages" > "Web extension - Service Worker",
5. Click the web extension action in the Safari main window.
6. In the "Web extension - Service Worker" Web Inspector, observe the result of making a request to `http://localhost:3000`

> [Error] Fetch API cannot load http://localhost:3000/ due to access control checks.
>
> [Error] Failed to load resource: Origin safari-web-extension://7688f751-d970-497e-a0ce-aa99c144279b is not allowed by Access-Control-Allow-Origin. Status code: 200 (localhost, line 0)

Note that network requests are not logged in the Network tab in the Web Inspector for service workers, so the issue can only be observed in the console.

## Workarounds

This issue does not affect background pages/event pages, thus it can be worked around by using a background page/event page instead, by changing the background configuration in the manifest to `"scripts": ["background.js"]` instead of `"service_worker": "background.js"`.

Unfortunately this workaround necessitates using different background setups between browsers for MV3 web extensions due to Google Chrome's phasing out of MV2.
