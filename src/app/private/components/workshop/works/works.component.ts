import { Component, OnInit } from '@angular/core';
import { WorkcardComponent } from '../workcard/workcard.component';
import { CollectionService } from '../../../../shared/services/collection.service';
import { work } from '../../../../shared/interfaces/work';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [WorkcardComponent],
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss',
})
export class WorksComponent implements OnInit {
  protected works: Array<work> = [];

  constructor(private collectionService: CollectionService) {}

  ngOnInit(): void {
    const collectionSub: Subscription = this.collectionService
      .getAllDocByCollectionName('Works')
      .subscribe((data: any) => {
        //console.log(data)
        const workArray: Array<any> = Object.values(data);
        let keyArray: Array<string> = [];
        Array.from(data['docs']).forEach(e =>{
          keyArray.push((e as any)['id'])
        })
        //console.log(keyArray);
        for (let i = 0; i < keyArray.length; i++) {
          const workSub: Subscription = this.collectionService
            .getCollectionByCollectionAndDoc('Works', keyArray[i])
            .subscribe((work) => {
              //console.log(work);
              this.works.push(work as work);
              console.log(this.works);
              workSub.unsubscribe();
            });
        }
        collectionSub.unsubscribe();
      });
  }
}
