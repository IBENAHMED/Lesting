const elements = {
    nowPlaying: document.querySelector(".now-playing"),
    trackArt: document.querySelector(".track-art"),
    trackName: document.querySelector(".track-name"),
    trackArtist: document.querySelector(".track-artist"),

    playPauseBtn: document.querySelector(".playpause-track"),
    nextBtn: document.querySelector(".next-track"),
    prevBtn: document.querySelector(".prev-track"),

    seekSlider: document.querySelector(".seek_slider"),
    volumeSlider: document.querySelector(".volume_slider"),
    currTime: document.querySelector(".current-time"),
    totalDuration: document.querySelector(".total-duration"),
    wave: document.getElementById("wave"),
    randomIcon: document.querySelector(".fa-random"),
    currTrack: document.createElement("audio"),
    loader: document.querySelector("#loader"),

    MusicAudio: document.querySelectorAll("audio"),
};

const {
    nowPlaying,
    trackArt,
    trackName,
    trackArtist,
    playPauseBtn,
    nextBtn,
    prevBtn,
    seekSlider,
    volumeSlider,
    currTime,
    totalDuration,
    wave,
    randomIcon,
    currTrack,
    loader,
    MusicAudio,
} = elements;

let trackIndex = 0;
let isRandom = false;

const musicList = [
    {
        img: "src/assets/images/stay.png",
        name: "Stay",
        artist: "The Kid LAROI, Justin Bieber",
        music: `${MusicAudio[0].src}`,
    },
    {
        img: "src/assets/images/fallingdown.jpg",
        name: "Falling Down",
        artist: "Wid Cards",
        music: `${MusicAudio[1].src}`,
    },
    {
        img: "src/assets/images/faded.png",
        name: "Faded",
        artist: "Alan Walker",
        music: `${MusicAudio[2].src}`,
    },
    {
        img: "src/assets/images/ratherbe.jpg",
        name: "Rather Be",
        artist: "Clean Bandit",
        music: `${MusicAudio[3].src}`,
    },
];

function startGame() {
    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", previous);
    document
        .querySelector(".repeat-track")
        .addEventListener("click", repeatTrack);
    initIcons();
    document.body.style.background = `linear-gradient(to right,#${randomBackground()},#${randomBackground()})`
    totalDuration.innerHTML = "00:30";
    changeMusic();
}

let colorLetter = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
const MAX_COLOR_INDEX = colorLetter.length;
let ColorX = '';

function randomBackground() {

    ColorX = '';
    for (let i = 0; i < 6; i++) {
        var RandomcolorLetter = colorLetter[Math.floor(Math.random() * MAX_COLOR_INDEX)];
        ColorX = ColorX + RandomcolorLetter;
    }
    return ColorX
}

function initIcons() {
    const pauseIcon = createIcon("pause", "pauseIcon");
    const startIcon = createIcon("play", "startIcon");

    playPauseBtn.append(startIcon);

    startIcon.addEventListener("click", () => toggleMusic(startIcon, pauseIcon));
    pauseIcon.addEventListener("click", () => toggleMusic(pauseIcon, startIcon));
}

function createIcon(iconName, id) {
    const icon = document.createElement("i");
    icon.className = `fa fa-${iconName}-circle fa-5x`;
    icon.id = id;
    return icon;
}

function toggleMusic(showIcon, hideIcon) {
    showIcon.remove();
    playPauseBtn.append(hideIcon);
    loader.classList.toggle("loader");

    if (currTrack.paused) {
        currTrack.play();
        trackArt.classList.toggle("rol");
    } else {
        currTrack.pause();
        trackArt.classList.toggle("rol");
    }
}

function changeMusic() {
    currTrack.src = musicList[trackIndex].music;
    nowPlaying.innerHTML = `PLAYING ${trackIndex + 1} OF ${musicList.length}`;
}

function next() {
    if (trackIndex < musicList.length - 1) {
        trackIndex++;
    } else {
        trackIndex = 0;
    }
    changeMusic();
    currTrack.play();
}

function previous() {
    if (trackIndex > 0) {
        trackIndex--;
    } else {
        trackIndex = musicList.length - 1;
    }
    changeMusic();
    currTrack.play();
}

function repeatTrack() {
    changeMusic();
    currTrack.play();
}

function setVolume() {
    currTrack.volume = volumeSlider.value / 100;
}

let timerCurrent;
setInterval(() => {
    seekSlider.value = currTrack.currentTime;
    timerCurrent = Math.floor(currTrack.currentTime);
    currTime.innerHTML =
        timerCurrent < 10 ? `00:0${timerCurrent}` : `00:${timerCurrent}`;
}, 10);

startGame();