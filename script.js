document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
      
      // Toggle icon
      const icon = this.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });
  
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
          document.body.style.overflow = '';
          mobileMenuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
      });
    });
  
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-theme');
      const icon = this.querySelector('i');
      icon.classList.toggle('fa-moon');
      icon.classList.toggle('fa-sun');
      
      // Save preference
      const isDark = document.body.classList.contains('dark-theme');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  
    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    function setActiveLink() {
      let index = sections.length;
      
      while (--index && window.scrollY + 100 < sections[index].offsetTop) {}
      
      navItems.forEach(item => item.classList.remove('active'));
      navItems[index].classList.add('active');
    }
    
    setActiveLink();
    window.addEventListener('scroll', setActiveLink);
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Resume download tracking
    const downloadCv = document.querySelector('.download-cv');
    if (downloadCv) {
      downloadCv.addEventListener('click', function() {
        console.log('Resume downloaded');
        // Add analytics tracking here
      });
    }
  });