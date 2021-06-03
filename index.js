const express = require('express');
const app = express();
const http = require('http').Server(app);
const { body, validationResult, param } = require('express-validator');

const dns = require('dns_lookup_plugin');

app.use(express.json());

app.get('/', (req, res) => {
    res.redirect(307, '/health');
})

app.get('/health', function(req, res) {
    res.json({});
});

app.get('/metrics', function(req, res) {
    res.json({});
});

app.get('/api/dns/:type/:domain',
    param('type').exists().custom(type => dns.record_types.indexOf(type) != -1),
    param('domain').exists().custom(domain => dns.domain_regex.test(domain)),
    (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }

    dns.lookup(req.params.domain, req.params.type).then((data) => {
        return res.status(200).json(data);
    }).catch((err) => {
        return res.status(200).json({ error: err, type: req.params.type, domain: req.params.domain });
    });

});

app.post('/api/dns/',
    body('type').exists().custom(type => dns.record_types.indexOf(type) != -1),
    body('domain').exists().custom(domain => dns.domain_regex.test(domain)),
    (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }

    dns.lookup(req.body.domain, req.body.type).then((data) => {
        return res.status(200).json(data);
    }).catch((err) => {
        return res.status(200).json({ error: err, type: req.body.type, domain: req.body.domain });
    });

});

// DNS = 41419
http.listen(41419, () => {
    console.log('listening on *:41419 aka dns');
});