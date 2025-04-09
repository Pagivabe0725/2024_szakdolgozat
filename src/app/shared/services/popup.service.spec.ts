import { TestBed } from '@angular/core/testing';

import { PopupService } from './popup.service';
import { Dialog } from '../interfaces/dialog';
import { PopupComponent } from '../components/popup/popup.component';

fdescribe('PopupService', () => {
  let service: PopupService;
  const dialogTemplate: Dialog = {
    width: '70%',
    height: '70%',
    hostComponent: 'LoginComponent',
    title: '',
    content: '',
    action: false,
    hasInput: false,
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PopupComponent],
    });
    service = TestBed.inject(PopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getTemplateDialog should work', () => {
    expect(service.getTemplateDialog()).toEqual(dialogTemplate);
  });

  it('displayPopUp should call matDialog.open with correct arguments', () => {
    const matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    const service = new PopupService(matDialogMock as any);
    service.displayPopUp(dialogTemplate);

    expect(matDialogMock.open).toHaveBeenCalledWith(PopupComponent, {
      width: '50%',
      height: '50%',
      data: dialogTemplate,
    });
  });
});
