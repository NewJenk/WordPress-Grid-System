/**
 * Generates the responsive row class string from attributes.
 *
 * @param {Object} attributes The block attributes.
 *@return {string} The generated class string.
 */
export const getRowClasses = ( attributes ) => {
	const {
		noGutters,
		alignItemsXs,
		alignItemsSm,
		alignItemsMd,
		alignItemsLg,
		alignItemsXl,
		justifyContentXs,
		justifyContentSm,
		justifyContentMd,
		justifyContentLg,
		justifyContentXl,
	} = attributes;

	const classes = [ 'row' ];

	if ( noGutters ) {
		classes.push( 'no-gutters' );
	}

	// --- Smart Vertical Alignment (align-items) ---
	// 1. Set the base (xs) alignment. This class is always added.
	let currentAlign = alignItemsXs;
	classes.push( `align-items-${ currentAlign }` );

	// 2. Add breakpoint-specific classes ONLY if they are defined (not inheriting)
	//    and are different from the current cascaded value.
	if ( alignItemsSm && alignItemsSm !== currentAlign ) {
		classes.push( `align-items-sm-${ alignItemsSm }` );
		currentAlign = alignItemsSm;
	}
	if ( alignItemsMd && alignItemsMd !== currentAlign ) {
		classes.push( `align-items-md-${ alignItemsMd }` );
		currentAlign = alignItemsMd;
	}
	if ( alignItemsLg && alignItemsLg !== currentAlign ) {
		classes.push( `align-items-lg-${ alignItemsLg }` );
		currentAlign = alignItemsLg;
	}
	if ( alignItemsXl && alignItemsXl !== currentAlign ) {
		classes.push( `align-items-xl-${ alignItemsXl }` );
	}

	// --- Smart Horizontal Alignment (justify-content) ---
	// 1. Set the base (xs) alignment.
	let currentJustify = justifyContentXs;
	classes.push( `justify-content-${ currentJustify }` );

	// 2. Add breakpoint-specific classes ONLY if they are defined
	//    and are different from the current cascaded value.
	if ( justifyContentSm && justifyContentSm !== currentJustify ) {
		classes.push( `justify-content-sm-${ justifyContentSm }` );
		currentJustify = justifyContentSm;
	}
	if ( justifyContentMd && justifyContentMd !== currentJustify ) {
		classes.push( `justify-content-md-${ justifyContentMd }` );
		currentJustify = justifyContentMd;
	}
	if ( justifyContentLg && justifyContentLg !== currentJustify ) {
		classes.push( `justify-content-lg-${ justifyContentLg }` );
		currentJustify = justifyContentLg;
	}
	if ( justifyContentXl && justifyContentXl !== currentJustify ) {
		classes.push( `justify-content-xl-${ justifyContentXl }` );
	}

	return classes.join( ' ' );
};