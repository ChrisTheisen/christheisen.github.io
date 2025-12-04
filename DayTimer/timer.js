const timers = [];
const wrapper = document.getElementById('alarms')
const input = document.getElementById('time');
const label = document.getElementById('label');
const hr = document.getElementById('hr');
const min = document.getElementById('min');
const sec = document.getElementById('sec');
const ms = document.getElementById('ms');
let d = new Date();

const songlector = document.getElementById('song');
for(let i=0;i<Songs.length;i++){
    songlector.add(new Option(Songs[i].n, i));
}

class Timer{
    time;
    label;
    div;
    song;

    constructor(time, label, song){
        this.createdAt = new Date();
        this.time = new Date();
        this.time.setHours(time.split(':')[0]);
        this.time.setMinutes(time.split(':')[1]);
        this.time.setSeconds(0);
        this.time.setMilliseconds(0);
        this.label = label;
        this.isSonging = false;
        this.song = Songs[song];

        this.div = document.createElement('div');
        const t = document.createElement('span');
        t.textContent = this.time.toLocaleTimeString();
        const l = document.createElement('span');
        l.textContent = this.label;
        const b = document.createElement('button');
        b.textContent = 'X';
        b.classList.add('right');
        b.addEventListener('click', () => {
            console.log('Remove:', this)
            this.div.remove();
            const index = timers.findIndex(x => x.label === this.label && x.time === this.time)
            stopper();
            delTimer(index)}
        );
        this.div.title = 'SONG: '+this.song.n;
        this.div.appendChild(t);
        this.div.appendChild(b);
        this.div.appendChild(document.createElement('br'));
        this.div.appendChild(l);
        this.div.classList.add('alarm')

        wrapper.appendChild(this.div);
    }

    isNow = function(){
        return Math.abs(d - this.time) < 200 && !this.isSonging;
    }

    isSoon = function(){
        return d < this.time && (this.time - d) < 300000;
    }

    isPast = function(){
        return d > this.time;
    }

    until = function(){
        return this.time - d;
    }

    update = function(){
        const duration = this.time - this.createdAt;
        const nowish = d - this.createdAt;
        const progress = nowish / duration;

        // Update background color progress
        const progressPercent = Math.min(Math.max(progress * 100, 0), 100);
        this.div.style.background = `linear-gradient(to right, lightskyblue ${progressPercent}%, transparent ${progressPercent}%)`;

        if(this.isSoon()){
            if(!this.div.classList.contains('soon')){
                beeper(BEEP);
            }
            this.div.classList.add('soon');
        }
        else if(this.isPast()){
            this.div.classList.remove('soon');
            this.div.classList.add('past');
        }

        if(this.isNow()){
            console.log('GO TIME!');
            this.isSonging = true;
            beeper(this.song);
        }
    }


}

function beeper(song) {
    const beepContext = new AudioContext();
    const gainA = new GainNode(beepContext);
    const gainB = new GainNode(beepContext);

    //need the same length
    while(song.g.length < song.c.length){song.g.push(1);}
    while(song.g.length > song.c.length){song.g.pop();}

    for(let i=0;i<song.c.length;i++){
        const x = song.c[i];
        const gain = new GainNode(beepContext, {
            gain: song.g[i]
        });

        let next = beepContext.currentTime;
        const beep = new OscillatorNode(beepContext, {
            type: 'sine',
            frequency: x[0].f
        });


        gain.connect(beepContext.destination);
        beep.connect(gain);

        x.forEach(y => {
            beep.frequency.setValueAtTime(y.f, next);
            next += y.t;
        });
        beep.start();
        beep.stop(next);
    };
}

function stopper(){
    audio.pause();
    audio.currentTime = 0;
}

function addTimer() {
    timers.push(new Timer(input.value, label.value, songlector.value));
}

function delTimer(index){
    timers.splice(index, 1);
}

function currentTime(){
    d = new Date();
    hr.textContent = d.getHours().toString().padStart(2, '0');
    min.textContent = d.getMinutes().toString().padStart(2, '0');
    sec.textContent = d.getSeconds().toString().padStart(2, '0');
    ms.textContent = d.getMilliseconds().toString().padStart(3, '0');

    timers.forEach(x => x.update());
}

currentTime();
setInterval(() => currentTime(), 137);
