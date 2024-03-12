import {Account, CHAIN, TonProofItemReplySuccess} from "@tonconnect/ui-react";

export class BackendApi {
     baseUrl = 'https://demo.tonconnect.dev';
  // baseUrl = 'http://localhost:3000';

    async generatePayload(): Promise<string | undefined> {
        try {
            const response = await (await fetch(`${this.baseUrl}/ton-proof/generatePayload`, {
                method: 'POST'
            })).json();

            return response.payload;
        } catch (e) {
            console.error(e);
            return undefined;
        }
    }

    async checkProof(account: Account, proof: TonProofItemReplySuccess['proof']): Promise<string | undefined> {
        try {
            const body = {
                address: account.address,
                network: account.chain,
                proof: {
                    ...proof,
                    state_init: account.walletStateInit
                }
            }

            const response = await (await fetch(`${this.baseUrl}/ton-proof/checkProof`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })).json();

            return response.token;


        } catch (e) {
            console.error(e);
            return undefined;
        }
    }

    async getAccountInfo(authToken: string, network: CHAIN) {
        try {
            const response = await (await fetch(`${this.baseUrl}/dapp/getAccountInfo?network=${network}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })).json();

            return response;
        } catch (e) {
            console.error(e);
            return undefined;
        }
    }
}

export const backendApi = new BackendApi();
