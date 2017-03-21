/**
 * Report errors that happen inside Angular code
 */
(function () {
    'use strict';
    angular.module('errorCatcher', [])
        .factory('$exceptionHandler', function ($log, $injector) {
            return function errorCatcherHandler(exception, cause) {
                // initialize for error modal
                var $rootScope = $injector.get('$rootScope');

                $log.error(exception.stack, cause);
            };
        }).factory('errorHttpInterceptor', ['$q', '$injector',
            function ($q, $injector) {
                var $rootScope = $injector.get('$rootScope'),
                    $log = $injector.get('$log');
                return {
                    responseError: function responseError(rejection) {
                        // Show log warning messages based on status code
                        if (rejection.status === 500 || rejection.status === 502 || rejection.status ===
                            503) {
                            $log.warn('HTTP response Error - Server:', rejection.config, rejection.status);
                        } else if (rejection.status === 400 || rejection.status === 404) {
                            $log.warn('HTTP Request Error - Backend:', rejection.config, rejection.status);
                        } else if (rejection.status === 401) {
                            $log.warn('HTTP Request Error - Unauthorized:', rejection.config, rejection.status);
                        } else {
                            $log.warn('HTTP response error:', rejection.config, rejection.status);
                        }

                        return $q.reject(rejection);
                    }
                };
            }
        ])
        .config(['$httpProvider',
            function ($httpProvider) {
                $httpProvider.interceptors.push('errorHttpInterceptor');
            }
        ]);
}());
