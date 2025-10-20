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

	// --- Resolve effective (cascaded) values for Visibility ---
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
	if (useSmNone) { // If explicitly hidden at SM
		if (!isHidden) classes.push('d-sm-none'); // Add hide class only if not already hidden
		isHidden = true;
	} else { // If explicitly visible (or inheriting visibility) at SM
		if (isHidden) classes.push('d-sm-block'); // Add show class only if previously hidden
		isHidden = false;

		// Apply SM settings if defined AND different from current
		if (smSize !== undefined && smSize !== currentSize) {
			classes.push(`col-sm-${smSize}`);
			currentSize = smSize;
		}
		if (smOffset !== undefined && smOffset !== currentOffset) {
			classes.push(`offset-sm-${smOffset}`);
			currentOffset = smOffset;
		}
		if (orderSm !== undefined && orderSm !== currentOrder) {
			if (orderSm === 'default' && currentOrder !== undefined && currentOrder !== 'default') {
				classes.push('order-sm-0'); // Reset needed
			} else if (orderSm !== 'default') {
				classes.push(`order-sm-${orderSm}`);
			}
			currentOrder = orderSm;
		}
	}


	// --- MD ---
	if (useMdNone) {
		if (!isHidden) classes.push('d-md-none');
		isHidden = true;
	} else {
		if (isHidden) classes.push('d-md-block');
		isHidden = false;

		if (mdSize !== undefined && mdSize !== currentSize) {
			classes.push(`col-md-${mdSize}`);
			currentSize = mdSize;
		}
		if (mdOffset !== undefined && mdOffset !== currentOffset) {
			classes.push(`offset-md-${mdOffset}`);
			currentOffset = mdOffset;
		}
		if (orderMd !== undefined && orderMd !== currentOrder) {
			if (orderMd === 'default' && currentOrder !== undefined && currentOrder !== 'default') {
				classes.push('order-md-0');
			} else if (orderMd !== 'default') {
				classes.push(`order-md-${orderMd}`);
			}
			currentOrder = orderMd;
		}
	}

	// --- LG ---
	if (useLgNone) {
		if (!isHidden) classes.push('d-lg-none');
		isHidden = true;
	} else {
		if (isHidden) classes.push('d-lg-block');
		isHidden = false;

		if (lgSize !== undefined && lgSize !== currentSize) {
			classes.push(`col-lg-${lgSize}`);
			currentSize = lgSize;
		}
		if (lgOffset !== undefined && lgOffset !== currentOffset) {
			classes.push(`offset-lg-${lgOffset}`);
			currentOffset = lgOffset;
		}
		if (orderLg !== undefined && orderLg !== currentOrder) {
			if (orderLg === 'default' && currentOrder !== undefined && currentOrder !== 'default') {
				classes.push('order-lg-0');
			} else if (orderLg !== 'default') {
				classes.push(`order-lg-${orderLg}`);
			}
			currentOrder = orderLg;
		}
	}

	// --- XL ---
	if (useXlNone) {
		if (!isHidden) classes.push('d-xl-none');
		isHidden = true;
	} else {
		if (isHidden) classes.push('d-xl-block');
		isHidden = false; // Not strictly needed for last breakpoint

		if (xlSize !== undefined && xlSize !== currentSize) {
			classes.push(`col-xl-${xlSize}`);
			// currentSize = xlSize; // Not needed
		}
		if (xlOffset !== undefined && xlOffset !== currentOffset) {
			classes.push(`offset-xl-${xlOffset}`);
			// currentOffset = xlOffset; // Not needed
		}
		if (orderXl !== undefined && orderXl !== currentOrder) {
			if (orderXl === 'default' && currentOrder !== undefined && currentOrder !== 'default') {
				classes.push('order-xl-0');
			} else if (orderXl !== 'default') {
				classes.push(`order-xl-${orderXl}`);
			}
			// currentOrder = orderXl; // Not needed
		}
	}

	return classes.join(' ');
};