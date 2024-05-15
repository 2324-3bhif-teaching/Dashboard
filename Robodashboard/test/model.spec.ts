import {Unit} from "../data/unit";

describe('create', () => {
    test('should create', () => {
        expect(Unit.create(false)).toEqual(new Promise(resolve => resolve(true)));
    })
});