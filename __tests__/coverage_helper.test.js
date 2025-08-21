import * as common from '../core/mod.ts';

describe('Cover internal helper __test__replaceHeadLower', () => {
	test('__test__replaceHeadLower', () => {
		const result = common.__test__replaceHeadLower({ Abc: 1, Def: { Ghi: 2 } });
		expect(result).toEqual({ abc: 1, def: { ghi: 2 } });
	});
});
