import vine from '@vinejs/vine'

export const InsertVallidator = vine.compile(
    vine.object({
        title: vine.string().maxLength(255),
        slug: vine.string().maxLength(191),
        content: vine.string(),
        thumbnail: vine.string().maxLength(255),
        category_id: vine.number().exists(async (db, value) => {
            const data = await db
                .from('category_blogs')
                .where('id', value)
                .first();
            return !!data;
        }),
    })
);

export const UpdateVallidator = vine.compile(
    vine.object({
        title: vine.string().maxLength(255),
        slug: vine.string().maxLength(191),
        content: vine.string(),
        thumbnail: vine.string().maxLength(255),
        category_id: vine.number().exists(async (db, value) => {
            const data = await db
                .from('category_blogs')
                .where('id', value)
                .first();
            return !!data;
        })
    })
);
