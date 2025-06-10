
class Mapper {
	constructor (originalDomain) {
		const mappedDomain = []

		for (const variable of originalDomain) {
			if (variable === null) {
				mappedDomain.push(null)
				continue
			}

			if (variable.isLabel || variable.type !== 'nominal') {
				mappedDomain.push({ ...variable })
				continue
			}

			for (let i = 0; i < variable.values.length; i++) {
				const oneHotVariable = { type: 'real', from: 0, to: 1 }
				if (variable.name) {
					oneHotVariable.name = `${variable.name} (one-hot for ${variable.values[i]})`
				}
				mappedDomain.push(oneHotVariable)
			}
		}

		this._originalDomain = originalDomain
		this._mappedDomain = mappedDomain
	}

	originalDomain () { return this._originalDomain }
	mappedDomain () { return this._mappedDomain }

	map (vector) {
		const mapped = new Array(this._mappedDomain.length)
		let writeIndex = 0

		for (let i = 0; i < this._originalDomain.length; i++) {
			const value = vector[i]
			const originalVariable = this._originalDomain[i]
			if (false
				|| originalVariable === null
				|| originalVariable.isLabel
				|| originalVariable?.type !== 'nominal'
			) {
				mapped[writeIndex++] = value
				continue
			}

			const nominalValues = originalVariable.values
			for (let j = 0; j < nominalValues.length; j++) {
				const oneHot = value === nominalValues[j] ? 1 : 0
				mapped[writeIndex++] = oneHot
			}
		}

		return mapped
	}

	restore (vector) {
		const restored = new Array(this._originalDomain.length)
		let readIndex = 0

		for (let i = 0; i < this._originalDomain.length; i++) {
			const value = vector[readIndex++]
			const originalVariable = this._originalDomain[i]
			if (false
				|| originalVariable === null
				|| originalVariable.isLabel
				|| originalVariable?.type !== 'nominal'
			) {
				restored[i] = value
				continue
			}

			const nominalValues = originalVariable.values
			for (let j = 0; j < nominalValues.length; j++) {
				const oneHot = vector[readIndex + j]
				if (oneHot === 0) { continue }
				restored[i] = nominalValues[j]
				break
			}
			readIndex += nominalValues.length
		}
	}
}


module.exports = { Mapper }
