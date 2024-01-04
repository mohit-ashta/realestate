import jwt from 'jsonwebtoken'

export const decodeToken = ({ token }: { token: string }) => {
    return jwt.decode(token);
  };
  