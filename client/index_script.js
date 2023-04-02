const fetchAPI = 'https://type.fit/api/quotes';
const title = document.getElementById('title');
const title2 = document.getElementById('title2');
const getRandomCite = document.getElementsByClassName("getRandomCite")[0];

getRandomCite.addEventListener("click", updateContent);

updateContent();
function updateContent() {
    fetch(fetchAPI)
        .then(res => res.json())
        .then(data => {
            let randomNum = getRandomId(data.length);
            let randomNum2 = getRandomId(data.length);
            title.innerText = `Advice #${randomNum}`;
            document.getElementById('quote').innerText = `"${data[randomNum].text}"`;
            title2.innerText = `Advice #${randomNum2}`;
            document.getElementById('quote2').innerText = `"${data[randomNum2].text}"`;
            console.log(data)
        });
}
function getRandomId(x) {
    return Math.floor(Math.random() * x);
}

