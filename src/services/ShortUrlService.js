const prisma = require("../lib/prisma");
const { generateCode } = require("../utils/shortCode");

const MAX_RETRIES = 10;

module.exports = class ShortUrlService {
  static async create({ originalUrl, ttlMinutes = 60 }) {
    const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);

    for (let i = 0; i < MAX_RETRIES; i++) {
      const code = generateCode();

      const existing = await prisma.shortUrl.findUnique({ where: { code } });

      if (!existing) {
        return prisma.shortUrl.create({
          data: { code, originalUrl, expiresAt },
        });
      }

      if (existing.expiresAt && existing.expiresAt < new Date()) {
        return prisma.shortUrl.update({
          where: { code },
          data: { originalUrl, expiresAt },
        });
      }
    }

    throw {
      status: 503,
      message: "Could not generate unique short url",
    };
  }

  static async resolve(code) {
    const row = await prisma.shortUrl.findUnique({ where: { code } });

    if (!row) return null;
    if (row.expiresAt && row.expiresAt < new Date()) return null;

    return row.originalUrl;
  }

  static async list({ page = 1, limit = 20 }) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      prisma.shortUrl.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.shortUrl.count(),
    ]);

    return {
      items,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }
};
