// ==UserScript==
// @name         TamperMonkey-ebird-trip
// @namespace    https://kennychou.github.io/
// @version      1.0.0
// @description  使用Vue2.x構建Tampermonkey for ebird trip
// @author       Kenny Chou
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_setClipboard
// @grant        GM_info
// @grant        GM_xmlhttpRequest
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.setClipboard
// @grant        GM_info
// @grant        GM.xmlHttpRequest
// @require      https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.14/vue.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/axios/0.26.1/axios.min.js
// @match        https://ebird.org/mytripreports
// @include      *
// ==/UserScript==

!(function (e) {
  var t = {}
  function n(o) {
    if (t[o]) return t[o].exports
    var r = (t[o] = { i: o, l: !1, exports: {} })
    return e[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports
  }
  ;(n.m = e),
    (n.c = t),
    (n.d = function (e, t, o) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o })
    }),
    (n.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e
      var o = Object.create(null)
      if (
        (n.r(o),
        Object.defineProperty(o, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var r in e)
          n.d(
            o,
            r,
            function (t) {
              return e[t]
            }.bind(null, r)
          )
      return o
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default
            }
          : function () {
              return e
            }
      return n.d(t, 'a', t), t
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }),
    (n.p = ''),
    n((n.s = 5))
})([
  function (e, t) {
    e.exports = Vue
  },
  function (e, t) {
    e.exports = axios
  },
  function (e, t, n) {
    'use strict'
    ;(function (e) {
      function o(e) {
        return (o =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (e) {
                return typeof e
              }
            : function (e) {
                return e &&
                  'function' == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e
              })(e)
      }
      function r(e, t) {
        if (!e.vueAxiosInstalled) {
          var n = a(t)
            ? (function (e) {
                return { axios: e, $http: e }
              })(t)
            : t
          if (
            (function (e) {
              return (
                'object' === o(e) &&
                Object.keys(e).every(function (t) {
                  return a(e[t])
                })
              )
            })(n)
          ) {
            var r = (function (e) {
              return e && e.version && Number(e.version.split('.')[0])
            })(e)
            if (r) {
              var c = r < 3 ? i : s
              Object.keys(n).forEach(function (t) {
                c(e, t, n[t])
              }),
                (e.vueAxiosInstalled = !0)
            } else console.error('[vue-axios] unknown Vue version')
          } else
            console.error(
              '[vue-axios] configuration is invalid, expected options are either <axios_instance> or { <registration_key>: <axios_instance> }'
            )
        }
      }
      function i(e, t, n) {
        Object.defineProperty(e.prototype, t, {
          get: function () {
            return n
          },
        }),
          (e[t] = n)
      }
      function s(e, t, n) {
        ;(e.config.globalProperties[t] = n), (e[t] = n)
      }
      function a(e) {
        return e && 'function' == typeof e.get && 'function' == typeof e.post
      }
      n.d(t, 'a', function () {
        return r
      }),
        'object' == ('undefined' == typeof exports ? 'undefined' : o(exports))
          ? (e.exports = r)
          : 'function' == typeof define && n(4)
          ? define([], function () {
              return r
            })
          : window.Vue &&
            window.axios &&
            window.Vue.use &&
            Vue.use(r, window.axios)
    }.call(this, n(3)(e)))
  },
  function (e, t) {
    e.exports = function (e) {
      if (!e.webpackPolyfill) {
        var t = Object.create(e)
        t.children || (t.children = []),
          Object.defineProperty(t, 'loaded', {
            enumerable: !0,
            get: function () {
              return t.l
            },
          }),
          Object.defineProperty(t, 'id', {
            enumerable: !0,
            get: function () {
              return t.i
            },
          }),
          Object.defineProperty(t, 'exports', { enumerable: !0 }),
          (t.webpackPolyfill = 1)
      }
      return t
    }
  },
  function (e, t) {
    ;(function (t) {
      e.exports = t
    }.call(this, {}))
  },
  function (e, t, n) {
    'use strict'
    n.r(t)
    var o = n(0),
      r = n.n(o),
      i = n(1),
      s = n.n(i),
      a = n(2),
      c = function () {
        var e = this,
          t = e.$createElement,
          n = e._self._c || t
        return n('div', { staticClass: 'app' }, [
          n('label', [e._v('輸入eBird Apikey ')]),
          e._v(' '),
          n('input', {
            directives: [
              {
                name: 'model',
                rawName: 'v-model',
                value: e.ebirdKey,
                expression: 'ebirdKey',
              },
            ],
            attrs: { type: 'text' },
            domProps: { value: e.ebirdKey },
            on: {
              input: function (t) {
                t.target.composing || (e.ebirdKey = t.target.value)
              },
            },
          }),
          e._v(' '),
          n('button', { on: { click: e.saveKey } }, [e._v('Save')]),
          e._v(' '),
          n(
            'button',
            {
              on: {
                click: function (t) {
                  return e.download('45197')
                },
              },
            },
            [e._v('Click')]
          ),
        ])
      }
    c._withStripped = !0
    var u = (function (e, t, n, o, r, i, s, a) {
      var c,
        u = 'function' == typeof e ? e.options : e
      if (
        (t && ((u.render = t), (u.staticRenderFns = n), (u._compiled = !0)),
        o && (u.functional = !0),
        i && (u._scopeId = 'data-v-' + i),
        s
          ? ((c = function (e) {
              ;(e =
                e ||
                (this.$vnode && this.$vnode.ssrContext) ||
                (this.parent &&
                  this.parent.$vnode &&
                  this.parent.$vnode.ssrContext)) ||
                'undefined' == typeof __VUE_SSR_CONTEXT__ ||
                (e = __VUE_SSR_CONTEXT__),
                r && r.call(this, e),
                e && e._registeredComponents && e._registeredComponents.add(s)
            }),
            (u._ssrRegister = c))
          : r &&
            (c = a
              ? function () {
                  r.call(
                    this,
                    (u.functional ? this.parent : this).$root.$options
                      .shadowRoot
                  )
                }
              : r),
        c)
      )
        if (u.functional) {
          u._injectStyles = c
          var l = u.render
          u.render = function (e, t) {
            return c.call(t), l(e, t)
          }
        } else {
          var d = u.beforeCreate
          u.beforeCreate = d ? [].concat(d, c) : [c]
        }
      return { exports: e, options: u }
    })(
      {
        name: 'app',
        data: () => ({
          AppName: 'TamperMonkey-ebird-trip',
          AppVersion: '1.0.0',
          ebirdKey: '',
        }),
        mounted() {
          this.ebirdKey = localStorage.getItem('ebirdKey') || ''
        },
        created() {
          try {
            const e = document
              .getElementById('my-reports-items')
              .getElementsByTagName('li')
            for (const t of e) {
              const e = t.getElementsByClassName('Heading Heading--h4')[0].id,
                n = document.createElement('button')
              ;(n.textContent = e),
                n.addEventListener('click', t => this.download(e)),
                t.append(n)
            }
          } catch (e) {}
        },
        methods: {
          saveKey() {
            localStorage.setItem('ebirdKey', this.ebirdKey)
          },
          async download(e) {
            const t = (
              await this.$http.get(
                'https://ebird.org/tripreport-internal/v1/checklists/' + e
              )
            ).data
            for (const e of t) {
              console.log(e.subId)
              const t = await this.$http.get(
                'https://api.ebird.org/v2/product/checklist/view/' + e.subId,
                { headers: { 'X-eBirdApiToken': this.ebirdKey } }
              )
              console.log(t.data)
            }
          },
        },
      },
      c,
      [],
      !1,
      null,
      null,
      null
    )
    u.options.__file = 'src/app.vue'
    var l = u.exports
    const d = 'app_vue_' + Date.now(),
      f = document.createElement('div')
    f.id = d
    document.getElementById('my-reports-heading').after(f)
    r.a.use(a.a, s.a), new r.a({ el: '#' + d, render: e => e(l) })
  },
])
