
function randomiseBackground(){
    const random_url = `url("./src/assets/images/backgrounds/bg_${Math.floor(Math.random() * 7) + 1}.jpg")`;
    document.body.style.backgroundImage=random_url;
    document.body.style.backgroundSize="cover";
}