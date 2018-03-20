function multimedia() {
    let video = document.querySelector("#vid");
    let play_pause = document.querySelector("#play");
    let current = document.querySelector("#current");
    let volum = document.querySelector("#volum");
    let changeSound = document.querySelector(".change_volume");
    let back = document.querySelector("#back_video");
    let next = document.querySelector("#next_video");
    let progress = document.querySelector("#progress");
    let durations = document.querySelector("#duration");
    let move_back = document.querySelector("#back");
    let move_next = document.querySelector("#next");
    let button = document.querySelector("#circle");
    let zoom = document.querySelector("#zoom");
    let screen = document.querySelector(".total");
    video.volume = 0.5;
    let change, move = false;
    let open = false;
    let num_video = 0;
    let actual = 1;
    let url = ["https://mainline.i3s.unice.fr/mooc/week2p1/video1.mp4", "https://mainline.i3s.unice.fr/mooc/week2p1/video2.mp4", "https://mainline.i3s.unice.fr/mooc/samuraiPizzacat.mp4", "https://mainline.i3s.unice.fr/mooc/jbs.mp4", "https://mainline.i3s.unice.fr/mooc/mi5.mp4", "https://mainline.i3s.unice.fr/mooc/ff7.mp4", ];
    let maximo = 101;
    video.src = url[num_video];

    function start_pause() {
        if (move == false) {
            video.play();
            play_pause.firstChild.innerHTML = "pause_circle_filled"
            play_pause.title = "pause";
            var bucle = setInterval(estado, 30);
            move = true;
        } else if (move == true) {
            video.pause();
            play_pause.firstChild.innerHTML = "play_circle_filled";
            play_pause.title = "play";
            move = false;
        }
    }

    function again() {
        video.currentTime = 0;
    }

    function sound() {
        if (change == true) {
            video.volume = 0.5;
            change = false;
            volum.firstChild.innerHTML = "volume_up";
        } else {
            video.volume = 0;
            change = true;
            volum.firstChild.innerHTML = "volume_off";
        }
    }

    function change_sound(evt) {
        console.log(evt);
        let range = document.querySelector(".range_value");
        if (open == false) {
            changeSound.style.display = 'block';
            open = true;
            range.addEventListener('input', function(evt) {
                let level = range.value;
                console.log(level);
                video.volume = level;
                if (level == 0) {
                    volum.firstChild.innerHTML = "volume_off";
                }
                if ((level > 0) && (level <= 0.2)) {
                    volum.firstChild.innerHTML = "volume_mute";
                }
                if ((level > 0.2) && (level <= 0.6)) {
                    volum.firstChild.innerHTML = "volume_down";
                }
                if (level > 0.6) {
                    volum.firstChild.innerHTML = "volume_up";
                }
            });
        } else {
            changeSound.style.display = 'none';
            open = false;
        }
    }

    function back_video() {
        if (num_video === 0) {
            num_video = 0;
        } else {
            num_video--;
            video.src = url[num_video];
            actual--;
            play_pause.firstChild.innerHTML = "pause_circle_filled"
            move = false;
            video.play()
            start_pause()
        }
    }

    function next_video() {
        if ((num_video >= 0)) {
            num_video++;
            actual++
            video.src = url[num_video];
            play_pause.firstChild.innerHTML = "pause_circle_filled"
            move = false;
            video.play()
            start_pause()
        }
        if (num_video == 6) {
            num_video = 0;
            video.src = url[num_video];
            video.play();
        }
    }

    function estado() {
        if (video.ended == false) {
            var total = parseInt(video.currentTime * maximo / video.duration)
            progress.style.width = total + "%";
            return total;
        }
    }

    function adelant(position) {
        let p = getPosition(position)
        if (video.ended == false) {
            video.currentTime = parseInt(p.x * video.duration / durations.offsetWidth);
            time(video.currentTime);
            video.pause()
            move = false;
            start_pause()
        }
    }

    function getPosition(e) {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        return {
            x,
            y
        }
    }

    function m_next() {
        let actualTime = video.currentTime + 10;
        video.currentTime = actualTime;
        console.log(video.currentTime);
    }

    function m_back() {
        if (video.currentTime >= 10) {
            let actualTime = video.currentTime - 10;
            video.currentTime = actualTime;
        } else {
            video.currentTime == video.currentTime;
        }
    }

    function time(seconds) {
        let date = new Date(seconds * 1000);
        var hour = (date.getHours() == 0) ? 23 : date.getHours() - 1;
        var hour = (hour < 9) ? "0" + hour : hour;
        let minute = (date.getMinutes() < 9) ? "0" + date.getMinutes() : date.getMinutes();
        let second = (date.getSeconds() < 9) ? "0" + date.getSeconds() : date.getSeconds();
        return minute + ":" + second;
    }

    function zoomScreen() {
        video.webkitEnterFullScreen();
        video.control = false;
    }
    play_pause.addEventListener('click', start_pause);
    current.addEventListener('click', again);
    volum.addEventListener("dblclick", sound);
    volum.addEventListener('click', change_sound);
    back.addEventListener('click', back_video);
    next.addEventListener('click', next_video);
    video.addEventListener('ended', next_video);
    durations.addEventListener('click', adelant);
    move_next.addEventListener('click', m_next);
    move_back.addEventListener('click', m_back);
    zoom.addEventListener('click', zoomScreen);
    video.addEventListener('timeupdate', function(evt) {
        document.getElementById("count1").innerHTML = time(video.currentTime);
    });
    video.addEventListener('loadedmetadata', function(evt) {
        document.getElementById("count2").innerHTML = time(vid.duration);
    })
}
multimedia()