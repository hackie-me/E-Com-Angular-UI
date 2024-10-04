import vine from '@vinejs/vine'

// Common validation rules
const emailRule = vine.string().trim().email();
const passwordRule = vine.string().trim();
const usernameRule = vine.string().trim();

export const loginValidator = vine.compile(
    vine.object({
      email: emailRule,
      password: passwordRule 
    })
  );
  

export const registerValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim(),
    lastName: vine.string().trim(),
    username: usernameRule.unique(async (db, value) => {
        const user = await db
          .from('users')
          .where('username', value)
          .first();
        return !user; 
      }),
    email: emailRule.unique(async (db, value) => {
      const user = await db
        .from('users')
        .where('email', value)
        .first();
      return !user; 
    }),
    password: passwordRule.confirmed({ confirmationField: 'password_confirm' }),
    password_confirm: vine.string().trim()
  })
);


export const forgotPasswordValidator = vine.compile(
    vine.object({
      email: vine.string().trim().email().exists(async (db, email) => {
        const user = await db.query()
          .from('users')
          .where('email', email)
          .first();
        return !!user;
      }),
    })
  );

  export const verifyEmailValidator = vine.compile(
    vine.object({
      email: emailRule.exists(async (db, value) => {
        const user = await db
          .from('users')
          .where('email', value)
          .first();
          
        return !!user;
      }),
      verificationToken: vine.string().trim()
    })
  );
  
