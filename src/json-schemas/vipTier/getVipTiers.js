export const getVipTiersSchema = {
  query: {
    type: "object",
    properties: {
      limit: { type: ['string', 'null'] },
      pageNo: { type: ['string', 'null'] },
      search: { type: "string", maxLength: 255 },
      // orderBy: { type: "string", enum: ["name", "level", "boost", "rakeback"] },
      // sort: { type: "string", enum: ["ASC", "DESC"] },
      isActive: { type: "string", enum: ["true", "false"] },
    },
    // required: ['limit', 'pageNo'],
  },
};
