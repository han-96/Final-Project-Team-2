const background = document.querySelector('#background'); // background derived from album cover below
const thumbnail = document.querySelector('#thumbnail'); // album cover 
const song = document.querySelector('#song'); // audio object

const songArtist = document.querySelector('.song-artist'); // element where track artist appears
const songTitle = document.querySelector('.song-title'); // element where track title appears
const progressBar = document.querySelector('#progress-bar'); // element where progress bar appears
let pPause = document.querySelector('#play-pause'); // element where play and pause image appears

// array storing paths for audio objects
let songs = ['./assets/music/Di Du Dua Di - Bich Phuong.mp3', './assets/music/Blinding Lights - The Weeknd.m4a']; 
// array storing paths for album covers and backgrounds
let thumbnails = ['./assets/cover/108862.jpg', './assets/cover/112788.jpg'];
// array storing track artists
let artists = ['Bích Phương', 'The Weeknd'];
// array storing track titles
let titles = ['Đi đu đưa đi', 'Blinding Lights'];

// If play button clicked, change pp.src to pause button and call song.play(). 
// If pause button clicked, change pp.src to play button and call song.pause().
let playing = true;

function playPause() {
    if (playing) {
        pPause.src = './assets/icon/icons8-pause-64.png'; // this will change the Play button to a Pause button
        thumbnail.style.transform = 'scale(1.15)'; // this will slightly zoom in the album cover for a cool effect
        
        song.play(); // this will play the audio track
        playing = false;
    } else {
        pPause.src = './assets/icon/icons8-play-64.png'; 
        thumbnail.style.transform = 'scale(1)'; // this will slightly zoom out the album cover for a cool effect

        song.pause();
        playing = true;
    }
}

// function where songIndex is incremented, song/thumbnail image/background image/song artist/song title 
// changes to next index value, and playPause() runs to play next track

let songIndex = 0;

function nextSong() {
    songIndex++;
    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = artists[songIndex];
    songTitle.innerHTML = titles[songIndex];

    playing = true;
    playPause();
}

function previousSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = artists[songIndex];
    songTitle.innerHTML = titles[songIndex];

    playing = true;
    playPause();
}

// convert song.currentTime and song.duration into MM:SS format
function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};

// update progressBar.max to song object's duration, same for progressBar.value
// update currentTime/duration DOM
function updateProgressValue() {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
    document.querySelector('.currentTime').innerHTML = formatTime(Math.floor(song.currentTime));
    if (document.querySelector('.durationTime').innerHTML === 'NaN:NaN') {
        document.querySelector('.durationTime').innerHTML = '0:00';
    } else {
        document.querySelector('.durationTime').innerHTML = formatTime(Math.floor(song.duration));
    }
}

// run updateProgressValue function every 1/2 second to show change in progressBar and song.currentTime on the DOM
setInterval(updateProgressValue, 500);

function changeProgressBar() {
    song.currentTime = progressBar.value;
}

