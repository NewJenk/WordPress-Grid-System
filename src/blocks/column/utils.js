/**
 * Generates the responsive column class string from attributes.
 *
 * @param {Object} attributes The block attributes.
 * @return {string} The generated class string.
 */
export const getColumnClasses = ( attributes ) => {
	const {
		xsNone,
		allSize,
		allOffset,
		orderXs,
		smNone,
		smSize,
		smOffset,
		orderSm,
		mdNone,
		mdSize,
		mdOffset,
		orderMd,
		lgNone,
		lgSize,
		lgOffset,
		orderLg,
		xlNone,
		xlSize,
		xlOffset,
		orderXl,
	} = attributes;

	const classes = [];

	// Visibility uses simple true/false, not inheritance in the class logic
	// The editor UI handles showing the effective state, but the attributes are explicit true/false/undefined
	const useXsNone = xsNone;
	const useSmNone = smNone;
	const useMdNone = mdNone;
	const useLgNone = lgNone;
	const useXlNone = xlNone;

	// --- Resolve inherited values for Size, Offset, Order ---
	let currentSize = allSize;
	let currentOffset = allOffset || 0;
	let currentOrder = orderXs;
	let isHidden = useXsNone; // Start with XS visibility state

	// --- XS ---
	if (isHidden) {
		classes.push('d-none');
	} else {
		classes.push(`col-${currentSize}`);
		if (currentOffset > 0) {
			classes.push(`offset-${currentOffset}`);
		}
		if (currentOrder !== undefined && currentOrder !== 'default') {
			classes.push(`order-${currentOrder}`);
		}
	}

	// --- SM ---
	let smJustBecameVisible = false;
	if (useSmNone) { // If explicitly hidden at SM
		if (!isHidden) classes.push('d-sm-none'); // Add hide class only if not already hidden
		isHidden = true;
	} else { // If explicitly visible (or inheriting visibility) at SM
		if (isHidden) {
			classes.push('d-sm-block'); // Add show class only if previously hidden
			smJustBecameVisible = true;
		}
		isHidden = false;

		// Apply SM settings if defined AND different from current,
		// OR if we just became visible (must restate class)
		const smSizeChanged = smSize !== undefined && smSize !== currentSize;
		if (smSizeChanged) {
			classes.push(`col-sm-${smSize}`);
			currentSize = smSize;
		} else if (smJustBecameVisible) {
			classes.push(`col-sm-${currentSize}`);
		}

		const smOffsetChanged = smOffset !== undefined && smOffset !== currentOffset;
		if (smOffsetChanged) {
			classes.push(`offset-sm-${smOffset}`);
			currentOffset = smOffset;
		} else if (smJustBecameVisible && currentOffset > 0) {
			classes.push(`offset-sm-${currentOffset}`);
		}

		const smOrderChanged = orderSm !== undefined && orderSm !== currentOrder;
		if (smOrderChanged) {
			if (orderSm === 'default' && currentOrder !== undefined && currentOrder !== 'default') {
				classes.push('order-sm-0'); // Reset needed
			} else if (orderSm !== 'default') {
				classes.push(`order-sm-${orderSm}`);
			}
			currentOrder = orderSm;
		} else if (smJustBecameVisible && currentOrder !== undefined && currentOrder !== 'default') {
			classes.push(`order-sm-${currentOrder}`);
		}
	}


	// --- MD ---
	let mdJustBecameVisible = false;
	if (useMdNone) {
		if (!isHidden) classes.push('d-md-none');
		isHidden = true;
	} else {
		if (isHidden) {
			classes.push('d-md-block');
			mdJustBecameVisible = true;
		}
		isHidden = false;

		const mdSizeChanged = mdSize !== undefined && mdSize !== currentSize;
		if (mdSizeChanged) {
			classes.push(`col-md-${mdSize}`);
			currentSize = mdSize;
		} else if (mdJustBecameVisible) {
			classes.push(`col-md-${currentSize}`);
		}

		const mdOffsetChanged = mdOffset !== undefined && mdOffset !== currentOffset;
		if (mdOffsetChanged) {
			classes.push(`offset-md-${mdOffset}`);
			currentOffset = mdOffset;
		} else if (mdJustBecameVisible && currentOffset > 0) {
			classes.push(`offset-md-${currentOffset}`);
		}

		const mdOrderChanged = orderMd !== undefined && orderMd !== currentOrder;
		if (mdOrderChanged) {
			if (orderMd === 'default' && currentOrder !== undefined && currentOrder !== 'default') {
				classes.push('order-md-0');
			} else if (orderMd !== 'default') {
				classes.push(`order-md-${orderMd}`);
			}
			currentOrder = orderMd;
		} else if (mdJustBecameVisible && currentOrder !== undefined && currentOrder !== 'default') {
			classes.push(`order-md-${currentOrder}`);
		}
	}

	// --- LG ---
	let lgJustBecameVisible = false;
	if (useLgNone) {
		if (!isHidden) classes.push('d-lg-none');
		isHidden = true;
	} else {
		if (isHidden) {
			classes.push('d-lg-block');
			lgJustBecameVisible = true;
		}
		isHidden = false;

		const lgSizeChanged = lgSize !== undefined && lgSize !== currentSize;
		if (lgSizeChanged) {
			classes.push(`col-lg-${lgSize}`);
			currentSize = lgSize;
		} else if (lgJustBecameVisible) {
			classes.push(`col-lg-${currentSize}`);
		}

		const lgOffsetChanged = lgOffset !== undefined && lgOffset !== currentOffset;
		if (lgOffsetChanged) {
			classes.push(`offset-lg-${lgOffset}`);
			currentOffset = lgOffset;
		} else if (lgJustBecameVisible && currentOffset > 0) {
			classes.push(`offset-lg-${currentOffset}`);
		}

		const lgOrderChanged = orderLg !== undefined && orderLg !== currentOrder;
		if (lgOrderChanged) {
			if (orderLg === 'default' && currentOrder !== undefined && currentOrder !== 'default') {
				classes.push('order-lg-0');
			} else if (orderLg !== 'default') {
				classes.push(`order-lg-${orderLg}`);
			}
			currentOrder = orderLg;
		} else if (lgJustBecameVisible && currentOrder !== undefined && currentOrder !== 'default') {
			classes.push(`order-lg-${currentOrder}`);
		}
	}

	// --- XL ---
	let xlJustBecameVisible = false;
	if (useXlNone) {
		if (!isHidden) classes.push('d-xl-none');
		isHidden = true;
	} else {
		if (isHidden) {
			classes.push('d-xl-block');
			xlJustBecameVisible = true;
		}
		isHidden = false;

		const xlSizeChanged = xlSize !== undefined && xlSize !== currentSize;
		if (xlSizeChanged) {
			classes.push(`col-xl-${xlSize}`);
			// currentSize = xlSize; // Not needed
		} else if (xlJustBecameVisible) {
			classes.push(`col-xl-${currentSize}`);
		}

		const xlOffsetChanged = xlOffset !== undefined && xlOffset !== currentOffset;
		if (xlOffsetChanged) {
			classes.push(`offset-xl-${xlOffset}`);
			// currentOffset = xlOffset; // Not needed
		} else if (xlJustBecameVisible && currentOffset > 0) {
			classes.push(`offset-xl-${currentOffset}`);
		}

		const xlOrderChanged = orderXl !== undefined && orderXl !== currentOrder;
		if (xlOrderChanged) {
			if (orderXl === 'default' && currentOrder !== undefined && currentOrder !== 'default') {
				classes.push('order-xl-0');
			} else if (orderXl !== 'default') {
				classes.push(`order-xl-${orderXl}`);
			}
			// currentOrder = orderXl; // Not needed
		} else if (xlJustBecameVisible && currentOrder !== undefined && currentOrder !== 'default') {
			classes.push(`order-xl-${currentOrder}`);
		}
	}

	return classes.join(' ');
};