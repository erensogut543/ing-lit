export var SingletonFactory = (function () {
  function SingletonClass() {}
  var instance;
  return {
    getInstance: function () {
      if (instance == null) {
        instance = new SingletonClass();
        instance.employeeList = [];
        instance.selectedEmployee = null;
        instance.constructor = null;
      }
      return instance;
    },
  };
})();
