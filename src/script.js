document.addEventListener('DOMContentLoaded', function () {
    const togglers = document.querySelectorAll('.context-menu-toggler');

    togglers.forEach((toggler) => {
        const contextMenu = toggler.querySelector('.context-menu');

        toggler.addEventListener('contextmenu', function (event) {
            event.preventDefault();
            const { clientX: mouseX, clientY: mouseY } = event;

            // Reset position to calculate actual dimensions
            contextMenu.style.top = '0px';
            contextMenu.style.left = '0px';
            contextMenu.classList.remove('tw-hidden');

            // Get menu dimensions
            const menuDimensions = contextMenu.getBoundingClientRect();

            // Calculate adjusted positions
            let adjustedX = mouseX;
            let adjustedY = mouseY;

            // Adjust horizontal position if needed
            if (mouseX + menuDimensions.width > window.innerWidth) {
                adjustedX = mouseX - menuDimensions.width;
            }

            // Adjust vertical position if needed
            if (mouseY + menuDimensions.height > window.innerHeight) {
                adjustedY = mouseY - menuDimensions.height;
            }

            // Ensure menu doesn't go beyond left or top edge
            adjustedX = Math.max(0, adjustedX);
            adjustedY = Math.max(0, adjustedY);

            // Apply final position
            contextMenu.style.top = `${adjustedY}px`;
            contextMenu.style.left = `${adjustedX}px`;

            // Hide initially for animation
            contextMenu.classList.add('tw-hidden');

            // Show with animation
            showContext(contextMenu);
        });

        document.addEventListener('mouseup', function (event) {
            if (event.button === 2 && event.target.closest('.context-menu-toggler') === toggler) {
                hideContext(contextMenu);
                setTimeout(() => showContext(contextMenu), 200);
            } else if (!event.target.closest('.context-menu-toggler')) {
                hideContext(contextMenu);
            } else {
                hideContext(contextMenu);
            }
        });
    });

    function showContext(contextMenu) {
        contextMenu.classList.remove('tw-hidden');
        contextMenu.classList.remove('tw-animate-scale-down');
        contextMenu.classList.add('tw-animate-scale-up');
    }

    function hideContext(contextMenu) {
        contextMenu.classList.remove('tw-animate-scale-up');
        contextMenu.classList.add('tw-animate-scale-down');

        setTimeout(() => contextMenu.classList.add('tw-hidden'), 200);
    }
});
