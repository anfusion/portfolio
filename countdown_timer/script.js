const timerDisplay = document.querySelector('.display__time-left');
const timerInput = document.customForm;
const endTime = document.querySelector('.display__end-time');
const quickButtons = document.querySelectorAll('[data-time]');

let timerClock;
let displayVar;

function timer (seconds) {
	//clear any existing timers
	clearInterval(timerClock);

	//ensure dealing with number not string
	seconds = parseInt(seconds);
	//get start and end time in ms
	const now = Date.now() ;
	const then = now + (seconds * 1000);

	displayTimeLeft(seconds);
	displayEndTime(then);

	timerClock = setInterval( () => {
		const remainingMs = then - Date.now();
		let remainingSecs = Math.round(remainingMs/1000);

		if (remainingMs <= 0) {
			remainingSecs = 0;
			clearInterval(timerClock);
		};
		displayTimeLeft(remainingSecs);
	}, 1000);
}

function displayTimeLeft(remainingSecs) {
	let hours 	= Math.floor(remainingSecs / 3600);
	let mins 	= Math.floor(remainingSecs/60) - hours * 60;
	let secs 	= remainingSecs % 60

	hours 	= formatNum(hours);
	mins 	= formatNum(mins);
	secs 	= formatNum(secs);

	timerDisplay.textContent = `${hours}:${mins}:${secs}`;
}

function formatNum(num){
	return ("0" + num).slice(-2);
}

function displayEndTime(timestamp){
	const end 		= new Date(timestamp);
	const hours 	= formatNum(end.getHours());
	const minutes 	= formatNum(end.getMinutes());
	const seconds 	= formatNum(end.getSeconds());

	endTime.textContent = `Be back at: ${hours}:${minutes}`
}

quickButtons.forEach(button => {
	button.addEventListener('click', ()=> timer(button.dataset.time));
});

timerInput.addEventListener('submit', function (e) {
	if(!this.minutes.value) return;
	e.preventDefault();
	const minutes = this.minutes.value * 60;
	timer(minutes);
	this.reset();
})
