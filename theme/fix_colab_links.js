document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("a[href*='colab.research.google.com']");
  links.forEach((link) => {
    // Bỏ đuôi .html bị mdbook tự động chèn thêm vào cuối URL Colab
    if (link.href.endsWith(".html")) {
      link.href = link.href.slice(0, -5);
    }
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    link.setAttribute("referrerpolicy", "no-referrer");
  });
});