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
