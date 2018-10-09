import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-dropdown/iron-dropdown.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-styles/shadow.js';

/**
 * `isw-dropdown-menu`
 * Material Design Polymer 3.0 Dropdown Menu (with multi-select).
 *
 * Simple dropdown menu like paper-dropdown-menu, but drops "any kind of content" support in favour of multi-select.
 *
 * Implemented as an simple combination of paper-input, paper-listbox and iron-dropdown.
 *
 *     <isw-dropdown-menu multi label="Dinosaurs">
 *       <paper-item>Allosaurus</paper-item>
 *       <paper-item>Brontosaurus</paper-item>
 *       <paper-item>Carcharodontosaurus</paper-item>
 *       <paper-item>Diplodocus</paper-item>
 *     </isw-dropdown-menu>
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class IswDropdownMenu extends PolymerElement {
  static get template() {
    return html`
      <style>
			:host {
				display: block;
			}

			paper-input iron-icon {
				color: var(--secondary-text-color);
			}

			:host([readonly]) paper-input iron-icon {
				color: var(--disabled-text-color);
			}

			paper-listbox {
				@apply --shadow-elevation-2dp;
				position: relative;
				border-radius: 2px;
				background-color: var(--primary-background-color);
			}
		</style>

		<paper-input
				id="input"
				always-float-label="[[ alwaysFloatLabel ]]"
				label="[[ label ]]"
				no-label-float="[[ noLabelFloat ]]"
				placeholder="[[ placeholder ]]"
				value="[[ value ]]"
				on-tap="open"
				on-click="open"
				invalid="[[ invalid ]]"
				error-message="[[ errorMessage ]]"
				no-label-float="[[noLabelFloat]]"
				readonly>
			<iron-icon icon="arrow-drop-down" slot="suffix"></iron-icon>
		</paper-input>

		<iron-dropdown
				id="dropdown"
				horizontal-align="[[ horizontalAlign ]]"
				horizontal-offset="[[ horizontalOffset ]]"
				vertical-align="[[ verticalAlign ]]"
				vertical-offset="[[ verticalOffset ]]">

			<paper-listbox
					id="listbox"
					slot="dropdown-content"
					attr-for-selected="[[ attrForSelected ]]"
					multi="[[ multi ]]"
					selected="{{ selected }}"
					selected-item="{{ selectedItem }}"
					selected-items="{{ selectedItems }}"
					selected-values="{{ selectedValues }}"
					on-iron-activate="_onIronActivate">

				<slot></slot>

			</paper-listbox>
		</iron-dropdown>
    `;
	}
	
  static get properties() {
    return {
			/**
			 * See paper-input documentation.
			 */
			alwaysFloatLabel: {
				type: Boolean
			},
			/**
			 * See paper-input documentation.
			 */
			label: {
				type: String
			},
			/**
			 * See paper-input documentation.
			 */
			noLabelFloat: {
				type: Boolean
			},
			/**
			 * See paper-input documentation.
			 */
			placeholder: {
				type: String
			},
			/**
			 * Paper-inputs value gets computed.
			 */
			value: {
				type: String,
				computed: '_computeInputValue(selectedItems)',
				notify: true
			},
			/**
			 * No overlay.
			 */
			readonly: {
				type: Boolean,
				value: false
			},
			/**
			 * Display invalid.
			 */
			invalid: {
				type: Boolean,
				notify: true,
				value: false
			},
			/**
			 * Display error message.
			 */
			errorMessage: {
				type: String,
				notify: true,
				value: ''
			},
			noLabelFloat: {
				type: Boolean,
				value: false
			},
			/**
			 * See paper-listbox documentation.
			 */
			attrForSelected: {
				type: String
			},
			/**
			 * See paper-listbox documentation.
			 */
			multi: {
				type: Boolean
			},
			/**
			 * See paper-listbox documentation.
			 */
			selected: {
				type: String,
				notify: true
			},
			/**
			 * See paper-listbox documentation.
			 */
			selectedItem: {
				type: Object,
				notify: true
			},
			/**
			 * See paper-listbox documentation.
			 */
			selectedItems: {
				type: Array,
				notify: true
			},
			/**
			 * See paper-listbox documentation.
			 */
			selectedValues: {
				type: Array,
				notify: true
			},
			/**
			 * See iron-dropdown documentation.
			 */
			horizontalAlign: {
				type: String,
				value: 'right'
			},
			/**
			 * See iron-dropdown documentation.
			 */
			horizontalOffset: {
				type: Number
			},
			/**
			 * See iron-dropdown documentation.
			 */
			verticalAlign: {
				type: String,
				value: 'top'
			},
			/**
			 * See iron-dropdown documentation.
			 */
			verticalOffset: {
				type: Number
			},
			/**
			 * Set to true to enable automatically closing the dropdown after an item has been activated, even if the selection did not change..
			 */
			closeOnActivate: {
				type: Boolean,
				value: false
			}
		};
	}
	
	/**
	 * See paper-listbox documentation.
	 */
	select() {
		this.$.listbox.select();
	}
	/**
	 * See paper-listbox documentation.
	 */
	selectIndex() {
		this.$.listbox.selectIndex();
	}
	/**
	 * See paper-listbox documentation.
	 */
	selectNext() {
		this.$.listbox.selectNext();
	}
	/**
	 * See paper-listbox documentation.
	 */
	selectPrevious() {
		this.$.listbox.selectPrevious();
	}


	/**
	 * See iron-dropdown documentation.
	 */
	open() {
		if( !this.readonly ) {
			this.$.dropdown.open();
		}
	}
	/**
	 * See iron-dropdown documentation.
	 */
	close() {
		this.$.dropdown.close();
	}


	_onIronActivate( event ) {
		if( this.closeOnActivate ) {
			this.close();
		}
	}


	_computeInputValue( selectedItems ) {
		var selectedLabels = [];
		for( var i = 0; i < selectedItems.length; i++ ) {
			var label = selectedItems[ i ].label || selectedItems[ i ].getAttribute('label') || selectedItems[ i ].textContent.trim();
			selectedLabels.push( label );
		}
		return selectedLabels.join( ', ' );
	}
}

window.customElements.define('isw-dropdown-menu', IswDropdownMenu);
