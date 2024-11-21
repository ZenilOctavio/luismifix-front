/**
 * Checks if the application is running on localhost.
 * 
 * @returns {boolean} True if the application is running on localhost, false otherwise.
 */
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

/**
 * Configuration options for the service worker registration.
 */
interface Config {
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
}

/**
 * Registers a service worker if in production mode.
 *
 * This function checks if the environment is production and if service workers are supported by the browser. 
 * It adds an event listener for the 'load' event to register the service worker.
 *
 * @param {Config} [config] - Optional configuration object for handling updates and success callbacks.
 */
export function register(config?: Config) {
  if (import.meta.env.MODE === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(import.meta.env.BASE_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${import.meta.env.BASE_URL}service-worker.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);

        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
            'worker. To learn more, visit http://bit.ly/CRA-PWA'
          );
        });
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
}

/**
 * Registers a valid service worker.
 *
 * This function registers the service worker at the specified URL and sets up event listeners for updates.
 *
 * @param {string} swUrl - The URL of the service worker file.
 * @param {Config} [config] - Optional configuration object for handling updates and success callbacks.
 */
function registerValidSW(swUrl: string, config?: Config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log(
                'New content is available and will be used when all ' +
                'tabs for this page are closed. See http://bit.ly/CRA-PWA.'
              );

              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log('Content is cached for offline use.');

              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

/**
 * Checks if the service worker at the specified URL is valid.
 *
 * If the service worker is not found or is not a JavaScript file, it unregisters the current service worker and reloads the page.
 *
 * @param {string} swUrl - The URL of the service worker file.
 * @param {Config} [config] - Optional configuration object for handling updates and success callbacks.
 */
function checkValidServiceWorker(swUrl: string, config?: Config) {
  fetch(swUrl)
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
}

/**
 * Unregisters the service worker.
 *
 * This function unregisters the current service worker if supported by the browser.
 */
export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}