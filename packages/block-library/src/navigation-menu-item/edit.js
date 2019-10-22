/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';
import {
	ExternalLink,
	PanelBody,
	TextareaControl,
	TextControl,
	Toolbar,
	ToggleControl,
	ToolbarButton,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
	BlockControls,
	InnerBlocks,
	InspectorControls,
	PlainText,
	URLPopover,
} from '@wordpress/block-editor';
import {
	Fragment,
	useRef,
	useState,
} from '@wordpress/element';

function NavigationMenuItemEdit( {
	attributes,
	isSelected,
	isParentOfSelectedBlock,
	setAttributes,
} ) {
	const plainTextRef = useRef( null );
	const [ isLinkOpen, setLinkOpen ] = useState( false );
	const { label, url } = attributes;
	let content;
	if ( isSelected ) {
		content = (
			<div className="wp-block-navigation-menu-item__edit-container">
				<PlainText
					ref={ plainTextRef }
					className="wp-block-navigation-menu-item__field"
					value={ label }
					onChange={ ( labelValue ) => setAttributes( { label: labelValue } ) }
					aria-label={ __( 'Navigation Label' ) }
					maxRows={ 1 }
				/>
			</div>
		);
	} else {
		content = label;
	}
	return (
		<Fragment>
			<BlockControls>
				<Toolbar>
					<ToolbarButton
						name="link"
						icon="admin-links"
						title={ __( 'Link' ) }
						onClick={ () => setLinkOpen( ! isLinkOpen ) }
					/>
					{ isLinkOpen &&
					<>
						<URLPopover
							className="wp-block-navigation-menu-item__inline-link-input"
						>
							<URLPopover.LinkEditor
								value={ url }
								onChangeInputValue={ ( value ) => setAttributes( { url: value } ) }
							/>
						</URLPopover>
					</>
					}
				</Toolbar>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={ __( 'Menu Settings' ) }
				>
					<ToggleControl
						checked={ attributes.opensInNewTab }
						onChange={ ( opensInNewTab ) => {
							setAttributes( { opensInNewTab } );
						} }
						label={ __( 'Open in new tab' ) }
					/>
					<TextareaControl
						value={ attributes.description || '' }
						onChange={ ( description ) => {
							setAttributes( { description } );
						} }
						label={ __( 'Description' ) }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'SEO Settings' ) }
				>
					<TextControl
						value={ attributes.title || '' }
						onChange={ ( title ) => {
							setAttributes( { title } );
						} }
						label={ __( 'Title Attribute' ) }
						help={ __( 'Provide more context about where the link goes.' ) }
					/>
					<ToggleControl
						checked={ attributes.nofollow }
						onChange={ ( nofollow ) => {
							setAttributes( { nofollow } );
						} }
						label={ __( 'Add nofollow to menu item' ) }
						help={ (
							<Fragment>
								{ __( 'Don\'t let search engines follow this link.' ) }
								<ExternalLink
									className="wp-block-navigation-menu-item__nofollow-external-link"
									href={ __( 'https://codex.wordpress.org/Nofollow' ) }
								>
									{ __( 'What\'s this?' ) }
								</ExternalLink>
							</Fragment>
						) }
					/>
				</PanelBody>
			</InspectorControls>
			<div className="wp-block-navigation-menu-item">
				{ content }
				{ ( isSelected || isParentOfSelectedBlock ) &&
					<InnerBlocks
						allowedBlocks={ [ 'core/navigation-menu-item' ] }
					/>
				}
			</div>
		</Fragment>
	);
}

export default withSelect( ( select, ownProps ) => {
	const { hasSelectedInnerBlock } = select( 'core/block-editor' );
	const { clientId } = ownProps;

	return {
		isParentOfSelectedBlock: hasSelectedInnerBlock( clientId, true ),
	};
} )( NavigationMenuItemEdit );
