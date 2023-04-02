import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('form');
var parsedData;
let loadInterval;

function loader(element) {
    element.textContent = ''

    loadInterval = setInterval(() => {
        // Update the text content of the loading indicator
        element.textContent += '.';

        // If the loading indicator has reached three dots, reset it
        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300);
}

function typeText(element, text) {
    let index = 0

    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index)
            index++
        } else {
            clearInterval(interval)
        }
    }, 20)
}

// generate unique ID for each message div of bot
// necessary for typing text effect for that specific reply
// without unique ID, typing text will work on every element
function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
    return (
        `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${isAi ? bot : user} 
                      alt="${isAi ? 'bot' : 'user'}" 
                    />
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `
    )
}

const handleSubmit = async (e) => {
    e.preventDefault()
console.log("function loaded");
    const data = new FormData(form)
let lines=document.getElementById("lines").value;
let verses=document.getElementById("verses").value;
let theme=document.getElementById("theme").value;
let message="Write a poem about "+theme+" which has "+verses+" stanzas of "+lines+" lines each";
console.log(lines);
console.log(verses);
console.log(theme);
    // to clear the textarea input 
    form.reset()


const uniqueId=generateUniqueId();
    // specific message div 
   // const messageDiv = document.getElementById(uniqueId)

    // messageDiv.innerHTML = "..."
//    loader(messageDiv)
console.log(JSON.stringify({
            prompt: message
        }));
    const response = await fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: message
        })
    })

    clearInterval(loadInterval)
  //  messageDiv.innerHTML = " "

    if (response.ok) {
        const data = await response.json();
        parsedData = data.bot.trim(); 
console.log(parsedData);
const temp=document.getElementById("poem");
console.log(temp);
temp.innerHTML=parsedData;
    } else {
        const err = await response.text()

        //messageDiv.innerHTML = "Something went wrong"
        alert(err)
    }
}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e)
    }
})
if("speechSynthesis" in window){
    let demo=document.getElementById("btnpoem");
    demo.onclick = () => {
        let msg = new SpeechSynthesisUtterance(parsedData);
        speechSynthesis.speak(msg);
    };
    demo.disabled= false;
}