//get DOM elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');
//reset range values
ranges[0].value = 1;
ranges[1].value = 1;



// EVENT LISTENERS
//update play-pause icon on toggling of play naandd pause
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('pause', ()=> toggle.textContent = '►');
video.addEventListener('play', ()=> toggle.textContent = '❚❚');
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', handleScrub);
progress.addEventListener('mousedown', () => mouseDown = true );
progress.addEventListener('mouseup', () => mouseDown = false );
progress.addEventListener('mousemove', (e)=> mouseDown && handleScrub(e) );
fullscreen.addEventListener('click', toggleFullScreen);

video.currentTime = 0.5;


// HELPER FUNCTIONS
function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function togglePlay(){
    video.paused ? video.play() : video.pause();
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgress(){
    const progressPercentage = video.currentTime / video.duration * 100;
    progressBar.style.flexBasis = `${progressPercentage}%`;
}

function toggleFullScreen (){
    console.log('toggleFullScreen ');
    video.requestFullscreen();
}

function handleScrub(e){
    //x-axis pixel value where scrub is clicked divided by total width of scrub
    clickedSpotAsFraction = e.clientX / progress.clientWidth;
    // total duration of video multiplied by fraction acquired above gives us current time 
    video.currentTime = video.duration * clickedSpotAsFraction;
}


let mouseDown = false;