const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

const notificationServiceStub = {
    getAllInAppMessages() {
    },
    getAllInAppMessagesUnreadCount() {
    },
    setInAppMessageStatus() {
    },
    deleteInAppMessage() {
    },
};
let controller;

describe('notificationController', () => {
    beforeEach(() => {
        controller = proxyquire('../src/notification/notification.controller', {
            './notification.service': notificationServiceStub,
        });
    });

    describe('Success calls', () => {
        it('should call for all the messages and output the result', (done) => {
            const stub = sinon.stub(notificationServiceStub, 'getAllInAppMessages').resolves('ok');
            controller.getAllInAppMessages({ query: { auth: 'response auth' } }, {
                json: (response) => {
                    expect(response).toEqual('ok');
                    stub.restore();
                    done();
                },
            });
        });

        it('should call for all the messages and output the result', (done) => {
            const stub = sinon.stub(notificationServiceStub, 'getAllInAppMessagesUnreadCount').resolves(5);
            controller.getAllInAppMessagesUnreadCount({ query: { auth: 'response auth' } }, {
                json: (response) => {
                    expect(response).toEqual(5);
                    stub.restore();
                    done();
                },
            });
        });

        it('should call to set the in app message status and output the result', (done) => {
            const stub = sinon.stub(notificationServiceStub, 'setInAppMessageStatus').resolves(5);
            controller.setInAppMessageStatus({ query: { auth: 'response auth' }, params: { messageId: 1 } }, {
                json: (response) => {
                    expect(response).toEqual(5);
                    stub.restore();
                    done();
                },
            });
        });

        it('should call to delete an in app message status and output the result', (done) => {
            const stub = sinon.stub(notificationServiceStub, 'deleteInAppMessage').resolves(5);
            controller.deleteInAppMessage({ query: { auth: 'response auth' }, params: { messageId: 1 } }, {
                json: (response) => {
                    expect(response).toEqual(5);
                    stub.restore();
                    done();
                },
            });
        });
    });

    describe('failed calls', () => {
        it('should call for all the messages and output the error when thrown', (done) => {
            const stub = sinon.stub(notificationServiceStub, 'getAllInAppMessages').rejects(500);
            controller.getAllInAppMessages({ query: { auth: 'response auth' } }, {
                json: (response) => {
                    expect(response).toEqual(500);
                    stub.restore();
                    done();
                },
                status: () => {
                },
            });
        });

        it('should call for all the messages and output the error when thrown', (done) => {
            const stub = sinon.stub(notificationServiceStub, 'getAllInAppMessagesUnreadCount').rejects({ status_code: 401 });
            controller.getAllInAppMessagesUnreadCount({ query: { auth: 'response auth' } }, {
                json: (response) => {
                    expect(response).toEqual({ status_code: 401 });
                    stub.restore();
                    done();
                },
                status: () => {
                },
            });
        });

        it('should call to set the in app message status and output the error when thrown', (done) => {
            const stub = sinon.stub(notificationServiceStub, 'setInAppMessageStatus').rejects(500);
            controller.setInAppMessageStatus({ query: { auth: 'response auth' }, params: { messageId: 1 } }, {
                json: (response) => {
                    expect(response).toEqual(500);
                    stub.restore();
                    done();
                },
                status: () => {
                },
            });
        });

        it('should call to delete an in app message status and output the error when thrown', (done) => {
            const stub = sinon.stub(notificationServiceStub, 'deleteInAppMessage').rejects(500);
            controller.deleteInAppMessage({ query: { auth: 'response auth' }, params: { messageId: 1 } }, {
                json: (response) => {
                    expect(response).toEqual(500);
                    stub.restore();
                    done();
                },
                status: () => {
                },
            });
        });
    });
});
