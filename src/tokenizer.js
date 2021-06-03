/** @module tokenizer */

import Token from "./token.js"

const CURSOR_INITIAL = "CURSOR_INITIAL"
const CURSOR_LEVEL = "CURSOR_LEVEL"
const CURSOR_TOKEN_SEPARATOR = "CURSOR_TOKEN_SEPARATOR"
const CURSOR_IDENTIFIER = "CURSOR_IDENTIFIER"
const CURSOR_REFERENCE = "CURSOR_REFERENCE"
const CURSOR_INFORMATION = "CURSOR_INFORMATION"
const CURSOR_LINE_FEED = "CURSOR_LINE_FEED"

const DIGITS = "0123456789"

const TOKENS_SEPARATOR_CHARACTER = " "
const END_OF_LINE_CHARACTERS = ["\r", "\n", "\r\n", "\n\r"]
const LEVEL_CHARACTERS = [ ...DIGITS ]

/**
 * @param   {string} str
 * @returns {Token[]}
 */
function tokenize(str) {
	const characters = [...str]
	const tokens = []
	let cursor = CURSOR_INITIAL
	let nextCursor = null
	const lineTokens = []
	let buffer = ""
	let token = null

	for(const [index, character] of characters.entries()) {

		buffer += character

		if(nextCursor !== null) {
			cursor = nextCursor
		}

		let nextCharacter = null
		if(index + 1 <= characters.length - 1) {
			nextCharacter = characters[index + 1]
		}

		let lastLineToken = null
		if(lineTokens.length >= 1) {
			lastLineToken = lineTokens[lineTokens.length - 1]
		}
		if(nextCharacter === null) {
			nextCursor = null
		} else if(nextCharacter === TOKENS_SEPARATOR_CHARACTER && cursor !== CURSOR_INFORMATION && !(cursor === CURSOR_TOKEN_SEPARATOR && lineTokens.find(token_ => token_.name === Token.NAME_IDENTIFIER))) {
			nextCursor = CURSOR_TOKEN_SEPARATOR
		} else if(END_OF_LINE_CHARACTERS.includes(nextCharacter)) {
			nextCursor = CURSOR_LINE_FEED
		} else {
			if(cursor === CURSOR_INITIAL || (cursor === CURSOR_TOKEN_SEPARATOR && !lineTokens.find(token_ => token_.name === Token.NAME_LEVEL))) {
				nextCursor = CURSOR_LEVEL
			} else if(cursor === CURSOR_TOKEN_SEPARATOR) {
				let buffer_ = ""
				for(const character_ of characters.slice(index + 1)) {
					if(character_ === TOKENS_SEPARATOR_CHARACTER || END_OF_LINE_CHARACTERS.includes(character_)) {
						break
					}
					buffer_ += character_
				}
				if(buffer_.slice(0, 1) === "@" && buffer_.slice(-1) === "@") {
					nextCursor = CURSOR_REFERENCE
				} else if(lineTokens.find(token_ => token_.name === Token.NAME_IDENTIFIER)) {
					nextCursor = CURSOR_INFORMATION
				} else {
					nextCursor = CURSOR_IDENTIFIER
				}
			} else if(cursor === CURSOR_IDENTIFIER || cursor === CURSOR_REFERENCE) {
				if(nextCharacter === TOKENS_SEPARATOR_CHARACTER) {
					nextCursor = CURSOR_TOKEN_SEPARATOR
				}
			} else if(cursor === CURSOR_LINE_FEED) {
				nextCursor = CURSOR_LEVEL
			}
		}

		if((cursor === CURSOR_INITIAL || cursor === CURSOR_LEVEL) && buffer.trim().length >= 1 && nextCursor === CURSOR_TOKEN_SEPARATOR) {
			let buffer_ = ""
			for(const character_ of characters.slice(index + 1)) {
				if(END_OF_LINE_CHARACTERS.includes(character_)) {
					break
				}
				if(character_ !== TOKENS_SEPARATOR_CHARACTER) {
					buffer_ += character_
				}
			}
			if([...buffer.trimStart()].filter(char => LEVEL_CHARACTERS.includes(char)).length === buffer.trimStart().length && buffer_.length >= 1) {
				token = new Token(Token.NAME_LEVEL, buffer.trimStart(), index - buffer.trimStart().length + 1)
			} else {
				buffer = ""
			}
		} else if(cursor === CURSOR_TOKEN_SEPARATOR && buffer === TOKENS_SEPARATOR_CHARACTER) {
			if(lineTokens.length >= 1 && (tokens.length === 0 || tokens[tokens.length - 1].name !== Token.NAME_SEPARATOR) && lineTokens.length < 5 && nextCharacter !== null && !END_OF_LINE_CHARACTERS.includes(nextCharacter)) {
				token = new Token(Token.NAME_SEPARATOR, character, index)
			} else {
				buffer = ""
			}
		} else if(cursor === CURSOR_IDENTIFIER && nextCursor !== CURSOR_IDENTIFIER) {
			if(lineTokens.length >= 2 && lineTokens.length < 5) {
				token = new Token(Token.NAME_IDENTIFIER, buffer.trim(), index - buffer.length + 1)
			} else {
				buffer = ""
			}
		} else if(cursor === CURSOR_REFERENCE && nextCursor !== CURSOR_REFERENCE) {
			if(lineTokens.length >= 2 && lineTokens.length < 5 && buffer.slice(0, 1) === "@" && buffer.slice(-1) === "@") {
				token = new Token(Token.NAME_REFERENCE, buffer.trim(), index - buffer.length + 1)
			} else {
				buffer = ""
			}
		} else if(cursor === CURSOR_INFORMATION && (nextCursor !== CURSOR_INFORMATION || nextCharacter === null)) {
			if(lineTokens.length >= 3 && lineTokens.length < 5) {
				token = new Token(Token.NAME_INFORMATION, buffer, index - buffer.length + 1)
			} else {
				buffer = ""
			}
		} else if(cursor === CURSOR_LINE_FEED) {
			if(END_OF_LINE_CHARACTERS.includes(buffer) && (tokens.length === 0 || tokens[tokens.length - 1].name !== Token.NAME_LINE_FEED)) {
				token = new Token(Token.NAME_LINE_FEED, buffer, index)
			} else {
				buffer = ""
			}
		}

		if(token !== null) {
			tokens.push(token)
			lineTokens.push(token)
			token = null
			buffer = ""
		}

		if(cursor === CURSOR_LINE_FEED) {
			lastLineToken = null
			lineTokens.splice(0, lineTokens.length)
		}

	}

	return tokens
}

export {
	tokenize
}
