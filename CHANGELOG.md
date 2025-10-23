# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-10-23

### Added
- **`grid-system/column` block:**
    - Added **Auto Width** (`col-auto`) support, allowing columns to automatically size based on their content.
    - An "Auto" toggle button is now included next to the "Columns" `RangeControl` for all breakpoints.
    - This new setting is fully integrated with the **Smart Inheritance** and **Reset** button logic, allowing responsive "Auto" widths that cascade correctly.

### Changed
- Updated `block.json` for `grid-system/column`: all size attributes (e.g., `allSize`, `smSize`) are now type `string` instead of `number` to accommodate the "auto" value.
- Added all `col-auto` responsive variants (e.g., `col-sm-auto`, `col-md-auto`) to the core `grid.css` file.

## [1.0.0] - 2025-10-20

### Added
- Initial release of the Grid System plugin!
- Added `grid-system/container` block:
    - Simple toggle for `.container` (fixed-width) or `.container-fluid` (full-width).
- Added `grid-system/row` block:
    - Responsive **Vertical Alignment** (`align-items-*`) controls across 5 breakpoints.
    - Responsive **Horizontal Alignment** (`justify-content-*`) controls across 5 breakpoints.
    - **Smart Inheritance:** Alignment settings cascade from smaller to larger breakpoints.
    - **Reset Buttons:** Easily revert alignment settings on larger breakpoints to inherit from smaller ones.
    - **No Gutters** toggle to remove column padding within the row.
- Added `grid-system/column` block:
    - Responsive **Width** (`col-*`, 1-12) controls across 5 breakpoints.
    - Responsive **Offset** (`offset-*`, 0-11) controls across 5 breakpoints.
    - Responsive **Order** (`order-*`, First, Last, 0-12) controls across 5 breakpoints.
    - Responsive **Visibility** (`d-none`/`d-*-block`) controls across 5 breakpoints (using dropdown UI).
    - **Smart Inheritance:** Width, Offset and Order settings cascade from smaller to larger breakpoints.
    - **Reset Buttons:** Easily revert Width, Offset and Order settings on larger breakpoints to inherit.
- Added `grid-system/responsive-spacer` block:
    - Responsive **Height** (`pb-*`, 0-20) controls across 5 breakpoints.
    - **Smart Inheritance:** Height settings cascade from smaller to larger breakpoints.
    - **Reset Buttons:** Easily revert Height settings on larger breakpoints.
- **Modern Architecture:** All blocks built using `block.json`, `apiVersion: 3`, separate `edit.js`/`save.js` and modern React hooks (`useBlockProps`, `useInnerBlocksProps`).
- **Consistent UI:** Implemented a unified dropdown control (`SettingsDropdown`) for Visibility, Alignment and Order settings across blocks.
- **Lean CSS:** Includes a minimized set of essential Bootstrap v4.6 grid, alignment, order, visibility and extended spacing utility classes (`pb-0` to `pb-20`).
- All user-facing strings are translatable (`grid-system` text domain).