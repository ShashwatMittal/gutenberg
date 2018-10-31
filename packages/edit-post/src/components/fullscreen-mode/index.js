/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { withSelect } from '@wordpress/data';

class FullscreenMode extends Component {
	componentDidMount() {
		this.sync();

		// `is-fullscreen-mode` is set in PHP as a body class by Gutenberg, and this causes
		// `sticky-menu` to be applied by WordPress and prevents the admin menu being scrolled
		// even if `is-fullscreen-mode` is then removed. Let's remove `sticky-menu` here as
		// a consequence of the FullscreenMode setup
		document.body.classList.remove( 'sticky-menu' );
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.isActive !== prevProps.isActive ) {
			this.sync();
		}
	}

	sync() {
		const { isActive } = this.props;
		if ( isActive ) {
			document.body.classList.add( 'is-fullscreen-mode' );
		} else {
			document.body.classList.remove( 'is-fullscreen-mode' );
		}
	}

	render() {
		return null;
	}
}

export default withSelect( ( select ) => ( {
	isActive: select( 'core/edit-post' ).isFeatureActive( 'fullscreenMode' ),
} ) )( FullscreenMode );
