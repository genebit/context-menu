class ContextMenu {
    constructor(config) {
        this.config = config;
        this.trigger = document.querySelector(config.trigger);
        if (!this.trigger) {
            throw new Error(`Trigger element ${config.trigger} not found`);
        }

        this.init();
    }

    init() {
        this.createMenuStructure();
        this.setupEventListeners();
    }

    createMenuStructure() {
        if (!this.trigger.querySelector('.context-menu')) {
            const menuContainer = document.createElement('div');
            menuContainer.className = 'context-menu tw-hidden';

            // Add header if specified
            if (this.config.header) {
                const header = this.createHeader();
                menuContainer.appendChild(header);
            }

            // Process each section
            this.config.sections.forEach((section, index) => {
                // Create container for menu items
                const itemContainer = document.createElement('div');
                itemContainer.className = 'context-menu-item-container';

                // Add the items from this section
                section.items.forEach((item) => {
                    const menuItem = this.createMenuItem(item);
                    itemContainer.appendChild(menuItem);
                });

                menuContainer.appendChild(itemContainer);
                this.trigger.appendChild(menuContainer);
                this.contextMenu = menuContainer;

                // Add divider after section if not the last section
                if (index < this.config.sections.length - 1) {
                    const divider = document.createElement('div');
                    divider.className = 'context-menu-item-divider';
                    menuContainer.appendChild(divider);
                }
            });
        }
    }

    createHeader() {
        const header = document.createElement('header');
        const heading = document.createElement('h6');
        heading.className = 'context-menu-heading';
        heading.textContent = this.config.header;

        const divider = document.createElement('div');
        divider.className = 'context-menu-item-divider';

        header.appendChild(heading);
        header.appendChild(divider);
        return header;
    }

    createMenuItem(item) {
        const menuItem = document.createElement('section');
        menuItem.className = 'context-menu-item';

        const contentDiv = document.createElement('div');

        // Add prefix icon if specified
        if (item.prefixIcon) {
            const icon = document.createElement('i');
            icon.className = `context-menu-prefix-icon ${item.prefixIcon}`;
            contentDiv.appendChild(icon);
        } else {
            const spacer = document.createElement('i');
            spacer.className = 'context-menu-prefix-icon ri-square-line tw-invisible';
            contentDiv.appendChild(spacer);
        }

        // Add text
        const text = document.createElement('span');
        text.className = 'context-menu-text';
        text.textContent = item.text;
        contentDiv.appendChild(text);

        menuItem.appendChild(contentDiv);

        // Add suffix if specified
        if (item.suffix) {
            const suffixDiv = document.createElement('span');
            suffixDiv.className = 'context-menu-suffix';
            suffixDiv.innerHTML = item.suffix;
            menuItem.appendChild(suffixDiv);
        }

        // Add click handler if specified
        if (item.onClick) {
            menuItem.addEventListener('click', (e) => {
                item.onClick(e);
            });
        }

        return menuItem;
    }

    setupEventListeners() {
        this.trigger.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            this.showMenuAtPosition(event.clientX, event.clientY);
        });

        document.addEventListener('mouseup', (event) => {
            if (event.button === 2 && event.target.closest(this.config.trigger) === this.trigger) {
                this.hideMenu();
                setTimeout(() => this.showMenuAtPosition(event.clientX, event.clientY), 200);
            } else if (!event.target.closest(this.config.trigger)) {
                this.hideMenu();
            } else {
                this.hideMenu();
            }
        });
    }

    showMenuAtPosition(mouseX, mouseY) {
        // Reset position to calculate actual dimensions
        this.contextMenu.style.top = '0px';
        this.contextMenu.style.left = '0px';
        this.contextMenu.classList.remove('tw-hidden');

        // Get menu dimensions
        const menuDimensions = this.contextMenu.getBoundingClientRect();

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
        this.contextMenu.style.top = `${adjustedY}px`;
        this.contextMenu.style.left = `${adjustedX}px`;

        // Show with animation
        this.showMenu();
    }

    showMenu() {
        this.contextMenu.classList.remove('tw-hidden');
        this.contextMenu.classList.remove('tw-animate-scale-down');
        this.contextMenu.classList.add('tw-animate-scale-up');
    }

    hideMenu() {
        this.contextMenu.classList.remove('tw-animate-scale-up');
        this.contextMenu.classList.add('tw-animate-scale-down');
        setTimeout(() => this.contextMenu.classList.add('tw-hidden'), 200);
    }
}

// Make ContextMenu available globally
window.ContextMenu = ContextMenu;
