const menuBtn = document.querySelector('.menu-btn');
const sideMenu = document.querySelector('.side-nav');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        sideMenu.classList.add('show');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        sideMenu.classList.remove('show');
        menuOpen = false;
    }
});

// detect scroll top or down
// let currEl = document.querySelector('.smart-scroll')
// var last_scroll_top = 0;
// if (currEl !== undefined) { // check if element exists
//     document.addEventListener('scroll', function () {
//         console.log(currEl.scrollTop);
//         scroll_top = currEl.scrollTop;
//         if (scroll_top < last_scroll_top) {
//             currEl.classList.remove('scrolled-down');
//             currEl.classList.add('scrolled-up');
//         }
//         else {
//             currEl.classList.remove('scrolled-up');
//             currEl.classList.add('scrolled-down');
//         }
//         last_scroll_top = scroll_top;
//     });
// }
