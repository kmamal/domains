const { map } = require('@kmamal/util/array/map')
const { forEach } = require('@kmamal/util/array/for-each')


const makeVariableNominal = (variable) => {
	if (variable.type !== 'ordinal') { return { ...variable } }
	return {
		type: 'nominal',
		values: variable.values,
	}
}

const makeVariableNominal$$$ = (variable) => {
	if (variable.type !== 'ordinal') { return variable }
	variable.type = 'nominal'
	return variable
}

makeVariableNominal.$$$ = makeVariableNominal$$$


const makeDomainNominals = (domain) => map(domain, makeVariableNominal)

const makeDomainNominals$$$ = (domain) => forEach(domain, makeVariableNominal$$$)

makeDomainNominals.$$$ = makeDomainNominals$$$

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
	makeVariableNominal,
	makeDomainNominals,
	restoreValueOrdinal,
	restoreVectorOrdinals,
}
