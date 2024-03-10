import {Api, HttpClient} from "@ton-api/client";

const httpClient = new HttpClient({
    baseUrl: 'https://tonapi.io',
    baseApiParams: {
        headers: {
            Authorization: `Bearer AGI2S5NMZM573CAAAAAA7H6N3CDNHKCHIKNBGJ3D2RSAJPHJCDZ2R3VZPGGMIAOSEEZ4CGI`,
            'Content-type': 'application/json'
        }
    }
});

export const tonapi = new Api(httpClient);


export async function waitForTx(msgHash: string, attempt = 0) {
    try {
        return await tonapi.blockchain.getBlockchainTransactionByMessageHash(msgHash);
    } catch (e) {
        if (attempt >= 10) {
            throw e;
        }

        await new Promise(resolve => setTimeout(resolve, 1500));

        return waitForTx(msgHash, attempt + 1);
    }
}

export async function getJettonWalletAddress(jettonMasterAddress: string, walletAddress: string) {
    const result = await tonapi.blockchain.execGetMethodForBlockchainAccount(jettonMasterAddress, 'get_wallet_address', {
        args: [walletAddress]
    });

    return result.decoded.jetton_wallet_address;
}
