
document.addEventListener('DOMContentLoaded', async function()
{
    const breedMenu = document.getElementById("breedMenu")
    console.log(breedMenu);
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
        const imageContainer = document.getElementById("imageContainer");
        imageContainer.innerHTML = ''
        const selectedBreed = this.value;
        console.log(selectedBreed);
        if (selectedBreed != "")
        {
            response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images`)
            data = await response.json();
            console.log(data);
            images = data.message;
            Object.values(images).forEach(image => {
                newImage = document.createElement("img");
                newImage.src = image;
                imageContainer.appendChild(newImage);
            });

        }
    });
});
