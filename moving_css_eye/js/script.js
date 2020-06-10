
// var hoursSpan = document.querySelector('.hours');
var minutesSpan = document.querySelector('.minutes');
var secondsSpan = document.querySelector('.seconds');var userInputCount = document.getElementById('count-inputField');
var userInputBreak = document.getElementById('break-inputField');
var timeInputBtn = document.getElementById('startBtn');
var sessionStartBtn = document.getElementById('seshStart');
var stopBtn = document.getElementById('stopSesh');
var clock = document.getElementById('clockdiv');
var sessiontype = document.getElementById('session');
var seshLength = document.getElementById('session-length');
var breakLength = document.getElementById('break-length');
var seshExtendBtn = document.getElementById('session-extend');
var seshReduceBtn = document.getElementById('session-reduce');
var breakExtendBtn = document.getElementById('break-extend');
var breakReduceBtn = document.getElementById('break-reduce');
var bkgrnd = document.querySelector('.progress');
var countdownTimeDisplay = 25;
var breakTimeDisplay = 5;
// var countdownTime = 25*60*1000;
// var breakTime = 5*60*1000;
// var countdownTime = 1500000;
var countdownTime = 60000;
// var breakTime = 300000;
var breakTime = 60000;
var deadline;
var deadlineOrig;
var gradient;
var session = "Work time";
var timeInterval;

seshLength.innerHTML = countdownTimeDisplay;
breakLength.innerHTML = breakTimeDisplay;

function getTimeRemaining(){
	//
	var seconds = (deadline/1000) % 60;
	var minutes = Math.floor((deadline/1000/60) % 60);
	// var hours = Math.floor((deadline/1000/60/60) % 60);

	return {
		// 'hours': hours,
		'minutes': minutes,
		'seconds': seconds,
	};
}

function initializeClock() {

	sessionStartBtn.classList.add('disappear')
	stopBtn.classList.remove('disappear')
	bkgrnd.style.background = 'red';
	deadline = countdownTime+1000;
	deadlineOrig = countdownTime;
	sessiontype.innerHTML = "Work time";
	var t = getTimeRemaining();
	// hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
	minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
	secondsSpan.innerHTML = ('0' + (t.seconds-1)).slice(-2);
	function updateClock(){
		console.log(bkgrnd.style.background);
		sessiontype.innerHTML = session;
		deadline = deadline - 1000;
		gradient = deadline/deadlineOrig*100;
		console.log(gradient)
	
			bkgrnd.style.background = `linear-gradient(pink, pink ${gradient+"%"}, whitesmoke ${gradient+ .01 +"%"}, whitesmoke)`;
			var t = getTimeRemaining();
			// hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
			minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
			secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

			if (deadline <= 1) {
				if (session === "Work time") {
					// start with break time
					deadline = breakTime +1000;
					deadlineOrig = breakTime;
					session = "Break time";
				} else if (session === "Break time") {
					//start with count time
					deadline = countdownTime +1000;
					deadlineOrig = countdownTime;
					session = "Work time"
				}
			}
	}
	updateClock();
	timeInterval = setInterval(updateClock, 1000);
}

sessionStartBtn.addEventListener('click', initializeClock);
stopBtn.addEventListener('click', stopSession)
seshExtendBtn.addEventListener('click', setCountDownTime)
seshReduceBtn.addEventListener('click', setCountDownTime)
breakExtendBtn.addEventListener('click', setCountDownTime)
breakReduceBtn.addEventListener('click', setCountDownTime)

function stopSession(){
	clearInterval(timeInterval);
	sessionStartBtn.classList.remove('disappear');
	session = "Work time";
	stopBtn.classList.add('disappear');
	sessiontype.innerHTML = "Stopped mode";
	// hoursSpan.innerHTML = '';
	minutesSpan.innerHTML = '';
	secondsSpan.innerHTML = '';
}

function setCountDownTime(){
	switch (this.id) {
		case 'session-extend':
			countdownTimeDisplay++;
			countdownTime = countdownTimeDisplay*60*1000;
			break;
		case 'session-reduce':
			if (countdownTimeDisplay === 1) {
			} else {
				countdownTimeDisplay--;
				countdownTime = countdownTimeDisplay*60*1000;
			}
			break;
		case 'break-extend':
			breakTimeDisplay++;
			breakTime = breakTimeDisplay*60*1000;
			break;
		case 'break-reduce':
			if (breakTimeDisplay === 1) {
			} else {
				breakTimeDisplay--;
				breakTime = breakTimeDisplay*60*1000;
			}
			break;
		}
	seshLength.innerHTML = countdownTimeDisplay;
	breakLength.innerHTML = breakTimeDisplay;
}
















