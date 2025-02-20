const form = document.querySelector('form');
const nameError = document.querySelector('.nameError');
const emailError = document.querySelector('.emailError');
const gitError = document.querySelector('.gitError');
const pfpError = document.querySelector('.pfpError');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');


function showPage(pageId) {
    if (pageId === "page2") {
        page1.style.display = "none";
        page2.style.display = "block";
        location.hash = "#page2";
    } else {
        page1.style.display = "block";
        page2.style.display = "none";
        location.hash = "#page1";
    }
}

document.getElementById('pfp').addEventListener('change', () => {
    pfpError.textContent = '';
    let file = form.pfp.files[0];
    const pfpBtns = document.querySelector('.pfpButtons');

    if (file) {
        let fileSize = file.size / 1024;
        if (fileSize > 500) {
            pfpError.textContent = 'File size should be less than 500KB';
            document.getElementById('pfp').value = '';
            isValid = false;
            return;
        }
        else if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
            pfpError.textContent = 'Invalid File type! File type should be JPEG, PNG or JPG';
            document.getElementById('pfp').value = '';
            isValid = false;
            return;
        } else {
            pfpError.textContent = '';
            const imageSrc = URL.createObjectURL(file);
            sessionStorage.setItem('pfp', JSON.stringify(imageSrc));
            document.documentElement.style.setProperty('--uploaded-img', `url(${imageSrc})`);
            pfpBtns.style.display = 'flex';
            document.documentElement.style.setProperty('--textAfter', ' ');
            const rmBtn = document.querySelector('.rmImg')
            rmBtn.addEventListener('click', () => {
                document.getElementById('pfp').value = '';
                document.documentElement.style.setProperty('--uploaded-img', '');
                pfpBtns.style.display = 'none';
                document.documentElement.style.setProperty('--textAfter', '');
            })
            const chBtn = document.querySelector('.chImg')
            chBtn.addEventListener('click', () => {
                document.getElementById('pfp').click();
            })
        }
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    if (form.pfp.files.length === 0) {
        pfpError.textContent = 'Avatar is required';
        isValid = false;
    }
    if (form.name.value.trim() === '') {
        nameError.textContent = 'Name is required';
        isValid = false;
    } else {
        nameError.textContent = '';
    }
    if (form.email.value.trim() === '') {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else {
        emailError.textContent = '';
    }
    if (form.gituser.value.trim() === '') {
        gitError.textContent = 'GitHub username is required';
        isValid = false;
    } else {
        gitError.textContent = '';
    }
    if (isValid) {
        const userData = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            gituser: form.gituser.value.trim()
        };

        sessionStorage.setItem("userData", JSON.stringify(userData));

        const pfp = sessionStorage.getItem("pfp");

        const ticketHeader = document.querySelector('.ticketHeader');
        ticketHeader.innerHTML = `Congrats, ${userData.name}!<br>Your ticket is ready.`;

        const ticketPara = document.querySelector('.ticketPara');
        ticketPara.innerHTML = `We've mailed your ticket to<br>${userData.email} and will send updates in<br>the run up to the event.`;

        const ticketGit = document.querySelector('.tRGit span');
        ticketGit.textContent = userData.gituser;

        const ticketRightName = document.querySelector('.tRName');
        ticketRightName.textContent = userData.name;

        showPage("page2");
    }


});
window.addEventListener("hashchange", () => {
    if (location.hash === "#page2") {
        showPage("page2");
    } else {
        showPage("page1");
    }
});

window.onload = () => {
    const storedUserData = sessionStorage.getItem("userData");

    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        const ticketHeader = document.querySelector('.ticketHeader');
        ticketHeader.innerHTML = `Congrats, ${userData.name}!<br>Your ticket is ready.`;

        const ticketPara = document.querySelector('.ticketPara');
        ticketPara.innerHTML = `We've mailed your ticket to<br>${userData.email} and will send updates in<br>the run up to the event.`;

        const ticketGit = document.querySelector('.tRGit span');
        ticketGit.textContent = userData.gituser;

        const ticketRightName = document.querySelector('.tRName');
        ticketRightName.textContent = userData.name;

        showPage("page2");
    } else {
        if (location.hash === "#page2") {
            showPage("page2");
        } else {
            showPage("page1");
        }
    }
};
