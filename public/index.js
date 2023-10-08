window.addEventListener('DOMContentLoaded', function () {
    var backgroundImageElement = document.getElementById('game');
    var imageLinks = [
        'https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8SGludGVyZ3J1bmRiaWxkJTIwZiVDMyVCQ3IlMjBCcmVha291dCUyMGdhbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fEhpbnRlcmdydW5kYmlsZCUyMGYlQzMlQkNyJTIwQnJlYWtvdXQlMjBnYW1lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1603556710145-b672ddfb6090?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OXx6M3JTMzNtWV96c3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&w=600'
    ];

    var randomIndex = Math.floor(Math.random() * imageLinks.length);
    var randomImage = imageLinks[randomIndex];
    backgroundImageElement.style.backgroundImage = 'url("' + randomImage + '")';
});
