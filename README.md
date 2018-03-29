[![node](https://img.shields.io/node/v/siwi-cache.svg)](https://www.npmjs.com/package/siwi-cache)
[![Build Status](https://travis-ci.org/siwilizhao/siwi-cache.svg?branch=master)](https://travis-ci.org/siwilizhao/siwi-cache)
[![npm](https://img.shields.io/npm/v/siwi-cache.svg)](https://www.npmjs.com/package/siwi-cache)
[![npm](https://img.shields.io/npm/dt/siwi-cache.svg)](https://www.npmjs.com/package/siwi-cache)
[![Github file size](https://img.shields.io/github/size/siwilizhao/siwi-cache/lib/cache.js.svg)](https://github.com/siwilizhao/siwi-cache/lib/mixin.js)


# siwi-cache

# install

## use npm 

` npm install siwi-cache`

## use yarn

` yarn add siwi-cache`

# Example

## set

<table>
    <tr>
        <th>参数</th>
        <th>类型</th>
        <th>是否必选</th>
        <th>含义</th>
    </tr>
    <tr>
        <th>key</th>
        <th>String</th>
        <th>是</th>
        <th>缓存key</th>
    </tr>
    <tr>
        <th>value</th>
        <th>String | Number</th>
        <th>是</th>
        <th>值</th>
    </tr>
    <tr>
        <th>expire</th>
        <th>Number</th>
        <th>否</th>
        <th>缓存时长 -1 为永久缓存 默认值-1</th>
    </tr>
</table>

```js
const Cache = require('siwi-cache')
const options = {
    cache_path: `${process.env.PWD}/cache`
}
const cache = new Cache()

class Example {
    constructor() {
        this.init()
    }
    async init () {
        const res = await cache.set('test', 'this is a test', 60)
        console.log(res)
    }
}

module.exports = new Example()
```
> console true

## get

<table>
    <tr>
        <th>参数</th>
        <th>类型</th>
        <th>是否必选</th>
        <th>含义</th>
    </tr>
    <tr>
        <th>key</th>
        <th>String</th>
        <th>是</th>
        <th>缓存key</th>
    </tr>
</table>

```js
const Cache = require('siwi-cache')
const options = {
    cache_path: `${process.env.PWD}/cache`
}
const cache = new Cache()

class Example {
    constructor() {
        this.init()
    }
    async init () {
        const res = await cache.get('test')
        console.log(res)
    }
}

module.exports = new Example()
```

> console this is a test

## del

<table>
    <tr>
        <th>参数</th>
        <th>类型</th>
        <th>是否必选</th>
        <th>含义</th>
    </tr>
    <tr>
        <th>key</th>
        <th>String</th>
        <th>是</th>
        <th>缓存key</th>
    </tr>
</table>

```js
const Cache = require('siwi-cache')
const options = {
    cache_path: `${process.env.PWD}/cache`
}
const cache = new Cache()

class Example {
    constructor() {
        this.init()
    }
    async init () {
        const res = await cache.del('test')
        console.log(res)
    }
}

module.exports = new Example()
```

> console true

## incr

<table>
    <tr>
        <th>参数</th>
        <th>类型</th>
        <th>是否必选</th>
        <th>含义</th>
    </tr>
    <tr>
        <th>key</th>
        <th>String</th>
        <th>是</th>
        <th>缓存key</th>
    </tr>
    <tr>
        <th>value</th>
        <th>Number</th>
        <th>是</th>
        <th>增长值 可为负数</th>
    </tr>
    <tr>
        <th>expire</th>
        <th>Number</th>
        <th>否</th>
        <th>缓存时长 -1 为永久缓存 默认值-1</th>
    </tr>
</table>

```js
const Cache = require('siwi-cache')
const options = {
    cache_path: `${process.env.PWD}/cache`
}
const cache = new Cache()

class Example {
    constructor() {
        this.init()
    }
    async init () {
        const res = await cache.incr('incr', 100)
        console.log(res)
    }
}

module.exports = new Example()
```

> console 100

