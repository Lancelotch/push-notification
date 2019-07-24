console.log('Service Worker Loaded...');

self.addEventListener('push',event=>{
    const data = event.data.json();
    console.log('push Received...');
    self.registration.showNotification(data.title,{
        body: 'Notified by Candra Darmawan',
        icon: 'https://cdn.dribbble.com/users/182238/screenshots/2383317/lion2.jpg'
    });
})
