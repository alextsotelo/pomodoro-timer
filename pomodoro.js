let allTypes = document.querySelectorAll(".container .time-options button");

let getType = (elem) => {
    for (x of allTypes) {
        x.classList.remove("active"); 
    }

    elem.classList.add("active");
}