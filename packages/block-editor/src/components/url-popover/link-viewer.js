/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	ExternalLink,
	IconButton,
} from '@wordpress/components';
import { safeDecodeURI, filterURLForDisplay } from '@wordpress/url';

function LinkViewerUrl( { url, urlLabel, className, isFullWidth } ) {
	const linkClassName = classnames(
		className,
		'block-editor-url-popover__link-viewer-url',
		{
			'is-full-width': isFullWidth,
		}
	);

	if ( ! url ) {
		return <span className={ linkClassName }></span>;
	}

	return (
		<ExternalLink
			className={ linkClassName }
			href={ url }
		>
			{ urlLabel || filterURLForDisplay( safeDecodeURI( url ) ) }
		</ExternalLink>
	);
}

export default function LinkViewer( {
	className,
	isFullWidth,
	linkClassName,
	onEditLinkClick,
	url,
	urlLabel,
	...props
} ) {
	return (
		<div
			className={ classnames(
				'block-editor-url-popover__link-viewer',
				className
			) }
			{ ...props }
		>
			<LinkViewerUrl url={ url } urlLabel={ urlLabel } className={ linkClassName } isFullWidth={ isFullWidth } />
			{ onEditLinkClick && <IconButton icon="edit" label={ __( 'Edit' ) } onClick={ onEditLinkClick } /> }
		</div>
	);
}
