import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { NotificationWidgetService } from './notification-widget.service';

describe('NotificationWidgetService', () => {
  let service: NotificationWidgetService;
  let httpMock: HttpTestingController;
  let testValues;
  let url = 'localhost:3000/messages';

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      NotificationWidgetService
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(NotificationWidgetService);
    httpMock = TestBed.get(HttpTestingController);
    testValues = [{
      id: '0',
      message: {
        message:'Test bericht'}
    }, {id: '1',
      message: {
        message:'Test bericht'}
    }]
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should query messages via http', (done) => {
    service.getInAppMessages(url,1).subscribe((res: any) => {
      expect(res).toEqual(testValues);
      done();
    });

    const req = httpMock.expectOne(url+'?sort=-createdAt&page=1');
    req.flush(testValues);
  });

  it('should query messages overview via http', (done) => {
    service.getInAppMessagesUnreadCount(url).subscribe((res: any) => {
      expect(res).toEqual(testValues);
      done();
    });

    const req = httpMock.expectOne(url+'/overview');
    req.flush(testValues);
  });

  it('should patch messages status via http', (done) => {
    service.updateInAppMessageStatus(url, '1234', {status:'read'}).subscribe((res: any) => {
      expect(res).toEqual(testValues);
      done();
    });

    const req = httpMock.expectOne(url+'/1234');
    req.flush(testValues);
  });

  it('should delete messages via http', (done) => {
    service.deleteInAppMessage(url, '1234').subscribe((res: any) => {
      expect(res).toEqual(testValues);
      done();
    });

    const req = httpMock.expectOne(url+'/1234');
    req.flush(testValues);
  });

});
