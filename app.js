function typeWriter(element, text, delay, callback) {
  let i = 0;
  element.style.visibility = "visible";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, delay);
    } else {
      setTimeout(() => {
        removeWriter(element, text, delay, callback);
      }, 1000);
    }
  }

  type();
}

function removeWriter(element, text, delay, callback) {
  let i = text.length;

  function remove() {
    if (i > 0) {
      element.innerHTML = text.substring(0, i - 1);
      i--;
      setTimeout(remove, delay);
    } else {
      setTimeout(() => {
        element.style.visibility = "hidden";
        if (callback) {
          callback();
        }
      }, 1000);
    }
  }

  remove();
}

function showElementsSequentially() {
  const elements = document.querySelectorAll("#content h2");
  let currentIndex = 0;

  function showNextElement() {
    const text = elements[currentIndex].textContent;
    elements[currentIndex].textContent = "";
    typeWriter(elements[currentIndex], text, 100, () => {
      currentIndex = (currentIndex + 1) % elements.length;
      showNextElement();
    });
  }

  showNextElement();
}

// Gọi hàm để bắt đầu hiệu ứng gõ chữ
showElementsSequentially();

// Hiển thị nút khi cuộn xuống
window.onscroll = function () {
  let backToTop = document.getElementById("back-to-top");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
};

// Cuộn về đầu trang khi nhấn vào nút
document.getElementById("back-to-top").onclick = function (event) {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

let lastScrollTop = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.remove("default");
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
    header.classList.add("default");
  }
});
