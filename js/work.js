
// change theme to the website
const tagNames = document.getElementsByTagName("html")[0];
tagNames.setAttribute("data-theme", "light");

//  create fetch categories 
const loadbuttonFetch = () => {
    // catch the button fetch 
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => ShowAllButtons(data.categories))
        .catch(error => console.error(error))
}

//  create a dynamic button in center position

const ShowAllButtons = (buttons) => {
    // catch the button field 
    const buttonField = document.getElementById('showButtons');
    buttons.forEach(ele => {
        // create the button 
        const buttonItems = document.createElement('div')
        buttonItems.innerHTML = `<button class="btn font-bold">${ele.category}</button>`;
        // add button to the container 
        buttonField.append(buttonItems)
    });
}



// create video feath function 
const loadVideoFeatch = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => ShowAllVideos(data.videos))
        .catch(error => console.log(error))
}

const ShowAllVideos = (videos) => {
    const videosField = document.getElementById('videos-Container');

    videos.forEach((element) => {
        // create video card 
        const videoCard = document.createElement('div');
        videoCard.classList = "card card-compact bg-base-100 w-96 shadow-xl";
        videoCard.innerHTML = `
        <figure class="h-[200px] ">
            <img 
            src="${element.thumbnail}"
            class="h-full w-full object-cover"
            alt="Shoes" />
        </figure>
        <div class="py-2 flex gap-2">
            <div class="h-10 w-10">
             <img 
            src="${element.authors[0].profile_picture}"
            class="h-full w-full rounded-full object-cover"
            alt="Shoes" />
            </div>
            <div>
            <h2 class=" font-bold text-lg">${element.title}</h2>
            <div class="flex items-center gap-3">
            <p class="text-gray-400">${element.authors[0].profile_name}</p>
            <img class="h-5 w-5"
             src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />
            </div>
            <p class="text-gray-600 text-xs">${element.others.views} views </p>
            </div>
        </div>
        </div>
        `;
        videosField.append(videoCard);
    })

}









loadbuttonFetch();
loadVideoFeatch()
