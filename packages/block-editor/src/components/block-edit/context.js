/**
 * External dependencies
 */
import { noop } from 'lodash';

/**
 * WordPress dependencies
 */
import { createContext } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';

const { Consumer, Provider } = createContext( {
	name: '',
	isSelected: false,
	focusedElement: null,
	setFocusedElement: noop,
	clientId: null,
} );

export { Provider as BlockEditContextProvider };

/**
 * A Higher Order Component used to inject BlockEdit context to the
 * wrapped component.
 *
 * @param {Function} mapContextToProps Function called on every context change,
 *                                     expected to return object of props to
 *                                     merge with the component's own props.
 *
 * @return {import('@wordpress/element').WPComponent} Enhanced component with injected context as props.
 */
export const withBlockEditContext = ( mapContextToProps ) => createHigherOrderComponent( ( OriginalComponent ) => {
	return ( props ) => (
		<Consumer>
			{ ( context ) => (
				<OriginalComponent
					{ ...props }
					{ ...mapContextToProps( context, props ) }
				/>
			) }
		</Consumer>
	);
}, 'withBlockEditContext' );

/**
 * A Higher Order Component used to render conditionally the wrapped
 * component only when the BlockEdit has selected state set.
 *
 * @param {import('@wordpress/element').WPComponent} OriginalComponent Component to wrap.
 *
 * @return {import('@wordpress/element').WPComponent} Component which renders only when the BlockEdit is selected.
 */
export const ifBlockEditSelected = createHigherOrderComponent( ( OriginalComponent ) => {
	return ( props ) => (
		<Consumer>
			{ ( { isSelected } ) => isSelected && (
				<OriginalComponent { ...props } />
			) }
		</Consumer>
	);
}, 'ifBlockEditSelected' );
