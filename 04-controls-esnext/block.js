const { __, setLocaleData } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;

const {
	RichText,
	AlignmentToolbar,
	BlockControls,
} = wp.editor;

setLocaleData( window.gutenberg_examples_04_esnext.localeData, 'gutenberg-examples' );

registerBlockType( 'gutenberg-examples/example-04-controls-esnext', {
	title: __( 'Example: Controls (esnext)', 'gutenberg-examples' ),
	icon: 'universal-access-alt',
	category: 'layout',
	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: 'p',
		},
		alignment: {
			type: 'string',
			default: 'none',
		},
	},
	edit: ( props ) => {
		const {
			attributes: {
				content,
				alignment,
			},
			className,
		} = props;

		const onChangeContent = ( newContent ) => {
			props.setAttributes( { content: newContent } );
		};

		const onChangeAlignment = ( newAlignment ) => {
			props.setAttributes( { alignment: newAlignment === undefined ? 'none' : newAlignment } );
		};

		return (
			<div>
				{
					<BlockControls>
						<AlignmentToolbar
							value={ alignment }
							onChange={ onChangeAlignment }
						/>
					</BlockControls>
				}
				<RichText
					className={ className }
					style={ { textAlign: alignment } }
					tagName="p"
					onChange={ onChangeContent }
					value={ content }
				/>
			</div>
		);
	},
	save: ( props ) => {
		return (
			<RichText.Content
				classes={ `gutenberg-examples-align-${ props.attributes.alignment }` }
				tagName="p"
				value={ props.attributes.content }
			/>
		);
	},
} );
