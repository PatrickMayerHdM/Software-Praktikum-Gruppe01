'use strict';

/**
* Config file for a https://github.com/micromata/http-fake-backend to
* mock the PythonBankBeispiel backend.
*
* Dafür muss man y./server/api folder.
*/

const SetupEndpoint = require('./setup/');

const prefix = "/system"

module.exports = SetupEndpoint({
    name: 'system',
    urls: [{
        params: '/dsvJfMX2RuRx9Tha1XpXdN4eTVE2/newprofiles',
        requests: [{
            method: 'GET',
            response: '/response-files/api/newprofiles.json'
        },
        {
            method: ['POST'],
            response: '/response-files/api/newprofiles.json'
        }]
    }, {
        params: '/SearchProfileIDs',
        requests: [{
            method: 'GET',
            response: '/response-files/api/SearchProfileIDs.json'
        },
        {
            method: ['POST'],
            response: '/response-files/api/SearchProfileIDs.json'
        }]
    },
        {
        params: '/messages',
        requests: [{
            method: 'GET',
            response: '/response-files/api/messages.json'
        },
        {
            method: ['POST'],
            response: '/response-files/api/SearchProfileIDs.json'
        }]
    }
    ]
});

