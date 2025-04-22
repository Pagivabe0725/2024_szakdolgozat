import { Component, OnInit } from '@angular/core';
import { WorkcardComponent } from '../workcard/workcard.component';
import { CollectionService } from '../../../../shared/services/collection.service';
import { work } from '../../../../shared/interfaces/work';
import { Subscription, firstValueFrom, take } from 'rxjs';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [WorkcardComponent, SpinnerComponent],
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss',
})
export class WorksComponent implements OnInit {
  protected worksArray: Array<work> = [];
  public loaded = false;
  constructor(private collectionService: CollectionService) {}

  /*
  ngOnInit(): void {
    const collectionSub: Subscription = this.collectionService
      .getAllDocByCollectionName('Works')
      .subscribe((data: any) => {
        //console.log(data)
        const workArray: Array<any> = Object.values(data);
        let keyArray: Array<string> = [];
        Array.from(data['docs']).forEach((e) => {
          keyArray.push((e as any)['id']);
        });
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

  */

  async ngOnInit() {
    const allWork = await this.getAllWorks();
    await this.addOneWorkToArray(allWork);
    await new Promise((resolve)=>setTimeout(resolve,1000))
    this.loaded = true;

  }

  async getAllWorks(): Promise<unknown> {
    return firstValueFrom(
      this.collectionService.getAllDocByCollectionName('Works').pipe(take(1))
    );
  }

  async addOneWorkToArray(data: any): Promise<void> {
    return (data as any).forEach((e: any) => {
      this.collectionService
        .getCollectionByCollectionAndDoc('Works', (e as any)['id'])
        .pipe(take(1))
        .subscribe((element) => {
          console.log(element)
          this.worksArray.push(element as work);
        });
    });
  }
}
