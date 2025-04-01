var i = 0; // currently shown image. Default 0;
window.addEventListener('load', responsiveDesign);
document.addEventListener('DOMContentLoaded', async function()
{
    
    const breedMenu = document.getElementById("breedMenu") // the dropdown menu to select dog breed.
    response = await fetch('https://dog.ceo/api/breeds/list/all')
    data = await response.json();
    breeds = data.message;
    Object.keys(breeds).forEach(breed => {
        const subbreeds = breeds[breed];
        if (subbreeds.length > 0)
        {
            subbreeds.forEach(subbreed =>
            {
                option = document.createElement("option");
                option.value = breed + "/" + subbreed;
                option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1).toLowerCase() + " " + subbreed.charAt(0).toUpperCase() + subbreed.slice(1).toLowerCase();
                breedMenu.appendChild(option);

            });
        }
        else
        {
            option = document.createElement("option");
            option.value = breed;
            option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1).toLowerCase();
            breedMenu.appendChild(option);

        }
    });
    
    document.getElementById("breedMenu").addEventListener("change", async function(){
        selectedBreed = this.value;
        if (selectedBreed != "")
        {
            response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images`)
            data = await response.json();
            images = data.message;
            image.src = images[0];
            imgCount = images.length - 1
            i = 0;
            updateImageCounter();

        }
    });

    
    window.addEventListener('resize', responsiveDesign);
    document.getElementById("imageCounter").addEventListener("change", counterInput);
    
});

// Changes the placement of the Breed selector drop down menu at a certain screen size
function responsiveDesign() 
{
    var breedMenu = document.getElementById('breedMenu');
    var bottombar = document.getElementById('bottombar');
    var body = document.body;
    var screensize = window.innerWidth;
    if (screensize <= 768)
    {
        if (!bottombar.contains(breedMenu))
        {
            bottombar.prepend(breedMenu);
        }
    }
    else
    {
        if (bottombar.contains(breedMenu))
        {
            body.prepend(breedMenu);
        }
    }

};

// Change the currently displayed image.
function nextImage(Amount)
{
    const image = document.getElementById("image"); // The image element
    i += Amount;

    if (i > imgCount) // If going up while looking at the LAST image, show the FIRST image instead.
    {
        i = 0;
    }

    else if (i < 0) // If going down while looking at the FIRST image, show the LAST image instead.
    {
        i = imgCount;
    }

    image.src = images[i]
    updateImageCounter();
}

function updateImageCounter()
{
    const imageCounter = document.getElementById("imageCounter"); // The number that shows how many images are available for the currently selected breed.
    imageCounter.textContent = `${i + 1}/${images.length}`;
}
