window.addEventListener('scroll', function() {
  var scrollPosition = window.scrollY;
  var text = document.querySelector('.text');
  var offset = 200; // Adjust the offset as needed
  
  // Update text position based on scroll position
  text.style.transform = 'translate(-50%, calc(-50% + ' + (scrollPosition / 2) + 'px - ' + (offset / 2) + 'px))';
});
