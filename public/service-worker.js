// service-worker.js

self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    self.skipWaiting(); // Activates the new service worker immediately
});

self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    event.waitUntil(clients.claim()); // Takes control of existing pages
});

self.addEventListener('message', async event => {
    if (event.data.type === 'CHECK_URL_ACCESSIBILITY') {
        const urlToCheck = event.data.url;
        let accessible = false;

        try {
            const response = await fetch(urlToCheck, { mode: 'no-cors' }); // 'no-cors' mode
            // Even with no-cors, a successful fetch indicates network reachability.
            // A redirect (3xx) or an error (4xx, 5xx) would still result in a network error or a non-ok response.
            // The 'no-cors' mode will result in an opaque response, meaning you can't inspect status codes directly,
            // but the fact that the fetch didn't throw an error indicates network availability.

            // To get more precise status codes, you'd need to fetch in 'cors' mode and handle CORS headers on the target server.
            // For a simple "is it accessible?" check, 'no-cors' is often sufficient to determine if a connection can be made.

            // If the fetch completes without throwing an error, we consider it accessible in this context.
            accessible = true;
            console.log(`Fetch for ${urlToCheck} completed. Accessible: ${accessible}`);
        } catch (error) {
            console.error(`Fetch for ${urlToCheck} failed:`, error);
            accessible = false;
        }

        // Send the status back to the main thread
        event.source.postMessage({
            type: 'URL_ACCESSIBILITY_STATUS',
            url: urlToCheck,
            accessible: accessible
        });
    }
});

// Optional: You can also use the fetch event to intercept requests for the *current* site
// and implement more sophisticated checks, but for checking a *provided* external site,
// the message-driven approach with a direct fetch is more suitable.
self.addEventListener('fetch', event => {
    // This fetch listener is primarily for controlling your *own* site's resources.
    // If you wanted to observe all fetches from your page, including those to the targetUrl,
    // you could do it here. However, the 'CHECK_URL_ACCESSIBILITY' message is more targeted
    // for an explicit check.
});