import { pythPriceIds } from '@/constants';
import pythConnection from '@/lib/pyth';

export default async function getLatestPriceFeeds() {
    const currentPrices = await pythConnection.getLatestPriceFeeds(pythPriceIds);
    return currentPrices
}
