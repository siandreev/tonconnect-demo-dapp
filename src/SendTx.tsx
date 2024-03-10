import {
    SendTransactionRequest,
    useIsConnectionRestored,
    useTonConnectModal,
    useTonConnectUI,
    useTonWallet
} from "@tonconnect/ui-react";
import {Address, beginCell, Cell} from "@ton/core";
import {getJettonWalletAddress, waitForTx} from "./tonapi.ts";
import {useState} from "react";
import {USDT} from "./constants.ts";

export const SendTx = () => {
    const wallet = useTonWallet();
    const isRestored = useIsConnectionRestored();
    const { open } = useTonConnectModal();
    const [tonConnectUi] = useTonConnectUI();
    const [txInProgress, setTxInProgress] = useState(false);

    const onSendTx = async () => {
        setTxInProgress(true);

        const jwAddress = await getJettonWalletAddress(USDT.toRawString(), wallet!.account.address);

        /*
        transfer#0x0f8a7ea5
        query_id:uint64
         amount:VarUInteger 16
          destination:MsgAddress
          response_destination:MsgAddress
          custom_payload:Maybe ^Cell
           forward_ton_amount:VarUInteger 16
            forward_payload:Either Cell ^Cell = InternalMsgBody
         */

        const payload = beginCell()
            .storeUint(0x0f8a7ea5, 32)
            .storeUint(0, 64)
            .storeCoins(1)
            .storeAddress(Address.parse('UQCA6d29vC2UHcjWIzXt5fOr1W83PqqFZEc6C4K77QnwkcAj'))
            .storeAddress(null)
            .storeMaybeRef()
            .storeCoins(0)
            .storeMaybeRef()
        .endCell().toBoc().toString('base64');

        const tx: SendTransactionRequest = {
            validUntil: Math.round(Date.now() / 1000) + 60 * 5,
            messages: [
                {
                    address: jwAddress,
                    amount: '300000000',
                    payload
                }
            ]
        }


        const result = await tonConnectUi.sendTransaction(tx, {
            modals: 'all',
            notifications: ['error']
        });
        const imMsgCell = Cell.fromBase64(result.boc);
        const inMsgHash = imMsgCell.hash().toString('hex');

        try {
            const tx = await waitForTx(inMsgHash);
            console.log(tx);
        } catch (e) {
            console.log(e);
        }

        setTxInProgress(false);
    }

    if (!isRestored) {
        return 'Loading...';
    }

    if (!wallet) {
        return <button onClick={open}>Connect wallet</button>
    }

    return <button onClick={onSendTx} disabled={txInProgress}>
        {txInProgress ? 'Tx in progress...' :
            'SendTx'
        }
            </button>
}
