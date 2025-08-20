// Selects all of the time option buttons
let allTypes = document.querySelectorAll(".container .time-options button");
let timer = document.querySelector(".container .progress-bar h3");
let startBtn = document.querySelector(".container .control-buttons .start-btn");
let stopBtn = document.querySelector(".container .control-buttons .stop-btn");
let resetBtn = document.querySelector(".container .control-buttons .reset-btn");
let circularProgressBar = document.querySelector(".container .progress-bar");
let progressInterval; 

// This function is called when a time option button is clicked
// It updates the active button and sets the current timer type
// It also resets the timer to reflect the new type

let getType = (elem, type) => {
    for (x of allTypes) {
        x.classList.remove("active"); 
    }

    elem.classList.add("active");
    pomodoroType = type;
    resetTimer();
}


// Constants for different timer types
const timer_type_pomodoro = "pomodoro";
const timer_type_shortbreak = "short break";
const timer_type_longbreak = "long break";
const audio = new Audio('.soundEffects/lofi-alarm.mp3');
let pomodoroType = timer_type_pomodoro; // Default timer type is pomodoro

const pomodoroTimeInSeconds = 1500; // 60sec x 25min = 1500;
const shortBreakTimeInSeconds = 300; // 60sec x 5min = 300;
const longBreakTimeInSeconds = 900; // 60sec x 15min = 900;
let timerValue = pomodoroTimeInSeconds; // Set pomodoroTimeInSeconds as the default timer value
let multipleFactor = 360 / timerValue; // Calculate the multiple factor for the progress bar

// Function to reset the timer based on the current type
// This function will be called when the user selects a different timer type
let resetTimer = () => {
    clearInterval(progressInterval);
    startBtn.style.display = "block";
    stopBtn.style.display = "none";

    if (pomodoroType === "pomodoro") {
        timerValue = pomodoroTimeInSeconds;
    } else if (pomodoroType === "short break") {
        timerValue = shortBreakTimeInSeconds;
    } else {
        timerValue = longBreakTimeInSeconds;
    }
    
    multipleFactor = 360 / timerValue;
    updateTimerDisplay(); // Update the timer display
    audio.pause(); // Pause the audio if it was playing
    audio.currentTime = 0; // Reset the audio to the beginning
}

let formattedNumberInMinutes = (num) => {
    let minutes = Math.trunc(num / 60).toString().padStart(2, '0'); // Format number in minutes
    let seconds = Math.trunc(num % 60).toString().padStart(2, '0'); // Format number in seconds

    return `${minutes}:${seconds}`; // Return formatted time as MM:SS
}

// Function to update the timer display
let updateTimerDisplay = () => {
    if (timerValue == 0) {
        stopTimer();
        audio.play();
    }


    circularProgressBar.style.background = `conic-gradient(#1561f8e1 ${timerValue * multipleFactor}deg, #0a2569 0deg`;
    timer.innerHTML = `${formattedNumberInMinutes(timerValue)}`;

}

let startTimer = () => {
    if (timerValue <= 0) {
        resetTimer(); // Reset the timer if it has reached zero
    }

    progressInterval = setInterval(() => {
        timerValue--;
        updateTimerDisplay();
    }, 1000);
    startBtn.style.display = "none";
    stopBtn.style.display = "block";
}

let stopTimer = () => {
    clearInterval(progressInterval); // Stop the timer
    startBtn.style.display = "block";
    stopBtn.style.display = "none";
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);