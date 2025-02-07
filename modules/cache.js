const { LRUCache } = require("lru-cache");

const cache = new LRUCache({
  max: 30,
  ttl: 120 * 1000,
});

module.exports = cache;
