import { TestBed } from '@angular/core/testing';

import { ArrayService } from './array.service';

function randomNumber(num: number): number {
  return Math.floor(Math.random() * num);
}

fdescribe('ArrayService', () => {
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


  describe('getIndex',()=>{

    it('getIndex should return index if element in array', () => {
      const localRandomNum = randomNumber(randomNum);
      testArray[localRandomNum] = 'find me';
      const result = service.getIndex('find me', testArray);
      console.log(result);
      expect(localRandomNum).toBe(result);
    });
  
    it('getIndex should return 0 if element not in array', () => {
      console.log(testArray)
      const result = service.getIndex('find me', testArray);
      expect(result).toBe(testArray.length);
    });
  })
 
});
