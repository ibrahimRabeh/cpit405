// Dark Mode Toggle
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  const isDark = document.documentElement.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initial Theme Setup
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Typewriter Animation
  const roles = [
    "Software Engineer",
    "AI Integration",
    "Web Development",
    "Automation",
    "UI/UX Designer",
    "Cloud Engineer"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterElement = document.getElementById('typewriter');
  
  function typeWriter() {
    if (!typewriterElement) return;
    
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500; // Pause before typing next word
    }
    
    setTimeout(typeWriter, typeSpeed);
  }
  
  // Start typewriter if element exists
  if (typewriterElement) {
    setTimeout(typeWriter, 1000);
  }
});
