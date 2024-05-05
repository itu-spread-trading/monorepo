import { ethers } from 'ethers';

export const VERIFICATION_MESSAGE = 'Register to Spread';
export const LOGIN_MESSAGE = 'Login to Spread';

export const verifyRegistrationMessage = (signature: string) =>
  ethers.utils.verifyMessage(VERIFICATION_MESSAGE, signature).toLowerCase();

export const verifyLoginMessage = (signature: string) =>
  ethers.utils.verifyMessage(LOGIN_MESSAGE, signature).toLowerCase();
