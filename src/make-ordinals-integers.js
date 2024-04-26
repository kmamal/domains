const { map } = require('@kmamal/util/array/map')
const { forEach } = require('@kmamal/util/array/for-each')


const makeVariableInteger = (variable) => {
	if (variable.type !== 'ordinal') { return { ...variable } }
	return {
		type: 'integer',
		from: 0,
		to: variable.values.length - 1,
	}
}

const makeVariableInteger$$$ = (variable) => {
	if (variable.type !== 'ordinal') { return variable }
	variable.type = 'integer'
	variable.from = 0
	variable.to = variable.values.length - 1
	delete variable.values
	return variable
}

makeVariableInteger.$$$ = makeVariableInteger$$$


const makeDomainIntegers = (domain) => map(domain, makeVariableInteger)

const makeDomainIntegers$$$ = (domain) => forEach(domain, makeVariableInteger$$$)

makeDomainIntegers.$$$ = makeDomainIntegers$$$

const restoreValueOrdinal = (variable, x) => {
	if (variable.type !== 'ordinal') { return x }
	return variable.values[x]
}


const __restoreVectorOrdinals = (dst, domain, vector) => {
	for (let i = 0; i < domain.length; i++) {
		dst[i] = restoreValueOrdinal(domain[i], vector[i])
	}
}

const restoreVectorOrdinals = (domain, vector) => {
	const { length } = domain
	const res = new Array(length)
	__restoreVectorOrdinals(res, domain, vector)
	return res
}

const restoreVectorOrdinalsTo = (dst, domain, vector) => {
	const { length } = domain
	dst.length = length
	__restoreVectorOrdinals(dst, domain, vector)
	return dst
}

const restoreVectorOrdinals$$$ = (domain, vector) => {
	__restoreVectorOrdinals(vector, domain, vector)
	return vector
}

restoreVectorOrdinals.$$$ = restoreVectorOrdinals$$$
restoreVectorOrdinals.to = restoreVectorOrdinalsTo


module.exports = {
	makeVariableInteger,
	makeDomainIntegers,
	restoreValueOrdinal,
	restoreVectorOrdinals,
}
