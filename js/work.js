
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
        .then(data =>ShowAllVideos(data.videos))
        .catch(error => console.log(error))
}

const ShowAllVideos = (videos) => {
    const videosField = document.getElementById('videos-Container');
  
    videos.forEach((element) => {
        // create video card 
        const videoCard = document.createElement('div');
        videoCard.classList = ("card card-compact bg-base-100 w-96 shadow-xl")
        videoCard.innerHTML = `
        <figure class="h-[200px] w-full">
            <img class=" h-full object-cover"
            src="${element.thumbnail}"
            alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        </div>`;
        videosField.append(videoCard);
    })

}









loadbuttonFetch();
loadVideoFeatch()
