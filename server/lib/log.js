const _ = require('lodash');
const path = require('path');
const stackTrace = require('stack-trace');
const bunyan = require('bunyan');
const namespace = require('continuation-local-storage').createNamespace('app');
const rootPath = require('app-root-path').path;

const config = require('../../config');

const log = bunyan.createLogger({
    name: config('logger.name'),
    level: 'debug',
    stream: process.stdout,
    serializers: bunyan.stdSerializers
});

function handleMetadata (logArgs) {
    let metadata;
    let logInfo;

    if (typeof (logArgs[0]) === 'object') {
        if (logArgs[0] instanceof Error) {
            metadata = {err: logArgs[0]};
        } else {
            metadata = logArgs[0];
        }

        logInfo = logArgs.slice(1);
    } else {
        metadata = {};
        logInfo = logArgs;
    }

    return {metadata, logInfo};
}

class Logger {
    constructor (additionalMetadata = {}) {
        const trace = stackTrace.get();
        const parentFile = trace[2].getFileName();

        this._additionalMetadata = {
            ...additionalMetadata,
            fileName: path.relative(rootPath, parentFile)
        };
    }

    child (additionalMetadata) {
        return new Logger({
            ...this._additionalMetadata,
            ...additionalMetadata
        });
    }
}

['trace', 'debug', 'info', 'warn', 'error', 'fatal'].forEach(level => {
    Logger.prototype[level] = function (...args) {
        let {metadata, logInfo} = handleMetadata(args);

        const context = namespace.get('logContext') || null;

        // Log fields are output in the implicit order of the object
        // So put the common fields first in order to make them more readable
        metadata = {
            ...metadata,
            context,
            ...this._additionalMetadata
        };

        if (logInfo.length === 0 && metadata.err) {
            logInfo = [metadata.err.message];
        }

        return log[level](metadata, ...logInfo);
    };
});

function setTag (key, value) {
    const context = namespace.get('logContext') || {};
    context[key] = value;
    namespace.set('logContext', context);
}

module.exports = {
    create () {
        return new Logger();
    },
    setTag,
    setReqId (value) {
        setTag('reqId', value);
    },
    getReqId () {
        const context = namespace.get('logContext') || {};
        return context.reqId || null;
    },
    runInNamespace (func) {
        return namespace.runAndReturn(func);
    },
    getNamespace () {
        return namespace;
    }
}
