'use strict';

module.exports = [
    {
        method: 'get',
        endpoint: '/add',
        fileField: null,
        fileObjArray: 'none',
        handlers: [
            'MathInterface.addition'
        ]
    },
    {
        method: 'get',
        endpoint: '/subtract',
        fileField: null,
        fileObjArray: 'none',
        handlers: [
            'MathInterface.subtraction'
        ]
    },
    {
        method: 'get',
        endpoint: '/multiply',
        fileField: null,
        fileObjArray: 'none',
        handlers: [
            'MathInterface.multiply'
        ]
    },
    {
        method: 'get',
        endpoint: '/divide',
        fileField: null,
        fileObjArray: 'none',
        handlers: [
            'MathInterface.division'
        ]
    }
];
