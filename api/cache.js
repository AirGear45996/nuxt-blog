const mcache = require('memory-cache'); // !!!кеш храниться в оперативной памяти
module.exports = (seconds,json = true) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url;
        let cachedBody = mcache.get(key);
        if(json) {
            res.setHeader('Content-Type', 'application/json');
        }
        if (cachedBody) {
            res.send(cachedBody);
            return false;
        } else {
            res.sendResponse = res.send;
            res.send = (body) => {
                mcache.put(key, body, seconds * 1000);
                res.sendResponse(body)
            };
            next()
        }
    }
};