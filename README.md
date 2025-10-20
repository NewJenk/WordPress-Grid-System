# WordPress Grid System

![License: GPL v3 or later](https://img.shields.io/badge/License-GPLv3%20or%20later-blue.svg?style=flat-square)
![Requires PHP: >= 7.4](https://img.shields.io/badge/PHP-%3E%3D%207.4-blue.svg?style=flat-square)
![WordPress Tested: 6.8.2](https://img.shields.io/badge/WordPress-tested%20up%20to%206.8.2-brightgreen.svg?style=flat-square)

A powerful grid system for WordPress. Includes 4 Gutenberg (Block Editor) blocks that allow you to create beautiful, flexible and responsive layouts.

---

## Overview

Grids are essential – they're the invisible structure, the metronome, that ensures consistency and helps designers and developers speak the same language.

The challenge of creating effective grid layouts is a well-explored topic in web development. But the grid layout problem is largely solved. Like many others, I initially went down the rabbit hole of trying to build a custom grid system. After countless hours, I realised I'd essentially just recreated what Bootstrap's incredibly robust, flexible and open-source 12-column grid already does perfectly. It was time spent reinventing a perfectly good wheel: a responsive, 12-column grid providing the ideal balance of power and flexibility for nearly any design.

Instead of introducing another proprietary system, this plugin provides a lightweight, modern implementation of the battle-tested grid system popularised by frameworks like Bootstrap. It's built on the idea that you should spend your time creating content, not fighting with layout fundamentals.

### How It Works

This plugin is lean by design. It includes **only the essential Bootstrap grid CSS** and a handful of responsive utility classes (totalling just **14KB** of minified CSS). There is no bloat from other components or JavaScript.

The system uses the standard `container > row > column` structure:
* **`.container`**: A wrapper that sets a `max-width` to keep your content neatly centred and readable.
* **`.row`**: A wrapper for columns that uses a negative margin to counteract the padding on its columns. This clever trick is the key to enabling seamless, infinite nesting of grids within other grids.
* **`.column`**: The block where your content lives. It comes with a complete set of responsive controls for width, offset, and visibility.

To ensure performance and reliability, the grid styles are enqueued globally using the standard WordPress method, as a solid grid is a foundational element expected on most pages of a modern website.

## Features

* **Effortless Responsive Layouts:** Build complex designs that automatically adapt to phones, tablets and desktops without writing any code.
* **Intuitive Block Controls:** Settings are clearly organised in the block sidebar using consistent dropdowns, making adjustments simple and visual.
* **Smart Inheritance + Easy Resets:** Set a style (like column width, alignment or order) for the smallest screen size (XS), and it automatically applies to all larger sizes. Need to change it just for tablets and up? Simply adjust the setting for the MD breakpoint. Want to go back to inheriting? Every setting for SM breakpoints and up has a Reset button – just click it! This saves you tons of time and makes responsive design incredibly intuitive.
* **5 Responsive Breakpoints:** Fine-tune your layout at five standard screen sizes (XS, SM, MD, LG, XL) for ultimate control. (But thanks to smart inheritance, you often only need to adjust two or three!)
* **Familiar 12-Column System:** Based on the world's most popular grid framework (Bootstrap), making it easy to understand and incredibly flexible.
* **Full Column Control:** Adjust column **width** (1-12), add horizontal space before columns (**offset**), change the visual **order** (First, Last, 0-12), and even **hide** columns completely – all controllable per breakpoint.
* **Advanced Row Alignment:** Easily align all columns within a row **vertically** (top, middle, bottom) and **horizontally** (left, centre, right, space between/around), all with responsive controls using the same smart inheritance system.
* **Responsive Spacing Utility:** Add vertical space between blocks that changes automatically based on screen size using the Responsive Spacer block.
* **Lightweight & Fast:** Includes only the essential grid CSS (14KB minified), ensuring you're not loading unnecessary css.
* **Modern & Consistent UI:** Built with the latest WordPress Block Editor standards and a unified control pattern across blocks for a seamless and familiar experience.

## How to Use

Getting started with the Grid System is easy! Here’s how you build a typical layout:

1.  **Add a Container:**
    * Click the '+' icon in the editor to open the Block Inserter.
    * Search for "Container" and click the `Grid: Container` block to add it. This is the main wrapper for your grid section.
    * In the block sidebar (Inspector Controls), you can choose if you want the container to be standard width (`.container`) or full-width (`.container-fluid`).

2.  **Add a Row:**
    * Click inside the Container block you just added.
    * Click the '+' icon *inside* the Container (or the one that appears when you hover) and search for "Row".
    * Add the `Grid: Row` block. This block needs to be directly inside a Container (or sometimes a Column, for nesting).

3.  **Add Columns:**
    * Click inside the Row block.
    * Click the '+' icon *inside* the Row and search for "Column".
    * Add the `Grid: Column` block. You can add multiple columns side-by-side within a single Row.
    * By default, a new column takes up the full width (12 parts).

4.  **Adjust Column Settings (Making it Responsive!):**
    * Click on a Column block.
    * Open the block sidebar (Inspector Controls). You'll see panels for different screen sizes (breakpoints):
        * **Extra Small (XS):** Applies from 0px up to 575px (Phones)
        * **Small (SM):** Applies from 576px up to 767px (Large phones, small tablets)
        * **Medium (MD):** Applies from 768px up to 991px (Tablets, small laptops)
        * **Large (LG):** Applies from 992px up to 1199px (Laptops, desktops)
        * **Extra Large (XL):** Applies from 1200px upwards (Large desktops)
    * **The Magic of Inheritance:** Settings flow upwards! Start by setting the **Columns** (width) and **Offset** for **Extra Small (XS)**. These settings will automatically apply to SM, MD, LG, and XL too!
    * **Overriding for Larger Screens:** Only change settings for larger breakpoints if you *need* the layout to be different. For example:
        * Set XS Columns to `12` (full width on phones).
        * Set MD Columns to `6` (half width on tablets and up). Now your column is full width on XS/SM and half width on MD/LG/XL. Easy!
    * **Reset Button:** Made a change on a larger breakpoint but want it to go back to inheriting? Just click the little 'Reset' (undo arrow) button next to the setting!
    * **Visibility:** Use the "Visibility" dropdown in each panel to hide or show the column specifically for that screen size and larger (unless overridden again).
    * **Pro Tip:** You often only need to adjust settings for **XS** and maybe **MD** or **LG**. Don't feel obligated to set something for every single breakpoint unless your design requires it! Keep it simple.

5.  **Adjust Row Settings:**
    * Click on the Row block.
    * Use the sidebar settings to control the **Vertical Alignment** (top, middle, bottom) and **Horizontal Alignment** (left, center, right, space between/around) of all the columns *within* that row.
    * These settings also use the same **smart inheritance** and **Reset** buttons as the Column block.
    * You can also toggle "No Gutters" to remove the default spacing around columns in that specific row.

6.  **Add a Responsive Spacer:**
    * Need to add vertical space between elements that changes on different devices?
    * Add the `Grid: Responsive Spacer` block wherever you need space (e.g., between two Row blocks).
    * Use the sidebar controls (which also use smart inheritance) to set the height of the spacer for each breakpoint.

7.  **Add Your Content:**
    * Click inside any Column block and use the '+' icon to add paragraphs, images, headings, buttons, or any other WordPress blocks!

## Included Blocks

* **Container (`grid-system/container`)**
    * **Purpose:** The outermost wrapper for your grid section. Controls the maximum width.
    * **Key Settings:** Full Width toggle.

* **Row (`grid-system/row`)**
    * **Purpose:** Holds and aligns columns horizontally.
    * **Key Settings:** Vertical Alignment, Horizontal Alignment (responsive with inheritance/reset), No Gutters toggle.

* **Column (`grid-system/column`)**
    * **Purpose:** The container for your content. Controls width, spacing, order and visibility per breakpoint.
    * **Key Settings:** Visibility (dropdown), Columns (Width), Offset, Order (all responsive with inheritance/reset).

* **Responsive Spacer (`grid-system/responsive-spacer`)**
    * **Purpose:** Adds adjustable vertical space between blocks. Unlike the core Spacer block which uses `height`, this block uses Bootstrap's `padding` utility classes (`p-*`) applied to an empty `div`. This allows the amount of space to change easily across different screen sizes using the responsive controls.
    * **Key Settings:** Height (responsive with inheritance/reset, corresponds to `p-*` classes 0-20).

## Utility Classes

This plugin relies on a small set of Bootstrap utility classes. The plugin ensures these are available:

* **Visibility:** `d-none`, `d-sm-none`... `d-xl-none`, `d-block`, `d-sm-block`... `d-xl-block`
* **Ordering:** `order-first`, `order-last`, `order-0`... `order-12`, `order-sm-first`... `order-xl-12`
* **Grid Structure:** `.container`, `.container-fluid`, `.row`, `.no-gutters`, `col-*`, `offset-*`
* **Row Alignment:** `align-items-*`, `justify-content-*` (and responsive variants)
* **Spacing:** `p-*` (and responsive variants). **Note:** This plugin extends Bootstrap's default scale, providing classes from `p-0` up to `p-20` to allow for finer control via the Responsive Spacer block.

## FAQ

### Does this plugin depend on any others?

Nope. It's completely self-contained.

### Does this create new database tables?

Nope. Block settings are saved within your page/post content, just like core blocks.

### Does this modify existing database tables?

Nope.

## Development Standards & Naming Conventions

To ensure consistency and prevent conflicts, please adhere to the following naming conventions. This guide reflects the specific standards used throughout the plugin.

| Type                 | Convention                                 | Example Usage                                                                            |
| :------------------- | :----------------------------------------- | :--------------------------------------------------------------------------------------- |
| **PHP Namespace** | `GRID_SYSTEM`                                | All PHP classes must be within this namespace.                                           |
| **PHP Constants** | `GRID_SYSTEM`                                | Prefix for all defined PHP constants, e.g., `GRID_SYSTEM_PLUGIN_PATH`.                     |
| **Prefix** | `grid_system`                                | A general prefix for non-class functions, hooks, or filters if needed.                   |
| **Asset Prefix & Text Domain** | `grid-system`                       | Used as the text domain, block namespaces, and prefix for custom CSS classes, e.g., `.grid-system__title`. |
| **Plugin Name** | Grid System                                  | The full name of the plugin for use in user-facing text.                                 |
| **Plugin URL** | `https://shaunjenkins.com/`                       | The primary URL for the plugin.                                                          |
| **Plugin Description** | A powerful grid system for WordPress. Includes 4 Gutenberg (Block Editor) blocks that allow you to create beautiful, flexible and responsive layouts. | The description for the plugin.                                                          |

## Requirements

* **WordPress:** Version 6.0 or higher (Tested up to **6.8.2**)
* **PHP:** Version 7.4 or higher

## Installation

**1. GitHub Download (ZIP):**

* Go to the **[Grid System GitHub repository](https://github.com/NewJenk/WordPress-Grid-System)** and click on the **Releases** tab.
* Download the latest release as a `.zip` file from the "Assets" section.
* In your WordPress admin dashboard, navigate to `Plugins` > `Add New` > `Upload Plugin`.
* Choose the downloaded ZIP file and click `Install Now`.
* Activate the plugin.

**2. Manual Upload (FTP/SFTP):**

* Download and extract the latest release `.zip` file from the **[GitHub Releases page](https://github.com/NewJenk/WordPress-Grid-System/releases)**.
* Upload the entire extracted folder (`grid-system`) to your WordPress `wp-content/plugins/` directory.
* In your WordPress admin dashboard, navigate to `Plugins` > `Installed Plugins`.
* Find "Grid System" and click `Activate`.

## Development Setup

To get started with developing this plugin, you'll need to have a local WordPress environment set up, as well as Node.js and npm installed on your machine.

The plugin's JavaScript assets are built from a `src` directory into a `build` directory. The following steps will guide you through setting up the local development environment.

### Prerequisites

* A local WordPress installation.
* [Node.js](https://nodejs.org/) (v16 or higher recommended).
* [npm](https://www.npmjs.com/) (usually comes with Node.js).

### Installation & Setup

1.  **Navigate to your Plugins Folder:**
    Open your terminal and navigate to the `wp-content/plugins/` directory of your local WordPress installation.
    ```bash
    # Example command:
    cd ~/sites/my-wordpress-site/wp-content/plugins/
    ```

2.  **Clone the Repository:**
    Clone the repository from GitHub.
    ```bash
    git clone [https://github.com/NewJenk/WordPress-Grid-System.git](https://github.com/NewJenk/WordPress-Grid-System.git) grid-system
    ```

3.  **Enter the Plugin Directory:**
    Navigate into the newly created plugin folder.
    ```bash
    cd grid-system
    ```

4.  **Install Dependencies:**
    Install all the necessary npm packages.
    ```bash
    npm install
    ```

5.  **Start the Development Process:**
    Run the `start` script. This will watch for any changes you make to the JavaScript or SCSS files in the `src` directory, automatically recompile them, and provide hot-reloading in the editor.
    ```bash
    npm run start
    ```

6.  **Create a Production Build:**
    When you are ready to commit your changes or deploy the plugin, run the `build` script. This will create optimised and minified versions of the assets in the `build` directory.
    ```bash
    npm run build
    ```

### Available Scripts

* `npm run start`: Starts a development server that watches for file changes and rebuilds assets automatically.
* `npm run build`: Compiles and optimises all assets for a production environment.

## Changelog

For a detailed history of changes, please see the `CHANGELOG.md` file.