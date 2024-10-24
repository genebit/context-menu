document.addEventListener('DOMContentLoaded', function () {
    const togglers = document.querySelectorAll('.context-menu-toggler');

    togglers.forEach((toggler) => {
        const contextMenu = toggler.querySelector('.context-menu');

        toggler.addEventListener('contextmenu', function (event) {
            event.preventDefault();
            const { clientX: mouseX, clientY: mouseY } = event;

            contextMenu.style.top = `${mouseY}px`;
            contextMenu.style.left = `${mouseX}px`;

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
        // show the context menu
        contextMenu.classList.remove('tw-hidden');
        contextMenu.classList.remove('tw-animate-scale-down');

        contextMenu.classList.add('tw-animate-scale-up');
    }

    function hideContext(contextMenu) {
        // hide the context menu
        contextMenu.classList.remove('tw-animate-scale-up');
        contextMenu.classList.add('tw-animate-scale-down');

        setTimeout(() => {
            contextMenu.classList.add('tw-hidden');
        }, 200);
    }
});
