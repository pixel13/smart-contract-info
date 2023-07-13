import { ethers } from 'ethers';
import 'dotenv/config';

export default (networkId: number) => new ethers.InfuraProvider(networkId, process.env.INFURA_API_KEY);
