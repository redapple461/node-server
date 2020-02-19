import * as http from '../http/httpHook'


describe('http hooks test', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('should call getByName ant return some mock value', done => {
        // jest const response = http.getHeroes();
        fetch.mockResponseOnce(JSON.stringify({ID:1}));
        const onResponse = jest.fn();
        http.getByName('Ironman').then(onResponse).finally(() => {
            expect(onResponse).toHaveBeenCalled();
            expect(onResponse.mock.calls).toEqual([[{"ID": 1}]]);
            done();
        });
    });


    it('should call deleteByName ant return status OK', done => {
        // jest const response = http.getHeroes();
        fetch.mockResponseOnce(JSON.stringify({ID:1}));
        const onResponse = jest.fn();
        http.deleteByName('Ironman').then(onResponse).finally(() => {
            expect(onResponse).toHaveBeenCalled();
            expect(onResponse.mock.calls[0][0].status).toEqual(200);
            done();
        });
    })

    it('should call updateHero ant return some mock value', done => {
        // jest const response = http.getHeroes();
        fetch.mockResponseOnce(JSON.stringify({ID:1}));
        const onResponse = jest.fn();
        const onError = jest.fn();
        http.updateHero('iron',{_id: "5e411c94d4df1b34d4bf3d55", id: 0, name: "mock", universe: "Mock_U", __v: 0})
            .then(onResponse)
            .catch(onError)
            .finally(() => {
                expect(onResponse).toHaveBeenCalled();
                expect(onError).not.toHaveBeenCalled();
                expect(onResponse.mock.calls[0][0]).toEqual({ID: 1});
                done();
            });
    })
})