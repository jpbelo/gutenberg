/**
 * Internal dependencies
 */
import BlockControls from '../block-controls';
import { default as MediaPlaceholder } from '../media-placeholder';
import BlockIcon from '../block-icon';

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	Toolbar,
	withNotices,
} from '@wordpress/components';

const DEFAULT_MEDIA_CONTROLS = [
	{
		icon: 'admin-media',
		title: __( 'Media Library' ),
		action: 'library',
	},
	{
		icon: 'upload',
		title: __( 'Upload image' ),
		action: 'upload',
	},
	{
		icon: 'admin-links',
		title: __( 'Insert from URL' ),
		action: 'url',
	},
];

const MediaFlow = ( { className, value, mediaURL, accepts, allowedTypes, onSelect, onSelectURL, notices, children, noticeOperations, mediaControls = DEFAULT_MEDIA_CONTROLS, name = __( 'Replace' ) } ) => {
	const selectMedia = ( media ) => {
		onSelect( media );
	};

	const selectURL = ( URL ) => {
		onSelectURL( URL );
	};

	const onCancel = () => {
	};

	const doAction = ( action ) => {
		return action;
	};

	const onUploadError = ( message ) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	};

	const editMediaButton = (
		<BlockControls>
			<Toolbar
				isCollapsed={ true }
				icon={ false }
				label={ name }
				controls={ mediaControls.map( ( control ) => {
					const { action } = control;
					return {
						...control,
						isActive: false,
						onClick: () => doAction( action ),
					};
				} ) }
			/>
		</BlockControls>
	);

	const mediaPlaceholder = (
		<MediaPlaceholder
			icon={ <BlockIcon icon={ 'edit' } /> }
			onCancel={ mediaURL && onCancel }
			onSelect={ selectMedia }
			onSelectMedia={ selectMedia }
			onSelectURL={ selectURL }
			accept={ accepts }
			allowedTypes={ allowedTypes }
			className={ className }
			mediaURL={ mediaURL }
			accepts={ 'audio/*' }
			value={ value }
			notices={ notices }
			onError={ onUploadError }
		/>
	);

	return (
		<Fragment>
			{ mediaURL && editMediaButton }
			{ mediaURL && children }
			{ ! mediaURL && mediaPlaceholder }
		</Fragment>
	);
};

export default withNotices( MediaFlow );
