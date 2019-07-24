const publicVapidKey =
  "BNkhU-A4_K68clJ3qXdN0CkJjPSqxuI6InnD9P3Bi42V_n3B0f6kHVm42CE0z_NfgLCf64avUveJ6vUtQEbAtwg";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

//Register SW, Register Push, Send Push
const send = async () => {
  //Register service worker
  console.log("Registering service worker..");
  const register = await navigator.serviceWorker.register("./worker.js", {
    scope: "/"
  });
  console.log("Service Worker Registered..");

  //Register push
  console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log("Push Registered");

  //Send to Notification
  console.log("Sending Push ...");
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
  console.log("Push send ...");
};

//Check for serveice worker
if ("serviceWorker" in navigator) {
  send().catch(err => console.error(err));
}
