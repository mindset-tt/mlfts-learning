$(document).ready(() => {
    const count = 10;
    const apiKey = 'dvxQIG-y8d8qgLK7-nu4mJQ1UQx3yKzOn1e0ddM6ZvA';
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
    //const apiUrl = `https://picsum.photos/v2/list?page=1&limit=1000`;
    const imageContainer = $('#img-container');
    let photoArrays = [];

    const getPhotos = async () => {
        try {
            $.ajax({
                url: apiUrl,
                method: 'GET',
                success: (data) => {
                    photoArrays = data;
                    displayImage();
                },
                error: (error) => {
                    console.log(error);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    const displayImage = () => {
        photoArrays.forEach((photo) => {
            const item = $(`<a href="${photo.links.html}" target="_self"></a>`);
            const img = $(`<img src="${photo.urls.regular}" title="${photo.alt_description}" alt="${photo.alt_description}">`);
            item.append(img);
            imageContainer.append(item);
        });
    }

    getPhotos();

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            getPhotos();
        }
    });
});

