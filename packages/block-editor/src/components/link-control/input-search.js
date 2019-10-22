/**
 * External dependencies
 */
import { noop } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	IconButton,
} from '@wordpress/components';
import {
	LEFT,
	RIGHT,
	UP,
	DOWN,
	BACKSPACE,
	ENTER,
} from '@wordpress/keycodes';

/**
 * Internal dependencies
 */
import {
	URLInput,
} from '../';

const LinkControlInputSearch = ( { value, onChange, onSelect, renderSuggestions, fetchSuggestions, onReset, onKeyDown = noop, onKeyPress = noop } ) => {
	const stopPropagationRelevantKeys = ( event ) => {
		if ( [ LEFT, DOWN, RIGHT, UP, BACKSPACE, ENTER ].indexOf( event.keyCode ) > -1 ) {
			// Stop the key event from propagating up to ObserveTyping.startTypingInTextField.
			event.stopPropagation();
		}
	};

	return (
		<form>
			<URLInput
				className="block-editor-link-control__search-input"
				value={ value }
				onChange={ onChange }
				onKeyDown={ ( event, suggestion ) => {
					stopPropagationRelevantKeys( event );
					if ( event.keyCode === ENTER ) {
						onSelect( event, suggestion );
					}
					onKeyDown( event, suggestion );
				} }
				onKeyPress={ onKeyPress }
				placeholder={ __( 'Search or type url' ) }
				renderSuggestions={ renderSuggestions }
				fetchLinkSuggestions={ fetchSuggestions }
				handleURLSuggestions={ true }
			/>

			<IconButton
				disabled={ ! value.length }
				type="reset"
				label={ __( 'Reset' ) }
				icon="no-alt"
				className="block-editor-link-control__search-reset"
				onClick={ onReset }
			/>

		</form>
	);
};

export default LinkControlInputSearch;
