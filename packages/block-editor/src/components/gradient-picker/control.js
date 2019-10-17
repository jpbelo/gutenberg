
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import GradientPicker from './';

export default function( { className, label = __( 'Gradient Presets' ), ...props } ) {
	return (
		<BaseControl
			className={ classnames(
				'block-editor-gradient-picker-control',
				className
			) }
		>
			<BaseControl.VisualLabel>
				{ label }
			</BaseControl.VisualLabel>
			<GradientPicker
				className="block-editor-gradient-picker-control__gradient-picker-presets"
				{ ...props }
			/>
		</BaseControl>
	);
}
