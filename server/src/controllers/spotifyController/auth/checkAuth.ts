// checkAuth.ts
import { Request, Response } from 'express';
import { getTokens, refreshTokenIfNeeded } from '../../../utils/tokenService';

export const checkAuth = async (req: Request, res: Response) => {
  try {
    const tokens = await getTokens();
    if (!tokens) {
      return res.json({ isAuthenticated: false });
    }

    const refreshedTokens = await refreshTokenIfNeeded(tokens);
    res.json({ isAuthenticated: true });
  } catch (error) {
    console.error('Error checking authentication:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};