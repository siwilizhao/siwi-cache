/**
 * @author [siwi]
 * @email [siwilizhao@gmail.com]
 * @create date 2018-03-31 12:55:44
 * @modify date 2018-03-31 12:55:44
 * @desc [nodejs file cache]
*/
const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const unlink = util.promisify(fs.unlink)
const crypto = require('crypto')
let instance = null
class Cache {
    constructor(options = {}) {
        if (!options['cache_path']) {
            options['cache_path'] = `${process.env.PWD}/cache`
        }
        if (!fs.existsSync(options['cache_path'])) {
            fs.mkdirSync(options['cache_path'])
        }
        this.cache_path = options['cache_path']
        if (!instance) {
            instance = this
        }
        return instance
    }

    /**
     * 设置缓存
     * @param {String} key 
     * @param {String} value 
     * @param {Number} expire 
     */
    async set(key, value, expire = -1) {
        const options = {
            flags: 'w',
            encoding: 'utf8',
            fd: null,
            mode: 0o666,
            autoClose: true
        }
        const file_name = await this._md5(key)
        const cache_file = `${this.cache_path}/${file_name}`
        const stream = fs.createWriteStream(cache_file, options)
        // expireAt为-1时为永久缓存
        const expireAt = expire == -1 ? -1: Math.floor(Date.now()/1000) + expire
        const data = {
            value: value,
            expire: expireAt
        }
        const res = stream.write(JSON.stringify(data))
        return res
    }

    /**
     * 读取缓存
     * @param {String} key 
     */
    async get(key) {
        const file_name = await this._md5(key)
        const cache_file = `${this.cache_path}/${file_name}`
        if (!fs.existsSync(cache_file)) {
            return false
        }
        const content = await readFile(cache_file, {encoding: 'utf8', flag: 'r'})
        const data = JSON.parse(content)

        if (data['expire'] != -1) {
            return data['value']
        }
        if(data['expire'] < Math.floor(Date.now / 1000)) {
            await unlink(cache_file)
            return false
        }
        return data['value']
    }

    /**
     * 删除缓存
     * @param {String} key 
     */
    async del (key) {
        const file_name = await this._md5(key)
        const cache_file = `${this.cache_path}/${file_name}`
        if (!fs.existsSync(cache_file)) {
            return false
        }
        await unlink(cache_file)
        return true
    }

    /**
     * 增加减少
     * @param {String} key 
     * @param {Number} value 
     */
    async incr(key, value, expire = -1) {
        if (typeof value !== 'number' ) {
            return false
        }
        const file_name = await this._md5(key)
        const cache_file = `${this.cache_path}/${file_name}`
        if (!fs.existsSync(cache_file)) {
            const init = await this.set(key, 0 + value, expire)
            if (init) {
                return 0 + value
            }
            return false
        }
        const content = await readFile(cache_file, {encoding: 'utf8', flag: 'r'})
        const data = JSON.parse(content)
        if(data['expire'] < Math.floor(Date.now / 1000)) {
            await unlink(cache_file)
            return false
        }
        if (typeof data['value'] !== 'number' ) {
            return false
        }
        data['value'] = data['value'] + value
        const res = await this.set(key, data['value'], data['expire'])
        if (res) {
            return data['value']
        }
        return false
    }
    
    /**
     * md5
     * @param {String| Buffer} data 
     */
    async _md5 (data) {
        return crypto.createHash('md5').update(data).digest('hex')
    }
}

module.exports = Cache