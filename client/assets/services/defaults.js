app.service('Defaults', function ($http, $q) {
    return {
        'get': function () {
            var defer = $q.defer(),
                httpConfig = {},
                httpProperties = {
                    'url': "/chs/data/db.json",
                    'config': httpConfig,
                    'method': 'GET'
                };

            $http(httpProperties).then(function onSuccess(response) {
                defer.resolve(response.data);
            }).catch(function onError(response) {
                defer.reject(response.data);
            });

            return defer.promise;
        }
    };
});
