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
video.currentTime = 0.5;


// HELPER FUNCTIONS
function togglePlay(){
    video.paused ? video.play() : video.pause();
}








function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function handleScrub(e){
    //x-axis pixel value where scrub is clicked divided by total width of scrub
    const scrubTime = (e.offsetX / progress.clientWidth) * video.duration;
    // total duration of video multiplied by fraction acquired above gives us current time 
    video.currentTime = scrubTime;
}

function toggleFullScreen (){
    console.log('toggleFullScreen ');
    video.requestFullscreen();
}


// EVENT LISTENERS
video.addEventListener('click', togglePlay);
video.addEventListener('play', ()=> toggle.textContent = '❚❚');
video.addEventListener('pause', ()=> toggle.textContent = '►');
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let mouseDown = false;
progress.addEventListener('click', handleScrub);
progress.addEventListener('mousedown', () => mouseDown = true );
progress.addEventListener('mouseup', () => mouseDown = false );
progress.addEventListener('mousemove', (e) => mouseDown && handleScrub(e));

fullscreen.addEventListener('click', toggleFullScreen);
