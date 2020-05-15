const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

const notificationServiceStub = {
    get_all_in_app_messages: function () {
    },
    get_all_in_app_messages_unread_count: function () {
    },
    set_in_app_message_status: function () {
    },
    delete_in_app_message: function () {
    }
}
let controller;

describe("notificationController", function () {
    beforeEach(() => {
        controller = proxyquire('../src/notification/notificationController', {
            './notificationService': notificationServiceStub
        });
    });

    describe('Success calls', function () {
        it('should call for all the messages and output the result', (done) => {
            let stub = sinon.stub(notificationServiceStub, 'get_all_in_app_messages').resolves('ok');
            controller.get_all_in_app_messages({ query: { auth: 'response auth' } }, {
                json: (response) => {
                    expect(response).toEqual('ok');
                    stub.restore();
                    done();
                }
            });
        });

        it('should call for all the messages and output the result', (done) => {
            let stub = sinon.stub(notificationServiceStub, 'get_all_in_app_messages_unread_count').resolves(5);
            controller.get_all_in_app_messages_unread_count({ query: { auth: 'response auth' } }, {
                json: (response) => {
                    expect(response).toEqual(5);
                    stub.restore();
                    done();
                }
            });
        });

        it('should call to set the in app message status and output the result', (done) => {
            let stub = sinon.stub(notificationServiceStub, 'set_in_app_message_status').resolves(5);
            controller.set_in_app_message_status({ query: { auth: 'response auth' }, params: { messageId: 1 } }, {
                json: (response) => {
                    expect(response).toEqual(5);
                    stub.restore();
                    done();
                }
            });
        });

        it('should call to delete an in app message status and output the result', (done) => {
            let stub = sinon.stub(notificationServiceStub, 'delete_in_app_message').resolves(5);
            controller.delete_in_app_message({ query: { auth: 'response auth' }, params: { messageId: 1 } }, {
                json: (response) => {
                    expect(response).toEqual(5);
                    stub.restore();
                    done();
                }
            });
        });
    })

    describe('failed calls', function () {
        it('should call for all the messages and output the error when thrown', (done) => {
            let stub = sinon.stub(notificationServiceStub, 'get_all_in_app_messages').rejects(500);
            controller.get_all_in_app_messages({ query: { auth: 'response auth' } }, {
                json: (response) => {
                    expect(response).toEqual(500);
                    stub.restore();
                    done();
                },
                status: () => {
                }
            });
        });

        it('should call for all the messages and output the error when thrown', (done) => {
            let stub = sinon.stub(notificationServiceStub, 'get_all_in_app_messages_unread_count').rejects({ status_code:401 });
            controller.get_all_in_app_messages_unread_count({ query: { auth: 'response auth' } }, {
                json: (response) => {
                    expect(response).toEqual({ status_code:401 });
                    stub.restore();
                    done();
                },
                status: () => {
                }
            });
        });

        it('should call to set the in app message status and output the error when thrown', (done) => {
            let stub = sinon.stub(notificationServiceStub, 'set_in_app_message_status').rejects(500);
            controller.set_in_app_message_status({ query: { auth: 'response auth' }, params: { messageId: 1 } }, {
                json: (response) => {
                    expect(response).toEqual(500);
                    stub.restore();
                    done();
                },
                status: () => {
                }
            });
        });

        it('should call to delete an in app message status and output the error when thrown', (done) => {
            let stub = sinon.stub(notificationServiceStub, 'delete_in_app_message').rejects(500);
            controller.delete_in_app_message({ query: { auth: 'response auth' }, params: { messageId: 1 } }, {
                json: (response) => {
                    expect(response).toEqual(500);
                    stub.restore();
                    done();
                },
                status: () => {
                }
            });
        });
    })
});
