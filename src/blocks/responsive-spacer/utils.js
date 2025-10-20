/**
 * Generates the responsive spacer class string from attributes.
 *
 * @param {Object} attributes The block attributes.
 * @return {string} The generated class string.
 */
export const getSpacerClasses = ( attributes ) => {
	const {
		paddingBottomXs,
		paddingBottomSm,
		paddingBottomMd,
		paddingBottomLg,
		paddingBottomXl,
	} = attributes;

	const classes = [];
	let currentPadding = paddingBottomXs; // Base value (guaranteed to have a default)

	// --- Smart Spacer Class Logic ---

	// 1. Always add the base (xs) class.
	classes.push( `p-${ currentPadding }` );

	// 2. Add breakpoint-specific classes ONLY if they are defined (not inheriting)
	//    and are different from the current cascaded value.

	if ( paddingBottomSm !== undefined && paddingBottomSm !== currentPadding ) {
		classes.push( `p-sm-${ paddingBottomSm }` );
		currentPadding = paddingBottomSm; // Update the cascaded value
	}

	if ( paddingBottomMd !== undefined && paddingBottomMd !== currentPadding ) {
		classes.push( `p-md-${ paddingBottomMd }` );
		currentPadding = paddingBottomMd;
	}

	if ( paddingBottomLg !== undefined && paddingBottomLg !== currentPadding ) {
		classes.push( `p-lg-${ paddingBottomLg }` );
		currentPadding = paddingBottomLg;
	}

	if ( paddingBottomXl !== undefined && paddingBottomXl !== currentPadding ) {
		classes.push( `p-xl-${ paddingBottomXl }` );
		// No need to update currentPadding after the last breakpoint
	}

	return classes.join( ' ' );
};