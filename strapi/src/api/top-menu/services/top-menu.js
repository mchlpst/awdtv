'use strict';

/**
 * top-menu service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::top-menu.top-menu');
