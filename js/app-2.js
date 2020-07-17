
$(document).ready(function () {
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on('click', function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function () {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

  $(window).scroll(function () {
    $(".slideanim").each(function () {
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
      if (pos < winTop + 600) {
        $(this).addClass("slide");
      }
    });
  });
})
audio = document.getElementById('song1');
nature = document.getElementById('song2');
function chay() {
  const audio = document.getElementById('song1');
  const nature = document.getElementById('song2');
  audio.play();
  nature.pause();
}
function dung() {
  const audio = document.getElementById('song1');
  audio.pause();
}
function bat() {
  const nature = document.getElementById('song2');
  const audio = document.getElementById('song1');
  nature.play();
  audio.pause();
}
function tat() {
  const nature = document.getElementById('song2');
  nature.pause();
}
let saveButton = document.getElementById('bt-save')
saveButton.onclick = () => {
  let textContent = document.getElementById('expression').value
  let encoded = 'data:application/octet-stream;base64,' + btoa(unescape(encodeURIComponent(textContent)))
  let a = document.createElement('a')
  a.href = encoded
  a.download = 'expression.txt'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}