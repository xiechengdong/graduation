/**
 * 加密工具类
 */
;(function ($, window, name) {
    if ((name in window) && window[name]['crypto']) {
        return;
    }
    var wdutil = $.extend(window[name] || {}, {
        crypto: {
            rsa: {
                _getEncrypt: function () {
                    var encrypt = new JSEncrypt();
                    encrypt.setPublicKey(site.crypto.publicKey);
                    return encrypt;
                },
                encrypt: function (data) {
                    return this._getEncrypt().encrypt(data);
                },
                decrypt: function (encrypted) {
                    return this._getEncrypt().decrypt(encrypted);
                }
            }
        }
    });
    window[name] = wdutil;
})(jQuery, window, 'wdutil');
