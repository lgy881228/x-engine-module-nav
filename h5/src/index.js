console.log("hello,module");
document.addEventListener(
  "DOMContentLoaded",
  function () {
    console.log("ready ..............");
    // 声明的JS“扩展插件别名”
    var _BARCODE = "plugintest";
    window.xengine = window.xengine || {};
    window.xengine.bridge = window.xengine.bridge || {
      callbackId: (e) => {
        console.log("callbackId is called");
      },
      exec: (e) => {
        console.log("exec is called");
      },
      execSync: (e) => {
        console.log("execSync is called");
      }
    };
    B = window.xengine.bridge;
    var plugintest = {
      // 声明异步返回方法
      PluginTestFunction: function (
        Argus1,
        Argus2,
        Argus3,
        Argus4,
        successCallback,
        errorCallback
      ) {
        var success =
            typeof successCallback !== "function"
              ? null
              : function (args) {
                  successCallback(args);
                },
          fail =
            typeof errorCallback !== "function"
              ? null
              : function (code) {
                  errorCallback(code);
                };
        callbackID = B.callbackId(success, fail);
        // 通知Native层plugintest扩展插件运行”PluginTestFunction”方法
        return B.exec(_BARCODE, "PluginTestFunction", [
          callbackID,
          Argus1,
          Argus2,
          Argus3,
          Argus4,
        ]);
      },
      PluginTestFunctionArrayArgu: function (
        Argus,
        successCallback,
        errorCallback
      ) {
        var success =
            typeof successCallback !== "function"
              ? null
              : function (args) {
                  successCallback(args);
                },
          fail =
            typeof errorCallback !== "function"
              ? null
              : function (code) {
                  errorCallback(code);
                };
        callbackID = B.callbackId(success, fail);
        return B.exec(_BARCODE, "PluginTestFunctionArrayArgu", [
          callbackID,
          Argus,
        ]);
      },
      // 声明同步返回方法
      PluginTestFunctionSync: function (Argus1, Argus2, Argus3, Argus4) {
        // 通知Native层plugintest扩展插件运行“PluginTestFunctionSync”方法并同步返回结果
        return B.execSync(_BARCODE, "PluginTestFunctionSync", [
          Argus1,
          Argus2,
          Argus3,
          Argus4,
        ]);
      },
      PluginTestFunctionSyncArrayArgu: function (Argus) {
        return B.execSync(_BARCODE, "PluginTestFunctionSyncArrayArgu", [Argus]);
      },
    };
    window.xengine.plugintest = plugintest;
  },
  true
);
