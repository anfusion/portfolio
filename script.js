
  const triggers = document.querySelectorAll('.cool > li');
  const background = document.querySelector('.dropdownBackground');
  const nav = document.querySelector('.top');

  function handleEnter (e) {

    this.classList.add('trigger-enter');
    setTimeout(() => {
      if(this.classList.contains('trigger-enter')) { //prevent following running if mouseleave occurs before 150ms
        this.classList.add('trigger-enter-active'), 150;
      }
    });
  
    background.classList.add('open');
    const dropdown = this.querySelector('.dropdown')
    const dropdownCoords = dropdown.getBoundingClientRect();
    const navCoords = nav.getBoundingClientRect();

    atag = this.querySelector('a');

    const coords = {
      height: dropdownCoords.height,
      width: dropdownCoords.width,
      top: dropdownCoords.top - navCoords.top,
      left: dropdownCoords.left - navCoords.left,
    }

    background.style.height = `${coords.height}px`;
    background.style.width = `${coords.width}px`;
    background.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
    
}

  function handleLeave (e) {
    this.classList.remove('trigger-enter-active', 'trigger-enter'); 
    background.classList.remove('open');
}

  triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
  triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));