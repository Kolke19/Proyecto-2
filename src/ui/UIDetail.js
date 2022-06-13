import AlbumServices from "../utils/AlbumServices.js";

const albumServices = new AlbumServices();

addListenersAdmin();

function addListenersAdmin() {
  document.addEventListener("DOMContentLoaded", async function (e) {
    const album = await albumServices.getAlbumById(
      window.location.hash.slice(1)
    );
    await buildAlbumDetail(album);

    const wrapper = document.querySelector(".wrapper"),
      mainAudio = wrapper.querySelector("#main-audio"),
      playPauseBtn = wrapper.querySelector(".play-pause"),
      progressArea = wrapper.querySelector(".progres-area"),
      progressBar = wrapper.querySelector(".progres-bar"),
      musicList = wrapper.querySelector(".music-list"),
      showMoreBtn = wrapper.querySelector("#more-music"),
      hideMusicBtn = musicList.querySelector("#close");
    const sendComment = document.getElementById("submitButton");
    const emailUser = document.getElementById("emailComment");
    const comment = document.getElementById("comment");
    const commentContainer = document.getElementById("commentsContainer");
    const formComment = document.querySelectorAll(".form_comment input");

    const expressions = {
      comentario: /^[a-zA-Z0-9\_\-]{1,500}$/, // Letras, numeros, guion y guion_bajo
      correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    };
    // emailUser.addEventListener("keyup", activeButton);
    // comment.addEventListener("keyup", activeButton);

    playPauseBtn.addEventListener("click", () => {
      const isMusicPaused = wrapper.classList.contains("paused");
      isMusicPaused ? pauseMusic() : playMusic();
    });

    //Update progress bar width according to music current time
    mainAudio.addEventListener("timeupdate", (e) => {
      const currentTime = e.target.currentTime; // getting current time of song
      const duration = e.target.duration; //gettin total duration of song
      let progressWidth = (currentTime / duration) * 100;
      progressBar.style.width = `${progressWidth}%`;

      let musicCurrentTime = wrapper.querySelector(".current"),
        musicDuration = wrapper.querySelector(".duration");

      mainAudio.addEventListener("loadeddata", () => {
        //update song total duration
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
          //adding 0 if sec is lees than 10
          totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
      });
      //update playing song current time
      let currentMin = Math.floor(currentTime / 60);
      let currentSec = Math.floor(currentTime % 60);
      if (currentSec < 10) {
        //adding 0 if sec is lees than 10
        currentSec = `0${currentSec}`;
      }
      musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
    });

    // update playing song currentTime on according to the progress bar width
    progressArea.addEventListener("click", (e) => {
      let progressWidthval = progressArea.clientWidth; //getting width of progress bar
      let clickedOffsetX = e.offsetX; //getting offset x value
      let songDuration = mainAudio.duration; //getting song total duration

      mainAudio.currentTime =
        (clickedOffsetX / progressWidthval) * songDuration;
      playMusic(); //calling playMusic function
    });

    //change loop, shuffle, repeat icon onclick
    const repeatBtn = wrapper.querySelector("#repeat-plist");
    repeatBtn.addEventListener("click", () => {
      let getText = repeatBtn.innerText; //getting this tag innerText
      switch (getText) {
        case "repeat":
          repeatBtn.innerText = "repeat_one";
          repeatBtn.setAttribute("title", "Song looped");
          break;
        case "repeat_one":
          repeatBtn.innerText = "shuffle";
          repeatBtn.setAttribute("title", "Playback shuffle");
          break;
        case "shuffle":
          repeatBtn.innerText = "repeat";
          repeatBtn.setAttribute("title", "Playlist looped");
          break;
      }
    });

    showMoreBtn.addEventListener("click", () => {
      musicList.classList.toggle("show");
    });
    hideMusicBtn.addEventListener("click", () => {
      showMoreBtn.click();
    });

    function playMusic() {
      wrapper.classList.add("paused");
      playPauseBtn.querySelector("i").innerText = "pause";
      mainAudio.play();
    }

    function pauseMusic() {
      wrapper.classList.remove("paused");
      playPauseBtn.querySelector("i").innerText = "play_arrow";
      mainAudio.pause();
    }

  });

  function activeButton() {
    if (
      expressions.correo.test(emailUser.value) &&
      expressions.comentario.test(comment.value)
    ) {
      sendComment.disabled = false;
    } else {
      sendComment.disabled = true;
    }
  }
}

const buildAlbumDetail = async (album) => {
  const div = document.createElement("div");
  div.style = "display: flex";
  div.innerHTML = `
    <div class="container justify-content-between ">
    <div class="row ">
      <div class="col col-6">
  <div class="wrapper">
      <div class="top-bar">
        <i class="material-icons">expand_more</i>
        <span>Now Playing</span>
        <i class="material-icons">more_horiz</i>
      </div>
      <div class="img-area">
        <img src="${album.imgUrl}" alt="" />
      </div>
      <div class="song-details">
        <p class="name">${album.nombre}</p>
        <p class="artist">${album.artista}</p>
      </div>
      <div class="progres-area">
        <div class="progres-bar"></div>
        <div class="timer">
          <span class="current">0:00</span>
          <span class="duration"></span>
        </div>
        <!--<audio id="main-audio" src="./docs/music/pink_floyd_another_brick_in_the_wall.mp3"></audio>-->
        <audio id="main-audio" src="${album.audio}">
      </div>
      <div class="controls">
        <i id="repeat-plist" class="material-icons" title="Playlist looped">repeat</i>
        <i id="prev" class="material-icons">skip_previous</i>
        <div class="play-pause">
          <i class="material-icons">play_arrow</i>
        </div>
        <i id="next" class="material-icons">skip_next</i>
        <i id="more-music" class="material-icons">queue_music</i>
      </div>
      <div class="music-list">
        <div class="header">
          <div class="row">
            <i class="material-icons">queue_music</i>
            <span>Music list</span>
          </div>
        </div>
        <i id="close" class="material-icons">close</i>
        <ul>
          <li>
            <div class="row">
              <span>lucas Suarez- amiwhere</span>
              <p>audio library</p>
            </div>
            <span class="audio-duration">3:40</span>
          </li>
          <li>
            <div class="row">
              <span>Rock And Roll- Led Zeppeling</span>
              <p>audio library</p>
            </div>
            <span class="audio-duration">3:40</span>
          </li>
          <li>
            <div class="row">
              <span>Paranoid- Black Sabbath</span>
              <p>audio library</p>
            </div>
            <span class="audio-duration">3:40</span>
          </li>
          <li>
            <div class="row">
              <span>Ojalá Que Llueva Café- Juan Luis Guerra</span>
              <p>audio library</p>
            </div>
            <span class="audio-duration">3:40</span>
          </li>
          <li>
            <div class="row">
              <span>Yo viviré-I will Survive- Celia Cruz</span>
              <p>audio library</p>
            </div>
            <span class="audio-duration">3:40</span>
          </li>
          <li>
            <div class="row">
              <span>Procura- Chichi Peralta</span>
              <p>audio library</p>
            </div>
            <span class="audio-duration">3:40</span>
          </li>
        </ul>
      </div>
    </div>
    </div>
<div class="col col-6">
    <div class="information">
      <p class="info">
        ${album.descrip}
      </p>
      </div>
    </div>
     </div>
    </div>
  `;
  const main = document.body.getElementsByTagName("main")[0];

  main.append(div);
};
