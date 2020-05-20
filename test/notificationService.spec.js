const sinon = require('sinon');
const axios = require('axios');
const service = require('../src/notification/notification.service');


let axiosGetSpy;
let axiosPatchSpy;
let axiosDeleteSpy;
const message = { id: 1, message: 'test' };
const serverResponse = {
    status: 200,
    data: {
        _embedded: { messages: [message] },
        _page: { number: 1, totalPages: 1 },
    },
};

describe('notificationService', () => {
    beforeEach(() => {
        axiosGetSpy = sinon.stub(axios, 'get');
        axiosPatchSpy = sinon.stub(axios, 'patch');
        axiosDeleteSpy = sinon.stub(axios, 'delete');
    });
    afterEach(() => {
        axios.get.restore();
        axios.patch.restore();
        axios.delete.restore();
    });

    describe('Success calls', () => {
        it('should call for all the messages and output the result', (done) => {
            axiosGetSpy.resolves(serverResponse);
            service.getAllInAppMessages('', { userId: '123456' }).then((response) => {
                expect(response.status_code).toBe(200);
                expect(response.data.messages.length).toBe(1);
                expect(response.data.messages[0]).toBe(message);
                expect(response.data.currentPage).toBe(1);
                expect(response.data.totalPages).toBe(1);

                done();
            });
        });

        it('should call for all the unread messages count and output the result', (done) => {
            axiosGetSpy.resolves({ status: 200, data: { unread: 5 } });
            service.getAllInAppMessagesUnreadCount('', { userId: '123456' }).then((response) => {
                expect(response.status_code).toBe(200);
                expect(response.data).toBe(5);
                done();
            });
        });

        it('should post new status for the message and output the result', (done) => {
            axiosPatchSpy.resolves({ status: 200, data: 'ok' });
            service.setInAppMessageStatus('', 123, { status: 'read' }).then((response) => {
                expect(response.status_code).toBe(200);
                expect(response.data).toBe('ok');
                done();
            });
        });


        it('should delete a message and output the result', (done) => {
            axiosDeleteSpy.resolves({ status: 200, data: 'ok' });
            service.deleteInAppMessage('', 123).then((response) => {
                expect(response.status_code).toBe(200);
                done();
            });
        });
    });

    describe('Error calls on rejects', () => {
        it('should call for all the messages and output the error', (done) => {
            axiosGetSpy.rejects({ response: { data: { status: 501, extraInfo: 'test' } } });
            service.getAllInAppMessages('', { userId: '123456' }).catch((response) => {
                expect(response.status_code).toBe(501);
                expect(response.status_text).toBe('test');
                done();
            });
        });

        it('should call for all the unread messages count and output the error', (done) => {
            axiosGetSpy.rejects();
            service.getAllInAppMessagesUnreadCount('', { userId: '123456' }).catch((response) => {
                expect(response.status_code).toBe(500);
                expect(response.status_text).toBe('');
                done();
            });
        });

        it('should post new status for the message and output the result', (done) => {
            axiosPatchSpy.rejects();
            service.setInAppMessageStatus('', 123, { status: 'read' }).catch((response) => {
                expect(response.status_code).toBe(500);
                expect(response.status_text).toBe('');
                done();
            });
        });


        it('should delete a message and output the result', (done) => {
            axiosDeleteSpy.rejects();
            service.deleteInAppMessage('', 123).catch((response) => {
                expect(response.status_code).toBe(500);
                expect(response.status_text).toBe('');
                done();
            });
        });
    });

    describe('Error calls on resolves', () => {
        it('should call for all the messages and output the error', (done) => {
            axiosGetSpy.resolves({ status: 500, statusText: 'test' });
            service.getAllInAppMessages('', { userId: '123456' }).catch((response) => {
                expect(response.status_code).toBe(500);
                expect(response.status_text).toBe('test');
                done();
            });
        });

        it('should call for all the unread messages count and output the error', (done) => {
            axiosGetSpy.resolves({ status: 500, statusText: 'test' });
            service.getAllInAppMessagesUnreadCount('', { userId: '123456' }).catch((response) => {
                expect(response.status_code).toBe(500);
                expect(response.status_text).toBe('test');
                done();
            });
        });

        it('should post new status for the message and output the result', (done) => {
            axiosPatchSpy.resolves({ status: 500, statusText: 'test' });
            service.setInAppMessageStatus('', 123, { status: 'read' }).catch((response) => {
                expect(response.status_code).toBe(500);
                expect(response.status_text).toBe('test');
                done();
            });
        });


        it('should delete a message and output the result', (done) => {
            axiosDeleteSpy.resolves({ status: 500, statusText: 'test' });
            service.deleteInAppMessage('', 123).catch((response) => {
                expect(response.status_code).toBe(500);
                expect(response.status_text).toBe('test');
                done();
            });
        });
    });
});
