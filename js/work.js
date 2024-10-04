
// change theme to the website
const tagNames = document.getElementsByTagName("html")[0];
tagNames.setAttribute("data-theme", "light");


/*
 >>>>>>>>>>>>>>>>>>>>>>>>>create button area start here

 1.catch api er sahajje button er api take dhorte hobe 
 2. dynamic vabe button gulo bananor jonne ekta  function banate hobe and sei function ke catch api function er vitor call korte hobe
 3. button guloke templete string er sahajje add korte hobe

*/


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
        buttonItems.innerHTML = `<button id="btn-${ele.category_id}" onclick="clickButton(${ele.category_id})" class="btn catagory-btn font-bold">${ele.category}</button>`;
        // add button to the container 
        buttonField.append(buttonItems)
    });
}



/*
 >>>>>>>>>>>>>create button area end here  
 */

/*
    >>>>Showallvodes function e jei card ta deya ace oi card er image er upore ekta second number deya ace oitake time a vag kore ber kora hoy 

*/
const timaDateCalculate = (times) => {
    const hour = parseInt(times / 3600);
    let remainingSecond = times % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`


}

/*
  >>>>>>>>>>>>>>time date calculation ekhane ses hoy  
 */


/*
    >>>>>>>>button e click korle jei button e click kora hobe sei button catagory er video card jegulo ace segulo dekhabe 

     0. templete string er vitor je button ta ace oitate jodi click kora hoy tahole oi id er ki ki card ace seta dekhar jonne button e ekta onclick handler add korte hobe and perameter hisabe button er id take dite hobe 
    1.button er jeila id ace and oila id diye kon kon card ace seilake dhorar jone dynamic vabe ekta api nite hobe 
    2. button e click korle kon kon card dekhabe sei card gulor jonne ekta function nite hobe and sei  function ke api function er vitor call korte hobe 
    3.jei buttone e click hobe oi btn er card dekhabe bakila hide hobe and button er color change hobe 
    4. jei id er kono card nai oi id te click korle dynamic vabe kicu dekhaite hobe 



    
    ei section suru hoice 
*/

const clickButton = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            changeColorBtn()
            const btnColorChange = document.getElementById(`btn-${id}`);
            btnColorChange.classList.add("bg-red-500");
            btnColorChange.classList.add("text-white");

            ShowAllVideos(data.category)
        })
}

/*
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> section ses hoice 
*/

// click korar por btn er color change korar function 
const changeColorBtn = () => {
    const btnColorChange = document.getElementsByClassName('catagory-btn');
    // console.log(btnColorChange);
    for (const btn of btnColorChange) {
        btn.classList.remove('bg-red-500');
        btn.classList.remove('text-white');
    }

}

// btn get detail in card 
const getDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`)
        .then(res => res.json())
        .then(data => displayGetDetails(data.video))
}

//  display getDetails card in modal 
const displayGetDetails = (displays) => {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
    <img src="${displays.thumbnail}"/>
        <h3>${displays.description}</h3>
    `
    document.getElementById("modalbox").showModal();
}

/*
 >>>>>>>>>>>>>>>>>>>>>>>> create videos card area start here
 
  1. fetch kore video api ke dhorte hobe 
  2. ki ki kaj korbe setar jonne ekta function korte hobe and sei function ke catch api function er vitor call kore dite hobe

  3. template string er sahajje video card er upor ekta time ace oitake anar jone alada kore ekta function likhe and sei function ke use korte hobe templete sting er vitor
  4. kar kar badge ace abar kar kar nai seta ber korte hobe ternary operator eer sahajje and etake templete string er sahajje likhte hobe
  5.create child take append kore dite hobe
 */


// create video feath function 
const loadVideoFeatch = (searchbox = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title= ${searchbox}`)
        .then(res => res.json())
        .then(data => ShowAllVideos(data.videos))
        .catch(error => console.log(error))
}

/*
    0. basically koyta video card hobe seta agei banate hobe and surute all video card thakbe 
 1. jkhn kono button e clcik kora hobe tkhn sob card delete hobe sudhu jei buton e click hobe oi button er card thaaakbe  
 2.tarpor loop calate hobe and loop er vitor jei button e click hobe oi btn er koyta id ace oita dekhe sei poriman id er card banbe r jar id er poriman faka thakbe tar jonne kono card hobe na karon eita daynamic vabe banano hoy 


*/

const ShowAllVideos = (videos) => {
    const videosField = document.getElementById('videos-Container');
    // initially videofield text emty kore deya hocce
    videosField.innerHTML = '';

    // jodi id er vitor kono card na pay tahole ei kaj ta korbe 
    if (videos.length == 0) {
        videosField.classList.remove("grid")
        videosField.innerHTML = `
        <div class="flex flex-col justify-center items-center gap-10 min-h-[500px] ">
            <img src="./design/Icon.png"/>
            <h3 class=" text-3xl font-bold  text-gray-900"> Opps! Sorry There is no content here </h3>
        </div>
        `;
        return;
    } else {
        videosField.classList.add("grid")
    }

    // video api niye loop calabe ar card add korbe 
    videos.forEach((element) => {
        // create video card 
        const videoCard = document.createElement('div');
        videoCard.classList = "card card-compact bg-base-100 w-96 shadow-xl";
        videoCard.innerHTML = `
        <figure class="h-[200px] relative">
            <img 
            src="${element.thumbnail}"
            class="h-full w-full object-cover"
            alt="Shoes" />
            ${element.others.posted_date?.length == 0 ? "" : `
                 <span class="absolute right-4 bottom-4 bg-black rounded p-1 text-xs text-white">
                 ${timaDateCalculate(element.others.posted_date)}</span>
                 ` }
           
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
            ${element.authors[0].verified == true ?
                `<img class="h-5 w-5" 
                src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />`
                : ""}
            </div>
            <p class="text-gray-600 text-xs">${element.others.views} views </p>
            <button onclick="getDetails('${element.video_id}')" class=" btn btn-xs btn-error">Details</button>
            </div>
            </div>
        </div>
        `;
        videosField.append(videoCard);
    })

}


document.getElementById('search-box').addEventListener("keyup", (e) => {
    loadVideoFeatch(e.target.value);
})






loadbuttonFetch();
loadVideoFeatch()
