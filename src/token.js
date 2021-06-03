/** @module token */

/**
 * @class
 * @memberof: module:token
 */
class Token {

	/**
	 * @readonly
	 * @type {string}
	 */
	static NAME_LEVEL = "level"
	/**
	 * @readonly
	 * @type {string}
	 */
	static NAME_SEPARATOR = "separator"
	/**
	 * @readonly
	 * @type {string}
	 */
	static NAME_IDENTIFIER = "identifier"
	/**
	 * @readonly
	 * @type {string}
	 */
	static NAME_REFERENCE = "reference"
	/**
	 * @readonly
	 * @type {string}
	 */
	static NAME_INFORMATION = "information"
	/**
	 * @readonly
	 * @type {string}
	 */
	static NAME_LINE_FEED = "line feed"

	/**
	 * @param {string} name
	 * @param {string} buffer
	 * @param {number} index
	 */
	constructor(name, buffer, index) {
		this._name = name
		this._buffer = buffer
		this._index = index
	}

	/**
	 * @readonly
	 * @type {string}
	 */
	get name() {
		return this._name
	}

	/**
	 * @readonly
	 * @type {string}
	 */
	get buffer() {
		return this._buffer
	}

	/**
	 * @readonly
	 * @type {number}
	 */
	get index() {
		return this._index
	}

}

export default Token