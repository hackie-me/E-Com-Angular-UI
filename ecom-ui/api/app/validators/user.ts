import vine from '@vinejs/vine'

const usernameRule = vine.string().trim();
const passwordRule = vine.string().trim();

export const InsertVallidator = vine.compile(
    vine.object({
        firstName: vine.string().maxLength(255),
        lastName: vine.string().maxLength(191),
        password: passwordRule,
        userName: usernameRule.unique(async (db, value) => {
        const user = await db
          .from('users')
          .where('username', value)
          .first();
        return !user; 
      }),
        email: vine.string().email(),
        avatar: vine.file().optional()
    })
);

export const UpdateVallidator = vine.compile(
    vine.object({
        firstName: vine.string().maxLength(255),
        lastName: vine.string().maxLength(191),
        userName: usernameRule.unique(async (db, value) => {
        const user = await db
          .from('users')
          .where('username', value)
          .first();
        return !user; 
      }),
        email: vine.string().email(),
        avatar: vine.file().optional()
    })
);
