import {Unit} from "../src/model";

describe('create', () => {
    test('should create', () => {
        expect(Unit.create(false)).toEqual({});
    })
})