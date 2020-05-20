const sinon = require('sinon');
const axios = require('axios');
const service = require('../src/notification/notification.service');


let axiosGetSpy;
let axiosPatchSpy;
let axiosDeleteSpy;
let message = { id: 1, message: 'test' }
let serverResponse = {
    status: 200,
    data: {
        _embedded: { messages: [message] },
        _page: { number: 1, totalPages: 1 }
    }
};

describe("notificationService", function () {

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

    describe('Success calls', function () {
        it('should call for all the messages and output the result', (done) => {
            axiosGetSpy.resolves(serverResponse)
            service.get_all_in_app_messages('', {userId: '123456'}).then((response) => {
                expect(response.status_code).toBe(200);
                expect(response.data.messages.length).toBe(1);
                expect(response.data.messages[0]).toBe(message);
                expect(response.data.currentPage).toBe(1);
                expect(response.data.totalPages).toBe(1);

                done()
            });
        });

        it('should call for all the unread messages count and output the result', (done) => {
            axiosGetSpy.resolves({ status: 200, data: { unread: 5 } });
            service.get_all_in_app_messages_unread_count('',{userId: '123456'}).then((response) => {
                expect(response.status_code).toBe(200);
                expect(response.data).toBe(5);
                done()
            });
        });

        it('should post new status for the message and output the result', (done) => {
            axiosPatchSpy.resolves({ status: 200, data: 'ok' });
            service.set_in_app_message_status('', 123, { status: 'read' }).then((response) => {
                expect(response.status_code).toBe(200);
                expect(response.data).toBe('ok');
                done()
            });
        });


        it('should delete a message and output the result', (done) => {
            axiosDeleteSpy.resolves({ status: 200, data: 'ok' });
            service.delete_in_app_message('', 123).then((response) => {
                expect(response.status_code).toBe(200);
                done()
            });
        });
    });

    describe('Error calls on rejects', function () {
        it('should call for all the messages and output the error', (done) => {
            axiosGetSpy.rejects({response:{data: {status:501, extraInfo: 'test'}}})
            service.get_all_in_app_messages('', {userId: '123456'}).catch((response) => {
                expect(response.status_code).toBe(501);
                expect(response.status_text).toBe('test');
                done()
            });
        });

        it('should call for all the unread messages count and output the error', (done) => {
            axiosGetSpy.rejects();
            service.get_all_in_app_messages_unread_count('', {userId: '123456'}).catch((response) => {
                expect(response.status_code).toBe(500);
                expect(response.status_text).toBe('');
                done()
            });
        });

        it('should post new status for the message and output the result', (done) => {
            axiosPatchSpy.rejects();
            service.set_in_app_message_status('', 123, { status: 'read' }).catch((response) => {
                expect(response.status_code).toBe(500);
                expect(response.status_text).toBe('');
                done()
            });
        });


        it('should delete a message and output the result', (done) => {
            axiosDeleteSpy.rejects();
            service.delete_in_app_message('', 123).catch((response) => {
                expect(response.status_code).toBe(500);
                expect(response.status_text).toBe('');
                done()
            });
        });
    });

    describe('Error calls on resolves', function () {
        it('should call for all the messages and output the error', (done) => {
            axiosGetSpy.resolves( {status:500, statusText: 'test'})
            service.get_all_in_app_messages('', {userId: '123456'}).catch((response) => {
                expect(response.status_code).toBe(500);
                expect(response.status_text).toBe('test');
                done()
            });
        });

        it('should call for all the unread messages count and output the error', (done) => {
            axiosGetSpy.resolves({status:500, statusText: 'test'})
            service.get_all_in_app_messages_unread_count('', {userId: '123456'}).catch((response) => {
                expect(response.status_code).toBe(500);
                expect(response.status_text).toBe('test');
                done()
            });
        });

        it('should post new status for the message and output the result', (done) => {
            axiosPatchSpy.resolves({status:500, statusText: 'test'})
            service.set_in_app_message_status('', 123, { status: 'read' }).catch((response) => {
                expect(response.status_code).toBe(500);
                expect(response.status_text).toBe('test');
                done()
            });
        });


        it('should delete a message and output the result', (done) => {
            axiosDeleteSpy.resolves({status:500, statusText: 'test'})
            service.delete_in_app_message('', 123).catch((response) => {
                expect(response.status_code).toBe(500);
                expect(response.status_text).toBe('test');
                done()
            });
        });
    });
});
