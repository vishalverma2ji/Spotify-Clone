const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const playIcon = document.getElementById("playIcon");

const volumeSlider = document.getElementById("volumeSlider");

const songInfo = document.querySelector(".songinfo");
const artistName = document.querySelector(".artistName");

const bottomCover = document.getElementById("bottomCover");
const currentCover = document.getElementById("currentCover");

const currentSongName = document.getElementById("currentSongName");
const currentArtist = document.getElementById("currentArtist");

const seekbar = document.querySelector(".seekbar");
const circle = document.querySelector(".circle");

const cards = document.querySelectorAll(".card");

let currentSongIndex = 0;

const songs = [
{
title:"Happy Hits",
artist:"Various Artists",
src:"songs/Song1.mp3",
cover:"cover.jpg"
},
{
title:"Ishq Mera",
artist:"Artist",
src:"songs/Song2.mp3",
cover:"m.jpg"
},
{
title:"Metro In Dino",
artist:"Artist",
src:"songs/song3.mp3",
cover:"p.png"
},
{
title:"Ilzaam",
artist:"Artist",
src:"songs/song4.mp3",
cover:"i.jpg"
},
{
title:"Jaane Tu",
artist:"Artist",
src:"songs/Song5.mp3",
cover:"j.jpg"
},
{
title:"Ladki Deewani",
artist:"Artist",
src:"songs/Song6.mp3",
cover:"l.jpg"
},
{
title:"Hai Tu",
artist:"Artist",
src:"songs/song7.mp3",
cover:"d.png"
},
{
title:"Ishq Mai",
artist:"Artist",
src:"songs/Song8.mp3",
cover:"t.png.jpg"
},
{
title:"Hali Halki",
artist:"Artist",
src:"songs/song9.mp3",
cover:"h.jpg"
},
{
title:"Dil Ka Kya",
artist:"Artist",
src:"songs/song10.mp3",
cover:"cover.jpg"
}
];

function loadSong(index){

const song = songs[index];

audio.src = song.src;

songInfo.textContent = song.title;
artistName.textContent = song.artist;

currentSongName.textContent = song.title;
currentArtist.textContent = song.artist;

bottomCover.src = song.cover;
currentCover.src = song.cover;

cards.forEach(card=>card.classList.remove("active"));

cards[index].classList.add("active");

}

function playSong(){

audio.play();

playIcon.innerHTML=`
<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
`;

}

function pauseSong(){

audio.pause();

playIcon.innerHTML=`
<path d="M8 5v14l11-7z"/>
`;

}

playBtn.addEventListener("click",()=>{

if(audio.paused){

playSong();

}else{

pauseSong();

}

});

cards.forEach((card,index)=>{

card.addEventListener("click",()=>{

currentSongIndex=index;

loadSong(index);

playSong();

});

});

loadSong(0);
/* ===========================
   NEXT / PREVIOUS
=========================== */

nextBtn.addEventListener("click", () => {
    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    loadSong(currentSongIndex);
    playSong();
});

prevBtn.addEventListener("click", () => {
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }

    loadSong(currentSongIndex);
    playSong();
});

/* ===========================
   AUTO PLAY NEXT SONG
=========================== */

audio.addEventListener("ended", () => {

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    loadSong(currentSongIndex);
    playSong();

});


/* ===========================
   VOLUME CONTROL
=========================== */

volumeSlider.addEventListener("input", () => {

    audio.volume = volumeSlider.value;

});


/* ===========================
   SEEKBAR UPDATE
=========================== */

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    const percent = (audio.currentTime / audio.duration) * 100;

    circle.style.left = percent + "%";

});


/* ===========================
   CLICK SEEKBAR
=========================== */

seekbar.addEventListener("click", (e) => {

    const rect = seekbar.getBoundingClientRect();

    const clickX = e.clientX - rect.left;

    const width = seekbar.clientWidth;

    const percent = clickX / width;

    audio.currentTime = percent * audio.duration;

});


/* ===========================
   SONG TIME
=========================== */

const songTime = document.querySelector(".songtime");

function formatTime(sec) {

    let minutes = Math.floor(sec / 60);

    let seconds = Math.floor(sec % 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return `${minutes}:${seconds}`;

}

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    songTime.innerHTML =
        `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;

});
/* ==========================================
   ACTIVE CARD + PLAY BUTTON UPDATE
========================================== */

function updateActiveCard() {

    cards.forEach((card, index) => {

        const svg = card.querySelector(".play-button svg");

        if (index === currentSongIndex) {

            card.classList.add("active");

            if (!audio.paused) {

                svg.innerHTML = `
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                `;

            } else {

                svg.innerHTML = `
                <path d="M8 5v14l11-7z"/>
                `;

            }

        } else {

            card.classList.remove("active");

            if (svg) {

                svg.innerHTML = `
                <path d="M8 5v14l11-7z"/>
                `;

            }

        }

    });

}


/* ==========================================
   LOAD SONG UPDATE
========================================== */

function loadSong(index) {

    const song = songs[index];

    audio.src = song.src;

    songInfo.innerHTML = song.title;

    artistName.innerHTML = song.artist;

    currentSongName.innerHTML = song.title;

    currentArtist.innerHTML = song.artist;

    bottomCover.src = song.cover;

    currentCover.src = song.cover;

    updateActiveCard();

}


/* ==========================================
   PLAY SONG
========================================== */

function playSong() {

    audio.play();

    playIcon.innerHTML = `
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
    `;

    updateActiveCard();

}


/* ==========================================
   PAUSE SONG
========================================== */

function pauseSong() {

    audio.pause();

    playIcon.innerHTML = `
    <path d="M8 5v14l11-7z"/>
    `;

    updateActiveCard();

}


/* ==========================================
   CARD PLAY BUTTON
========================================== */

cards.forEach((card, index) => {

    const btn = card.querySelector(".play-button");

    if (btn) {

        btn.addEventListener("click", (e) => {

            e.stopPropagation();

            currentSongIndex = index;

            loadSong(index);

            playSong();

        });

    }

});


/* ==========================================
   DOUBLE CLICK CARD
========================================== */

cards.forEach((card, index) => {

    card.addEventListener("dblclick", () => {

        currentSongIndex = index;

        loadSong(index);

        playSong();

    });

});


/* ==========================================
   AUDIO EVENTS
========================================== */

audio.addEventListener("play", () => {

    updateActiveCard();

});

audio.addEventListener("pause", () => {

    updateActiveCard();

});


/* ==========================================
   IMAGE ANIMATION
========================================== */

audio.addEventListener("play", () => {

    bottomCover.style.transform = "rotate(360deg)";
    bottomCover.style.transition = "1s";

    currentCover.style.transform = "scale(1.03)";
    currentCover.style.transition = ".4s";

});

audio.addEventListener("pause", () => {

    currentCover.style.transform = "scale(1)";
});
/* ==========================================
   KEYBOARD SHORTCUTS
========================================== */

document.addEventListener("keydown", (e) => {

    // Space = Play / Pause
    if (e.code === "Space") {

        e.preventDefault();

        if (audio.paused) {
            playSong();
        } else {
            pauseSong();
        }
    }

    // Right Arrow = Next
    if (e.code === "ArrowRight") {

        nextBtn.click();

    }

    // Left Arrow = Previous
    if (e.code === "ArrowLeft") {

        prevBtn.click();

    }

});


/* ==========================================
   SONG LOADED
========================================== */

audio.addEventListener("loadedmetadata", () => {

    songTime.innerHTML =
        `0:00 / ${formatTime(audio.duration)}`;

});


/* ==========================================
   RESET PLAYER
========================================== */

function stopPlayer() {

    audio.pause();

    audio.currentTime = 0;

    playIcon.innerHTML =
        `<path d="M8 5v14l11-7z"/>`;

    circle.style.left = "0%";

    updateActiveCard();

}


/* ==========================================
   SEEKBAR DRAG
========================================== */

let dragging = false;

circle.addEventListener("mousedown", () => {

    dragging = true;

});

document.addEventListener("mouseup", () => {

    dragging = false;

});

document.addEventListener("mousemove", (e) => {

    if (!dragging) return;

    const rect = seekbar.getBoundingClientRect();

    let x = e.clientX - rect.left;

    if (x < 0) x = 0;

    if (x > rect.width) x = rect.width;

    const percent = x / rect.width;

    circle.style.left = `${percent * 100}%`;

    audio.currentTime = percent * audio.duration;

});


/* ==========================================
   SMOOTH IMAGE ROTATION
========================================== */

audio.addEventListener("timeupdate", () => {

    if (!audio.paused) {

        bottomCover.style.animation =
            "spinAlbum 8s linear infinite";

    }

});

audio.addEventListener("pause", () => {

    bottomCover.style.animation = "none";

});


/* ==========================================
   START VOLUME
========================================== */

audio.volume = 1;

volumeSlider.value = 1;


/* ==========================================
   CONSOLE
========================================== */

console.log("Spotify Clone Ready 🚀");