const tracks = [
    { title: "Korean or Get Eaten", author: "Duolingo, squid game", file: "music/Korean or Get Eaten - Duolingo.mp3" },
    { title: "life force", author: "ptasinski", file: "music/ptasinski - life force.mp3" },
    { title: "Проснулся холод", author: "nedum4y0u", file: "music/nedum4y0u - Проснулся холод.mp3" },
    { title: "Пальмира", author: "Луна", file: "music/Луна - Пальмира.mp3" },
    { title: "Solo Tu", author: "Highland", file: "music/Highland - Solo Tu.mp3" },
    { title: "Золотые кресты", author: "Nocturnex", file: "music/Nocturnex - Золотые кресты.mp3" },
    { title: "Montagem Castigo Eterna", author: "DJ TSF", file: "music/DJ TSF - Montagem Castigo Eterna.mp3" },
    { title: "ALASKA PUFFER", author: "паранойя", file: "music/паранойя - ALASKA PUFFER.mp3" },
  ];
  
  const audio = document.getElementById('audio');
  const progressBar = document.getElementById('progress-bar');
  const playButton = document.getElementById('play-button');
  const playIcon = document.getElementById('play-icon');
  const songName = document.getElementById('song-name');
  const author = document.getElementById('author');
  const currentTimeLabel = document.getElementById('current-time');
  const durationLabel = document.getElementById('duration');
  
  let isPlaying = false;
  
  function loadRandomTrack() {
    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
    songName.textContent = randomTrack.title;
    author.textContent = randomTrack.author;
    audio.src = randomTrack.file;
    audio.load();
  }
  
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
  
  audio.addEventListener('loadeddata', () => {
    durationLabel.textContent = formatTime(audio.duration);
  });
  
  audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    progressBar.value = (currentTime / audio.duration) * 100;
    currentTimeLabel.textContent = formatTime(currentTime);
  });
  
  playButton.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      playIcon.src = 'https://cdn-icons-png.flaticon.com/512/4028/4028535.png';
    } else {
      audio.play();
      playIcon.src = 'https://cdn4.iconfinder.com/data/icons/circles-1/32/548-01-512.png';
    }
    isPlaying = !isPlaying;
  });
  
  progressBar.addEventListener('input', (e) => {
    const seekTo = (e.target.value / 100) * audio.duration;
    audio.currentTime = seekTo;
  });
  
  // Добавляем слушатель события 'ended', чтобы воспроизводить следующий случайный трек
  audio.addEventListener('ended', () => {
    loadRandomTrack();
    audio.play();
  });
  
  loadRandomTrack();
  