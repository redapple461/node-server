"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeroes = () => {
    return fetch('http://localhost:4000/getHeroes')
        .then(res => res.json());
};
exports.addHero = (data) => {
    return fetch('http://localhost:4000/addHero', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
};
exports.getByName = (name) => {
    return fetch('http://localhost:4000/getHero/' + name)
        .then(res => res.json());
};
exports.deleteByName = (name) => {
    return fetch('http://localhost:4000/deleteHero/' + name, {
        method: 'DELETE'
    });
};
exports.updateHero = (oldName, body) => {
    return fetch('http://localhost:4000/updateHero/' + oldName, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
};
//# sourceMappingURL=httpHook.js.map