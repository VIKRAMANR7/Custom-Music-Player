const musicContainer = document.getElementById("musicContainer");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const progressValue = document.querySelector(".progress-value");
const songDuration = document.querySelector(".song-length");
const songCoverImg = document.querySelector(".songCoverImg");
const songName = document.querySelector(".song-name");
const artistName = document.querySelector(".artist-name");
const audio = document.querySelector(".audio");
const shuffleBtn = document.querySelector(".shuffleBtn");
const playBtn = document.querySelector(".playBtn");
const repeatBtn = document.querySelector(".repeatBtn");
const previousBtn = document.querySelector(".previousBtn");
const nextBtn = document.querySelector(".nextBtn");
const forwardBtn = document.querySelector(".forwardBtn");
const backwardBtn = document.querySelector(".backwardBtn");
const playbackRate = document.querySelector(".dropup-content");
const listContainer = document.querySelector(".listContainer");
const listBtn = document.querySelector(".listBtn");
const mainContainer = document.querySelector(".mainContainer");

const songsObj = [
  {
    id: 1,
    songName: "Chaleya - Jawan",
    artistName: "Anirudh",
    coverImg: "Chaleya.webp",
    duration: "03:08",
  },
  {
    id: 2,
    songName: "Dekha Tenu - Mr and Mrs Mahi",
    artistName: "Mahbub Islam",
    coverImg: "Dekha Tenu.jpg",
    duration: "04:41",
  },
  {
    id: 3,
    songName: "Husn Tera Tauba Tauba - Bad Newzz",
    artistName: "Karan Aujla",
    coverImg: "Tauba Tauba.webp",
    duration: "03:27",
  },

  {
    id: 4,
    songName: "O Sajni Re - Laapata Ladies",
    artistName: "Arjit Singh",
    coverImg: "Sajni Re.webp",
    duration: "02:50",
  },
  {
    id: 5,
    songName: "Tere Hawaale - Laal Singh Chadda",
    artistName: "Arjit Singh",
    coverImg: "Tere Hawaale.jpg",
    duration: "05:50",
  },
  {
    id: 6,
    songName: "Vida Karo - Chamkila",
    artistName: "Arjit Singh",
    coverImg: "Vida Karo - Chamkila.jpg",
    duration: "04:30",
  },
  {
    id: 7,
    songName: "Jaane Do - Maidaan",
    artistName: "A.R Rahman",
    coverImg: "Jaane Do - Maidaan.jpg",
    duration: "06:47",
  },
  {
    id: 8,
    songName: "Lutt Putt Gaya - Dunki",
    artistName: "Arjit Singh",
    coverImg: "Lutt Putt Gaya - Dunki.jpg",
    duration: "03:43",
  },
  {
    id: 9,
    songName: "Naina - Crew",
    artistName: "Diljit Dosanjh",
    coverImg: "Naina - Crew.jpg",
    duration: "03:00",
  },
  {
    id: 10,
    songName: "Papa Meri Jaan - Animal",
    artistName: "Sonu Nigam",
    coverImg: "Papa Meri Jaan - Animal.jpg",
    duration: "05:21",
  },
  {
    id: 11,
    songName: "Bhairava Anthem - Kalki 2898 AD",
    artistName: "Diljit Dosanjh",
    coverImg: "Bhairava Anthem - Kalki 2898 AD.jpg",
    duration: "02:42",
  },
  {
    id: 12,
    songName: "Sher Khul Gaye - Fighter",
    artistName: "Shilpa Rao",
    coverImg: "Sher Khul Gaye - Fighter.jpg",
    duration: "03:00",
  },
];

//Keep track of the song
let songsIndex = 0;

//Initially load song details into DOM
loadSong(songsObj[songsIndex]);
function loadSong(song) {
  songCoverImg.src = `images/${song.coverImg}`;
  audio.src = `songs/${song.songName}.mp3`;
  songName.innerText = song.songName;
  artistName.innerText = song.artistName;
}

// Play song
function playSong() {
  playBtn.querySelector("i.fa-solid").classList.remove("fa-circle-play");
  playBtn.querySelector("i.fa-solid").classList.add("fa-circle-pause");

  audio.play();
}

// Pause song
function pauseSong() {
  playBtn.querySelector("i.fa-solid").classList.add("fa-circle-play");
  playBtn.querySelector("i.fa-solid").classList.remove("fa-circle-pause");

  audio.pause();
}

// Previous song
function prevSong() {
  songsIndex--;

  if (songsIndex < 0) {
    songsIndex = songsObj.length - 1;
  }

  loadSong(songsObj[songsIndex]);

  playSong();
}

// Next song
function nextSong() {
  songsIndex++;

  if (songsIndex > songsObj.length - 1) {
    songsIndex = 0;
  }

  loadSong(songsObj[songsIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  //Get Minutes
  let currentMins = Math.floor(currentTime / 60);
  if (currentMins < 10) {
    currentMins = "0" + String(currentMins);
  }
  //Get Seconds
  let currentSecs = Math.floor(currentTime % 60);
  if (currentSecs < 10) {
    currentSecs = "0" + String(currentSecs);
  }
  progressValue.innerText = `${currentMins}:${currentSecs}`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function fastForward() {
  return (audio.currentTime += 10);
}

function fastBackward() {
  return (audio.currentTime -= 10);
}

function loopSong() {
  return (audio.currentTime = 0);
}

function randomSong(songsObj) {
  for (let i = songsObj.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [songsObj[i], songsObj[j]] = [songsObj[j], songsObj[i]];
  }
  return songsObj;
}

previousBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", nextSong);

//Song entire duration
audio.addEventListener("loadedmetadata", () => {
  const finalDuration = audio.duration;
  //Get Minutes
  let mins = Math.floor(finalDuration / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }
  //Get Seconds
  let secs = Math.floor(finalDuration % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }
  songDuration.innerText = `${mins}:${secs}`;
});

let isPlaying = false;
audio.addEventListener("playing", () => {
  isPlaying = true;
});
audio.addEventListener("pause", () => {
  isPlaying = false;
});

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

forwardBtn.addEventListener("click", fastForward);
backwardBtn.addEventListener("click", fastBackward);
repeatBtn.addEventListener("click", loopSong);
shuffleBtn.addEventListener("click", () => {
  randomSong(songsObj);
  loadSong(songsObj[songsIndex]);
  playSong();
});
playbackRate.addEventListener("click", (e) => {
  document.querySelector(".playbackRate").innerText = e.target.innerText;
  let isPlayingSpeed = e.target.innerText.slice(0, -1);
  audio.playbackRate = Number(isPlayingSpeed);
});

listBtn.addEventListener("click", () => {
  listContainer.style.display = "block";
  musicCollection();
});

function musicCollection() {
  for (let i = 0; i < songsObj.length; i++) {
    const musicListContainer = document.createElement("div");
    const pId = document.createElement("p");
    const pTitle = document.createElement("a");
    const pArtist = document.createElement("p");
    const pDuration = document.createElement("p");
    musicListContainer.classList.add("musicListItems");
    musicListContainer.appendChild(pId);
    musicListContainer.appendChild(pTitle);
    musicListContainer.appendChild(pArtist);
    musicListContainer.appendChild(pDuration);
    mainContainer.appendChild(musicListContainer);
    pId.classList.add("idNumber");
    pTitle.classList.add("title");
    pArtist.classList.add("artist");
    pDuration.classList.add("totallength");
    pId.innerText = `${songsObj[i].id}`;
    pTitle.innerText = `${songsObj[i].songName}`;
    pArtist.innerText = `${songsObj[i].artistName}`;
    pDuration.innerText = `${songsObj[i].duration}`;
    musicListContainer.insertAdjacentHTML("afterend", "<hr/>");
    musicListContainer.addEventListener("click", (e) => {
      const getListValue =
        Number(e.target.parentElement.children[0].innerText) - 1;
      loadSong(songsObj[getListValue]);
      playSong();
    });
  }
}

document.querySelector(".closeBtn").addEventListener("click", () => {
  listContainer.style.display = "none";
});
