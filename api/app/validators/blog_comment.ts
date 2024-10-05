import vine from '@vinejs/vine'

export const InsertVallidator = vine.compile(
    vine.object({
        name: vine.string().maxLength(255),
        email: vine.string().maxLength(191),
        message: vine.string(),
        blog_id: vine.number().exists(async (db, value) => {
            const data = await db
                .from('blogs')
                .where('id', value)
                .first();
            return !!data;
        }),
        
    })
);

export const UpdateVallidator = vine.compile(
    vine.object({
        name: vine.string().maxLength(255),
        email: vine.string().maxLength(191),
        message: vine.string(),
        blog_id: vine.number().exists(async (db, value) => {
            const data = await db
                .from('blogs')
                .where('id', value)
                .first();
            return !!data;
        }),
        params: vine.object({
            id: vine.number()
        }),
    })
);