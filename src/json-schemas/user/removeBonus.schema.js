export const removeBonusSchema={
    body: {
        type: "object",
        properties: {
          userId: { type: "string" },
          bonusId: { type: ["string", "null"] },
          user: { type: ['object', 'null'] },
        },
        required: ["userId"],
    }
}