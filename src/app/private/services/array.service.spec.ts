import { TestBed } from '@angular/core/testing';

import { ArrayService } from './array.service';

function randomNumber(num:number): number {
  return Math.floor(Math.random() * num);
}

fdescribe('ArrayService', () => {
  let service: ArrayService;
  let testArray:string[]
  let randomNum:number
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrayService);
    randomNum=randomNumber(100);
    testArray=[]
    for (let i = 0; i < randomNum; i++) {
     testArray.push('') 
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getIndex should work', () => {
    console.log(testArray)


  });
});
