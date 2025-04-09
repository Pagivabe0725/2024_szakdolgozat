import { TestBed } from '@angular/core/testing';

import { ArrayService } from './array.service';

function randomNumber(num: number): number {
  return Math.floor(Math.random() * num);
}

describe('ArrayService', () => {
  let service: ArrayService;
  let testArray: string[];
  let randomNum: number;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrayService);
    randomNum = randomNumber(100);
    testArray = [];
    for (let i = 0; i < randomNum; i++) {
      testArray.push(' ');
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getIndex', () => {
    it('getIndex should return index if element in array', () => {
      const localRandomNum = randomNumber(randomNum);
      testArray[localRandomNum] = 'find me';
      const result = service.getIndex('find me', testArray);
      expect(localRandomNum).toBe(result);
    });

    it('getIndex should return 0 if element not in array', () => {
      const result = service.getIndex('find me', testArray);
      expect(result).toBe(testArray.length);
    });
  });

  describe('elementInArray', () => {
    it('in', () => {
      const localRandomNum = randomNumber(randomNum);
      testArray[localRandomNum] = 'find me';
      expect(service.elementInArray('find me', testArray)).toBeTrue();
    });

    it('not in', () => {
      expect(service.elementInArray('find me', testArray)).toBeFalse();
    });
  });

  describe('deleteElementFromArray', () => {
    it('should delete the element', () => {
      console.log(testArray);
      const localRandomNum = randomNumber(randomNum);
      testArray[localRandomNum] = 'delete me';
      const basicLength = testArray.length;
      service.deleteElementFromArray('delete me', testArray);
      console.log(testArray);
      expect(testArray.includes('delete me')).toBeFalse();
      expect(testArray.length).toBeLessThan(basicLength);
    });

    it('should not delete the element', () => {
      const basicLength = testArray.length;
      service.deleteElementFromArray('delete me', testArray);
      expect(testArray.length).toEqual(basicLength);
    });
  });

  describe('addElementToArray', () => {
    it('addElementToArray should work', () => {
      service.addElementToArray('added', testArray);
      expect(testArray[testArray.length - 1]).toEqual('added');
    });
  });
});
