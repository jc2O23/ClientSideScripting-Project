// John Campbell
// CSC 343
// Final Project
// Restaurant Website

// This JS file is used for 'JCFinal_Project'


// So on the window load here it gets the 6 image names and sets a timer to loop through in order of the foodPics
window.onload = function() {
    const foodPics = ['shrimpTaco.jpg', 'Pierogis3.jpg', 'Taco Set3(C).jpg', 'Wings.jpg', 'Pot Stickers.jpg', 'Tenders2.jpg'];
    let currentIndex = 0;
    const welcomeSection = document.getElementById('welcomeSection');

    // Here is the function that just adds 1 to the index of the displayed Pic
    // Resets once it gets to the end
    function changeBackgroundImage() {  
        currentIndex += 1
        console.log(`Now showing: ${foodPics[currentIndex]}`)
        welcomeSection.style.backgroundImage = `url('./images/${foodPics[currentIndex]}')`;
        if (currentIndex == 5) {
            currentIndex = -1
        }

    }

    // Here is where it adds the first image on load of the page
    welcomeSection.style.backgroundImage = `url('./images/${foodPics[currentIndex]}')`;

    // Timer so every 5 seconds changes the background
    setInterval(changeBackgroundImage, 5000);
}

// This function is included on all pages to handle the user entering an email to subscribe to updates
document.getElementById('submitEmail').addEventListener('click', handleSubmitEmail)
function handleSubmitEmail() {

    // Does a little bit of checking to make sure it is not empty, contains '@' and '.'
    const email = document.getElementById('submitField').value
    if(email == '') {
        alert("No email entered")
            return
    }
    else if (!email.includes('@')) {
        alert(`"${email}" is not a vaild email`)
        return
    }
    else if (!email.includes('.')) {
        alert(`"${email}" is not a vaild email`)
        return
    }
    
    // Shows a modal that they succesfully subsribed
    const modal = document.getElementById('modalID');
    modal.style.display = 'block';
    document.getElementById('subText').innerHTML = `We will reach you with up-to-date on news <br> by email: ${email}`
    document.getElementById('submitField').value = ''
    
    // The modal is on a timer that clears after 5 seconds
    setTimeout(() => {
        modal.style.display = 'grid';
    }, 5000); 
}
