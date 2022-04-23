/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function onClickDropdown() {
    
    //Stop Propagation
    document.getElementById('myDropdown').addEventListener('mousedown', (ev) => {
        ev.preventDefault()
        ev.stopImmediatePropagation()
        ev.stopPropagation()
    })

    document.getElementById('myDropdown').addEventListener('mousemove', (ev) => {
        ev.preventDefault()
        ev.stopImmediatePropagation()
        ev.stopPropagation()
    })
    
    //Toggle
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}