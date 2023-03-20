let songIndex = 0;
let min = 0;
let sec = 0;
let currTime = 0;currTime
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('play-size');
let mybar = document.getElementById('mybar');
let gif = document.getElementById('gif');
let curr = document.getElementById('curr');
let author= document.getElementById('curr-author');
let image = document.getElementById('curr-img');
let endtime = document.getElementById('end-time');
let currtime = document.getElementById('currTime');
let songs = [
    {songName:"Titli", filePath: "songs/1.mp3", coverPath: "images/1.jpg", duration:"04:37", author:"Satinder Sartaj"},
    {songName:"Agar Tum", filePath: "songs/2.mp3", coverPath: "images/2.jpeg", duration:"05:41", author:"Arijit Singh"},
    {songName:"Bandeya", filePath: "songs/3.mp3", coverPath: "images/3.jpg", duration:"03:04", author:"Shaarib & Toshi"},
    {songName:"Kesariya", filePath: "songs/4.mp3", coverPath: "images/4.jpg", duration:"04:28", author:"Arijit Singh" },
    {songName:"Pent Straight", filePath: "songs/5.mp3", coverPath: "images/5.jpg", duration:"03:32", author:"Gurnam Bhullar"},
    {songName:"Pasoori", filePath: "songs/6.mp3", coverPath: "images/6.jpg", duration:"03:44", author:"Ali Sethi"},
    {songName:"Rozana", filePath: "songs/7.mp3", coverPath: "images/7.jpg", duration:"04:34", author:"Shreya Ghoshal"},
    {songName:"Sohni Sohni", filePath: "songs/8.mp3", coverPath: "images/8.jpeg",duration:"03:13", author:"Ammy Virk"},
    {songName:"Sajjan Raazi", filePath: "songs/9.mp3", coverPath: "images/9.jpg", duration:"05:32", author:"Satinder Sartaj"},
    {songName:"Velle", filePath: "songs/10.mp3", coverPath: "images/10.jpg", duration:"03:51", author:"Vishal Dadlani"}
]

Array.from(document.getElementsByClassName('duration')).forEach((element,i)=>{
    // console.log(element,i);
    element.innerHTML = songs[i].duration;
}) 


masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
}) 

audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    mybar.value = progress;
    min =  parseInt(parseInt(audioElement.currentTime) / 60);
    sec =  parseInt(parseInt(audioElement.currentTime) % 60);
    min = min<10?'0'+min:min;
    sec = sec<10?'0'+sec:sec;
    currtime.innerText = min+':'+sec;
})

mybar.addEventListener('change', ()=>{
    audioElement.currentTime = (mybar.value * audioElement.duration)/100;
})

const makeAllPlay = ()=>{
    Array.from(document.getElementsByClassName('playimg')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('playimg')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        if(e.target.classList.contains('fa-play')){
    e.target.classList.remove('fa-play');
    e.target.classList.add('fa-pause');
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    curr.innerHTML = songs[songIndex].songName;
    author.innerHTML = songs[songIndex].author;
    image.src = songs[songIndex].coverPath;
    endtime.innerHTML = songs[songIndex].duration;
    gif.style.opacity = 1;
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
}
else{
    e.target.classList.remove('fa-pause');
    e.target.classList.add('fa-play');
    audioElement.pause();
    gif.style.opacity = 0;
    masterplay.classList.remove('fa-pause-circle');
    masterplay.classList.add('fa-play-circle');
}
})
})

const playbutton = (songIndex) =>{
    makeAllPlay();
    document.getElementById(`${songIndex}`).classList.remove('fa-play');
    document.getElementById(`${songIndex}`).classList.add('fa-pause');
}

document.getElementById('volumebar').addEventListener("change", function(){
    let volume = document.getElementById('volumebar').value;
    console.log(volume/100);
    audioElement.volume = volume/100 ;
});


document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >=9 ){
        songIndex = 0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    curr.innerHTML = songs[songIndex].songName;
    currtime.innerHTML = audioElement.currentTime;  
    author.innerHTML = songs[songIndex].author;
    image.src = songs[songIndex].coverPath;
    endtime.innerHTML = songs[songIndex].duration;
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
    makeAllPlay();
    playbutton(songIndex);
    
})


document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <=0 ){
        songIndex = 0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    // console.log(audioElement.currentTime)
    audioElement.play();
    gif.style.opacity = 1;
    curr.innerHTML = songs[songIndex].songName;
    author.innerHTML = songs[songIndex].author;
    image.src = songs[songIndex].coverPath;
    endtime.innerHTML = songs[songIndex].duration;
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
    makeAllPlay();
    playbutton(songIndex);
})

document.getElementById("soundimg").addEventListener("click",function(){
    if(document.getElementById("volumebar").classList.contains('seen')){
        document.getElementById("volumebar").classList.add('unseen')
        document.getElementById("volumebar").classList.remove('seen')
        // console.log("closed")
    }
    else if(document.getElementById("volumebar").classList.contains('unseen')){
        document.getElementById("volumebar").classList.add('seen')
        document.getElementById("volumebar").classList.remove('unseen')
        // console.log("opened")
    }
})

