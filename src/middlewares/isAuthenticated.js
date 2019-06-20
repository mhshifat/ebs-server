import jwt from "jsonwebtoken";

export default async (resolver, parent, args, ctx, info) => {
  const { req, res } = ctx;
  const token = req.get("x-token");
  if (!token)
    return await resolver(
      parent,
      args,
      { ...ctx, authenticatedUser: null },
      info
    );
  try {
    const decodedToken = jwt.verify(token, "MySuperSecretPassword");
    const findUser = await ctx.models.User.findById(decodedToken.id);
    return await resolver(
      parent,
      args,
      { ...ctx, authenticatedUser: findUser },
      info
    );
  } catch (err) {
    return await resolver(
      parent,
      args,
      { ...ctx, authenticatedUser: null },
      info
    );
  }
};
