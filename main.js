const audio = document.getElementById("audio");
const imageAudio = document.querySelector(".photo__img");
const titleAudio = document.querySelector(".music__title");
const artistAudio = document.querySelector(".music__artist");
const inputRange = document.querySelector(".music__progress");
const currentTime = document.querySelector(".current__time");
const totalTime = document.querySelector(".total__time");
const prevButton = document.querySelector(".prev__btn");
const playButton = document.querySelector(".play__btn");
const nextButton = document.querySelector(".next__btn");
const volumeAudio = document.querySelector(".volume__range");

const playlist = [
   {
    id: 1,
    title: "Gedaei",
    artist: "Amir Tataloo",
    image: "./assets/img/gedaei.jpg",
    src: "./assets/music/Amirtataloo.mp3",
  },
   {
    id: 2,
    title: "Noon o Panir o Sabzi",
    artist: "Ebi & Dariush",
    image: "./assets/img/ebidar.jpg",
    src: "./assets/music/noon.mp3",
  },
   {
    id: 3,
    title: "Janam raft 2",
    artist: "Sorena & Bahram",
    image: "./assets/img/bs.jpg",
    src: "./assets/music/janm.mp3",
  },
  {
    id: 4,
    title: "Safar",
    artist: "Moein",
    image: "./assets/img/moein.jpg",
    src: "./assets/music/Moein.mp3",
  },

  {
    id: 5,
    title: "Dep",
    artist: "Ali Sorena",
    image: "./assets/img/photo_2026-11-06_23-19-56.jpg",
    src: "./assets/music/alisorena.mp3",
  },
 
 
   {
    id: 6,
    title: "Ghorsaye Abi",
    artist: "Remix",
    image: "./assets/img/photo_2026-11-06_23-27-54.jpg",
    src: "./assets/music/GhorsayeAbi2.mp3",
  },
  
];

let currentTrackIndex = 0;
let isPlaying = false;

const loadTrack = () => {
  const track = playlist[currentTrackIndex];
  audio.src = track.src;
  imageAudio.src = track.image;
  titleAudio.textContent = track.title;
  artistAudio.textContent = track.artist;
  inputRange.value = 0;

  if (isPlaying) {
    audio.play();
  }
};

// event play pause button
playButton.addEventListener("click", () => {
  const icon = playButton.firstElementChild;

  if (isPlaying) {
    audio.pause();
    icon.classList.replace("fa-pause", "fa-play");
  } else {
    audio.play();
    icon.classList.replace("fa-play", "fa-pause");
  }

  isPlaying = !isPlaying;
});

// next Buttons
nextButton.addEventListener("click", () => {
  currentTrackIndex++;
  if (currentTrackIndex > playlist.length - 1) {
    currentTrackIndex = 0;
  }

  playButton.firstElementChild.classList.replace("fa-play", "fa-pause");
  isPlaying = true;
  loadTrack();
});

// prev Buttons
prevButton.addEventListener("click", () => {
  currentTrackIndex--;
  if (currentTrackIndex < 0) {
    currentTrackIndex = playlist.length - 1;
  }
  playButton.firstElementChild.classList.replace("fa-play", "fa-pause");
  isPlaying = true;
  loadTrack();
});

//  Update audio playback time when the progress bar changes
inputRange.addEventListener("input", () => {
  const newTime = audio.duration * (inputRange.value / 100);

  audio.currentTime = newTime;
});

// input Volume Music
volumeAudio.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

audio.addEventListener("timeupdate", () => {
  const current = audio.currentTime;
  const total = audio.duration;

  const percentage = (current / total) * 100;

  if (percentage) {
    inputRange.value = percentage;
  }
  if (current && total) {
    currentTime.textContent = formatTime(current);
    totalTime.textContent = formatTime(total);
  }
});

// get minutes and secends
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const secends = Math.floor(time % 60);

  return `${minutes}:${secends < 10 ? "0" : ""}${secends}`;
};

// Ended Music
audio.addEventListener("ended", () => {
  isPlaying = false;
  playButton.firstElementChild.classList.replace("fa-pause", "fa-play");
});

// Load the initial track
loadTrack();
