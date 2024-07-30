document.querySelector('.pane-hScroll').addEventListener('scroll', function() {
    document.querySelector('.pane-vScroll').style.width = 
      this.scrollWidth + this.scrollLeft + 'px';
  });
  