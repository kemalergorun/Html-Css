import { TV_MAZE_API } from "../../day01/assets/env.js";
// DOM Elements 
const searchInputElement = document.getElementById("search");
const outputElement = document.getElementById("output");

// Global Variable
let debounceTimeoutId = null;

// Event Listener
searchInputElement.addEventListener("keyup", (event) => {

    const query = event.target.value;

    // Debounce

    // 1- If no query, clear the element, and stop the function
    if(!query){
        outputElement.innerHTML = "";
        return;
    }

    // 2- Check if there is a timeout already running, if so clear it:
    if(debounceTimeoutId){
        clearTimeout(debounceTimeoutId);
    }


    // 3- Set a new timeout to fetch the data:
    debounceTimeoutId = setTimeout(() => {
        getRequest(query);
    }, 1500 )

})



// Function
const getRequest = async (query) => {

    // axios.get(`${TV_MAZE_API}/search/shows?q=${query}`).then((response) => {
    //     console.log(response.data);

    //     populateOutput(response.data)
    // })

    try {

        const response = await axios.get(`${TV_MAZE_API}/search/shows?q=${query}`);

        if(response.status !== 200){
            throw new Error("Failed to fetch data");
        }

        populateOutput(response.data);
        
    } catch (error) {
        console.log(error);
        errorText(error.message)
    }

}

getRequest()

function errorText(text){
    const errorElement = document.createElement("div");
    errorElement.setAttribute("class", "alert alert-danger");
    errorElement.innerText = text;
    outputElement.after(errorElement);
}

const populateOutput = (data) => {

    // Resetting output element
    outputElement.innerHTML = "";

    // If no data is found, show an error message:
    if(!Array.isArray(data)){
        return errorText("No shows found!");
    }

    data.forEach((item) => {

        const cardElement = document.createElement("div");
        cardElement.setAttribute("class", "card p-0 mx-3");
        cardElement.style.width = "18rem";

        const imgElement = document.createElement("img");
        imgElement.setAttribute("class", "card-img-top");
        imgElement.src =
          item?.show?.image?.original || "./images/No_Image_Available.jpg";
        imgElement.alt = item?.show?.name;
        imgElement.title = item?.show?.name;
        imgElement.height="250";

        const cardBodyElement = document.createElement("div");
        cardBodyElement.setAttribute("class", "card-body");

        const titleElement = document.createElement("h5");
        titleElement.setAttribute("class", "card-title");
        titleElement.innerText = item?.show?.name;

        const summaryElement = document.createElement("p");
        summaryElement.setAttribute("class", "card-text");
        summaryElement.innerHTML = item?.show?.summary;

        cardBodyElement.append(titleElement, summaryElement);

        cardElement.append(imgElement, cardBodyElement);

        outputElement.appendChild(cardElement);

        

    });

}