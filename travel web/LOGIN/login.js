console.clear();

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".wrapper",
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: true,
        markers: false
      }
    })
    .to("img", {
      scale: 2,
      z: 350,
      transformOrigin: "center center",
      ease: "power1.inOut"
    })
    .to(
      ".section.hero",
      {
        scale: 1.1,
        transformOrigin: "center center",
        ease: "power1.inOut"
      },
      "<"
    );
});


function showCreateAccount(event) {
  event.preventDefault(); // Prevent the default action of the anchor tag
  document.getElementById('login-section').style.display = 'none'; // Hide the Log In section
  document.getElementById('create-account-section').style.display = 'block'; // Show the Create Account section
}



  function showLogin(event) {
    event.preventDefault(); // Prevent the default action of the anchor tag
    document.getElementById('create-account-section').style.display = 'none'; // Hide the Create Account section
    document.getElementById('login-section').style.display = 'block'; // Show the Log In section
  }