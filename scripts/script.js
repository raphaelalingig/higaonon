// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add active state to navigation based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".section, .hero");
  const navLinks = document.querySelectorAll("nav a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.style.background = "rgba(255,255,255,0.1)";
    link.style.borderColor = "transparent";
    if (link.getAttribute("href") === `#${current}`) {
      link.style.background = "#d4af37";
      link.style.color = "#1a1a1a";
      link.style.borderColor = "#1a1a1a";
    }
  });
});

// Add entrance animation to cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "0";
      entry.target.style.transform = "translateY(20px)";
      setTimeout(() => {
        entry.target.style.transition = "all 0.6s ease";
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }, 100);
    }
  });
}, observerOptions);

document.querySelectorAll(".card").forEach((card) => {
  observer.observe(card);
});

// Video Modal Functions
let currentVideoSrc = "";
let currentVideoTitle = "";

function openVideoModal(src, title) {
  currentVideoSrc = src;
  currentVideoTitle = title;

  const modal = document.getElementById("videoModal");
  const container = modal.querySelector(".video-placeholder");

  container.innerHTML = `
    <h2>🎥 ${title}</h2>
    <video controls autoplay style="width:100%; max-height:70vh; background:#000;">
      <source src="${src}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <button class="skip-video" onclick="closeVideo()">Close</button>
  `;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  document.body.style.pointerEvents = "none";
  modal.style.pointerEvents = "auto";
}

function closeVideo() {
  const modal = document.getElementById("videoModal");
  const video = modal.querySelector("video");

  if (video) {
    video.pause();
    video.currentTime = 0;
  }

  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
  document.body.style.pointerEvents = "auto";
}

// Optional: Close modal when clicking outside
document.getElementById("videoModal").addEventListener("click", function (e) {
  if (e.target === this) closeVideo();
});
function showVideo() {
  const modal = document.getElementById("videoModal");
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  document.body.style.pointerEvents = "none"; // Block interaction
  modal.style.pointerEvents = "auto"; // Allow modal interaction
}

// Show video on page load
window.addEventListener("load", () => {
  showVideo();
});

document.querySelectorAll(".play-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const audio = btn.closest(".tradition-item").querySelector("audio");
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      btn.textContent = "Pause";
    } else {
      audio.pause();
      btn.textContent = "Play Song";
    }
  });
});

// Flip card function
function flipCard(card) {
  card.classList.toggle("flipped");
}
