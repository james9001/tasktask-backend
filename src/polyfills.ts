// @ts-expect-error "required to be able to serialise bigint"
BigInt.prototype["toJSON"] = function () {
	return this.toString();
};
