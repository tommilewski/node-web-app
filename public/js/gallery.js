document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".gallery-grid img");
    const modal = document.getElementById("imageModal");
    
    if (images.length > 0 && modal) {
        let currentImageIndex = 0;

        function openModal(index) {
            const modalImage = document.getElementById("modalImage");
            modalImage.src = images[index].src;
            modal.style.display = "flex";
            currentImageIndex = index;
        }

        images.forEach(function(image, index) {
            image.addEventListener("click", function() {
                openModal(index);
            });
        });

        document.querySelector(".close")?.addEventListener("click", function() {
            modal.style.display = "none";
        });

        window.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });

        document.getElementById("prev")?.addEventListener("click", function() {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            openModal(currentImageIndex);
        });

        document.getElementById("next")?.addEventListener("click", function() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            openModal(currentImageIndex);
        });
    }
});