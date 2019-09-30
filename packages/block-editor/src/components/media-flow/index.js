/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	FormFileUpload,
	MenuItem,
	Toolbar,
	withNotices,
} from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import BlockControls from '../block-controls';
import MediaUpload from '../media-upload';
import MediaUploadCheck from '../media-upload/check';
import LinkEditor from '../url-popover/link-editor';
import LinkViewer from '../url-popover/link-viewer';

const MediaFlow = (
	{
		mediaUpload,
		mediaURL,
		allowedTypes,
		onSelect,
		onSelectURL,
		noticeOperations,
		name = __( 'Replace' ),
		multiple = false,
	}
) => {
	const [ showURLInput, setshowURLInput ] = useState( false );
	const [ showEditURLInput, setshowEditURLInput ] = useState( false );
	const [ mediaURLValue, setMediaURLValue ] = useState( mediaURL );

	let mediaFlowOptionsMenu;
	const getMediaFlowRef = ( element ) => {
		mediaFlowOptionsMenu = element;
	};

	const selectMedia = ( media ) => {
		onSelect( media );
		setMediaURLValue( media.url );
	};

	const onUploadError = ( message ) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	};

	const uploadFiles = ( event ) => {
		const files = event.target.files;
		let setMedia;
		if ( multiple ) {
			setMedia = selectMedia;
		} else {
			setMedia = ( [ media ] ) => {
				if ( !! mediaFlowOptionsMenu ) {
					mediaFlowOptionsMenu.close();
				}
				selectMedia( media );
			};
		}
		mediaUpload( {
			allowedTypes,
			filesList: files,
			onFileChange: setMedia,
			onUploadError,
		} );
	};

	const fileUploadButton = (
		<FormFileUpload
			onChange={ uploadFiles }
			accept={ allowedTypes }
			multiple={ multiple }
			render={ ( { openFileDialog } ) => {
				return (
					<MenuItem
						icon="upload"
						onClick={ openFileDialog }
					>
						{ __( 'Upload' ) }
					</MenuItem>
				);
			} }
		/>
	);

	const URLButton = (
		<>
			<MenuItem
				icon="admin-links"
				onClick={ () => ( setshowURLInput( ! showURLInput ) ) }
			>
				<div> { __( 'Insert from URL' ) } </div>
			</MenuItem>
		</>
	);

	const urlInputUI = ( showURLInput && <div className="block-editor-media-flow__url-input">
		{ showEditURLInput ? ( <LinkEditor
			value={ mediaURLValue }
			isFullWidth={ true }
			hasBorder={ true }
			onChangeInputValue={ ( url ) => ( setMediaURLValue( url ) ) }
			onSubmit={ ( event ) => {
				event.preventDefault();
				onSelectURL( mediaURLValue );
				setshowEditURLInput( ! showEditURLInput );
			} }
		/> ) : ( <LinkViewer
			isFullWidth={ true }
			className="editor-format-toolbar__link-container-content block-editor-format-toolbar__link-container-content"
			url={ mediaURLValue }
			onEditLinkClick={ () => ( setshowEditURLInput( ! showEditURLInput ) ) }
		/> )
		} </div> );

	const editMediaButton = (
		<BlockControls>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={ ( media ) => selectMedia( media ) }
					onClose={ () => {
						mediaFlowOptionsMenu.close();
					} }
					allowedTypes={ allowedTypes }
					render={ ( { open } ) => (
						<>
							<Toolbar
								isCollapsed={ true }
								dropDownRef={ getMediaFlowRef }
								icon={ false }
								label={ name }
								showLabel={ true }
								className={ 'media-flow_toolbar' }
								onToggle={ () => ( setshowURLInput( false ) ) }
								helperUI={ urlInputUI }
							>
								{ () => (
									<>
										<MenuItem
											icon="admin-media"
											onClick={ open }
										>
											{ __( 'Open Media Library' ) }
										</MenuItem>
										{ fileUploadButton }
										{ URLButton }
									</>
								) }
							</Toolbar>
						</>
					) }
				/>
			</MediaUploadCheck>
		</BlockControls>
	);

	return (
		<>
			{ editMediaButton }
		</>
	);
};

const applyWithSelect = withSelect( ( select ) => {
	const { getSettings } = select( 'core/block-editor' );

	return {
		mediaUpload: getSettings().__experimentalMediaUpload,
	};
} );

/**
 * @see https://github.com/WordPress/gutenberg/blob/master/packages/block-editor/src/components/media-placeholder/README.md
 */
export default compose(
	applyWithSelect,
	withNotices,
)( MediaFlow );
