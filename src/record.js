/** @module record */

/**
 * @memberof: module:record
 */
class Record {

	/**
	 * @param {string} name
	 */
	constructor(name) {
		this._name = name
		this._value = null
		this._parentRecord = null
		this._records = []
	}

	/**
	 * @param {Record} record
	 */
	appendChild(record) {
		record._parentRecord = this
		this._records.push(record)
	}

	/**
	 * @readonly
	 * @type {string}
	 */
	get name() {
		return this._name
	}

	/**
	 * @type {string}
	 */
	get value() {
		return this._value
	}

	set value(value) {
		this._value = value
	}

	/**
	 * @readonly
	 * @type {Records[]}
	 */
	get records() {
		return this._records
	}

	/**
	 * @readonly
	 * @type {Record}
	 */
	get parentRecord() {
		return this._parentRecord
	}

}

export default Record