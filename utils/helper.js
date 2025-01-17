const crypto = require('crypto')
const pickBy = require('lodash.pickby')
const config = require('../config')

function purify (obj) {
  return pickBy(obj, x => x != null && x !== '')
}

function generatePwd (pwd) {
  return crypto.createHash('md5').update(pwd).digest('hex') + crypto.createHash('sha1').update(pwd).digest('hex')
}

function isAdmin (profile) {
  if (profile == null || profile.privilege == null) return false
  if (parseInt(profile.privilege) === config.privilege.Root || parseInt(profile.privilege) === config.privilege.Teacher) {
    return true
  } else {
    return false
  }
}

function isRoot (profile) {
  if (profile == null || profile.privilege == null) return false
  if (parseInt(profile.privilege) === config.privilege.Root) {
    return true
  } else {
    return false
  }
}

function isUndefined (item) {
  return typeof item === 'undefined'
}

function isLogined (ctx) {
  return ctx.session != null && ctx.session.profile != null && ctx.session.profile.uid != null
}

module.exports = {
  generatePwd,
  purify,
  isAdmin,
  isRoot,
  isUndefined,
  isLogined,
}
