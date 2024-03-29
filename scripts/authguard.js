"use strict";
(function () {
    var protected_route = ["events"];
    if (protected_route.indexOf(router.ActiveLink) > -1) {
        if (!sessionStorage.getItem("user")) {
            location.href = "/login";
        }
    }
})();
//# sourceMappingURL=authguard.js.map