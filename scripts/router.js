"use strict";
var core;
(function (core) {
    var Router = (function () {
        function Router() {
            this._activeLink = "";
            this._routingTable = [];
            this._linkData = "";
        }
        Object.defineProperty(Router.prototype, "LinkData", {
            get: function () {
                return this._linkData;
            },
            set: function (link) {
                this._linkData = link;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Router.prototype, "ActiveLink", {
            get: function () {
                return this._activeLink;
            },
            set: function (link) {
                this._activeLink = link;
            },
            enumerable: false,
            configurable: true
        });
        Router.prototype.Add = function (route) {
            this._routingTable.push(route);
        };
        Router.prototype.AddTable = function (routingTable) {
            this._routingTable = routingTable;
        };
        Router.prototype.Find = function (route) {
            return this._routingTable.indexOf(route);
        };
        Router.prototype.Remove = function (route) {
            if (this.Find(route) > -1) {
                this._routingTable.splice(this.Find(route), 1);
                return true;
            }
            return false;
        };
        Router.prototype.toString = function () {
            return this._routingTable.toString();
        };
        return Router;
    }());
    core.Router = Router;
})(core || (core = {}));
var router = new core.Router();
router.AddTable([
    "/",
    "/home",
    "/blog",
    "/careers",
    "/contact",
    "/events",
    "/gallery",
    "/login",
    "/portfolio",
    "/privacypolicy",
    "/register",
    "/services",
    "/team",
    "/termsofservice"
]);
var route = location.pathname;
router.ActiveLink = (router.Find(route) > -1)
    ? ((route === "/")) ? "home" : route.substring(1)
    : ("404");
//# sourceMappingURL=router.js.map