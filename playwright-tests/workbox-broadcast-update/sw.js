/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

importScripts('/__WORKBOX/buildFile/workbox-core');
importScripts('/__WORKBOX/buildFile/workbox-broadcast-update');
importScripts('/__WORKBOX/buildFile/workbox-routing');
importScripts('/__WORKBOX/buildFile/workbox-strategies');

workbox.routing.registerRoute(
  ({url}) => url.searchParams.has('notifyAllClientsTest'),
  new workbox.strategies.NetworkFirst({
    plugins: [
      new workbox.broadcastUpdate.BroadcastUpdatePlugin({
        notifyAllClients: false,
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  ({url}) => url.pathname === '/__WORKBOX/uniqueETag',
  new workbox.strategies.StaleWhileRevalidate({
    plugins: [new workbox.broadcastUpdate.BroadcastUpdatePlugin()],
  }),
);

workbox.routing.registerRoute(
  ({request}) => request.mode === 'navigate',
  new workbox.strategies.StaleWhileRevalidate({
    plugins: [new workbox.broadcastUpdate.BroadcastUpdatePlugin()],
  }),
);

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());